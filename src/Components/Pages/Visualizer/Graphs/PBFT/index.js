
import * as d3 from "d3";
import { line } from "d3-shape";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ACTION_TYPE_PBFT_GRAPH, COLORS_PBFT_GRAPH, NUMBER_OF_STEPS_PBFT_GRAPH, PBFT_ANIMATION_SPEEDS } from "../../../../../Constants";
import { GraphResizerContext, PbftAnimationSpeedContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";
import { cancelIcon, pauseIcon, playIcon } from "../../../../../Resources/Icons";
import { DropDownButtons, IconButtons } from "../../../../Shared/Buttons";
import { Icon } from "../../../../Shared/Icon";
import { connectionRender, labelFaultyNode, labelPrimaryNode } from "./Computation/D3";
import { generateConnections, generateLabels, generateLines, generatePoints } from "./Computation/Skeleton";



const PBFT = ({
    messageHistory,
    // TODO: Uncomment the below after connecting to the BE
    realTransactionNumber 
}) => {
    const { speed, changeSpeed } = useContext(PbftAnimationSpeedContext);
    const {
        TRANSDURATION,
        REQUEST_BUFFER,
        PREPREPARE_BUFFER,
        PREPARE_BUFFER,
        COMMIT_BUFFER,
        REPLY_BUFFER
    } = PBFT_ANIMATION_SPEEDS[speed];

    const { boxValues, resizing } = useContext(GraphResizerContext);

    const { width, height } = boxValues;

    const { theme } = useContext(ThemeContext);

    // TODO: Comment the below two lines after connecting to the BE
    //const { transactionIds } = generateTransactionIds(dummyData);
    const [transactionNumber, setTransactionNumber] = useState(realTransactionNumber);
    const [clear, setClear] = useState(false);
    const [playing, setPlaying] = useState(true);

    const graphRef = useRef(null);
    const lineRef = useRef(null);
    const primaryLabelRef = useRef(null);
    const faultyReplicasLabelRef = useRef(null);

    const debouncedRender = useCallback(() => {
        const data = generatePoints(
            width,
            height,
            0,
            Math.floor(height / 4),
            4,
            NUMBER_OF_STEPS_PBFT_GRAPH
        );

        const { xCoords, yCoords, verticalLines, horizontalLines } = generateLines(
            data,
            NUMBER_OF_STEPS_PBFT_GRAPH
        );

        const { points, primaryIndex } = generateConnections(
            data,
            NUMBER_OF_STEPS_PBFT_GRAPH,
            xCoords,
            yCoords,
            // TODO: Change dummyData to messageHistory after connecting to BE
            messageHistory,
            realTransactionNumber
        );

        const { labelsX, labelsY } = generateLabels(xCoords, yCoords);

        const svg = d3
            .select(graphRef.current)
            .attr("width", width)
            .attr("height", height)
            .classed("flex", true)
            .classed("justify-center", true)
            .classed("items-center", true);

        svg
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 2)
            .attr("fill", `${!theme ? "black" : "white"}`);

        const lineGen = line()
            .x((d) => d.x)
            .y((d) => d.y);

        // ARROW HEAD
        ACTION_TYPE_PBFT_GRAPH.forEach((action, index) =>
            svg
                .append("defs")
                .append("marker")
                .attr("id", `arrow-${action}`)
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 10)
                .attr("refY", 5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto-start-reverse")
                .append("path")
                .attr("fill", `${COLORS_PBFT_GRAPH[index]}`)
                .attr("d", "M 0 0 L 10 5 L 0 10 z")
        );

        // VERTICAL DOTTED LINES
        verticalLines.forEach((line, index) =>
            svg
                .append("path")
                .attr("d", lineGen(line))
                .attr("stroke", "gray")
                .attr("fill", "none")
                .attr("stroke-width", 0.2)
                .attr("stroke-dasharray", "5,10")
        );

        // HORIZONTAL DOTTED LINES
        horizontalLines.forEach((line, index) =>
            svg
                .append("path")
                .attr("d", lineGen(line))
                .attr("stroke", "gray")
                .attr("fill", "none")
                .attr("stroke-width", 0.2)
                .attr("stroke-dasharray", "5,10")
        );

        // LABELS FOR EACH ACTION
        labelsX.forEach((label) =>
            svg
                .append("text")
                .attr("transform", "translate(" + label.x + " ," + label.y + ")")
                .attr("fill", "#c4c4c4")
                .style("text-anchor", "middle")
                .text(`${label.title}`)
        );

        // LABELS FOR EACH NODE
        labelsY.forEach((label, index) => {
            const labelText = svg
                .append("text")
                .attr("transform", "translate(" + label.x + " ," + label.y + ")")
                .style("text-anchor", "middle")
                .text(`${label.title}`)
                .attr("fill", "#c4c4c4")
            return labelText;
        });

        if(!clear) {

            const primaryLabelSVG = d3
                .select(primaryLabelRef.current)
                .attr("width", width)
                .attr("height", height)

            const faultyReplicasLabelSVG = d3
                .select(faultyReplicasLabelRef.current)
                .attr("width", width)
                .attr("height", height)

            let yCoordToIndexMap = new Map()
            yCoords.forEach((value, index) => {
                if(index > 0 && value !== points.prePrepare.start[0].points.y){
                    yCoordToIndexMap.set(value, index);
                }
            });

            points.prepare.start.forEach((value, _) => {
                if(yCoordToIndexMap.get(value.y)) yCoordToIndexMap.delete(value.y);
            });

            let faultyReplicaIndices = new Set();
            for (let [_, value] of yCoordToIndexMap) faultyReplicaIndices.add(value);

            labelsY.forEach((label, index) => {
                if (index === primaryIndex) return labelPrimaryNode(primaryLabelSVG, label);
                if (faultyReplicaIndices.has(index)) return labelFaultyNode(faultyReplicasLabelSVG, label);
            })

            const lineSVG = d3
                .select(lineRef.current)
                .attr("width", width)
                .attr("height", height)
                .classed("flex", true)
                .classed("justify-center", true)
                .classed("items-center", true);

            // REQUEST LINES
            points.request.end.forEach((end, i) => {
                if (end.flag) {
                    connectionRender([points.request.start[0].points, end.points], points.request.color, '#edf0f5', TRANSDURATION, i * REQUEST_BUFFER, lineGen, lineSVG, 'request');
                }
            });

            console.log(points, "POINTS");

            // PRE-PREPARE LINES
            points.prePrepare.end.forEach((end, i) => {
                if (end.flag) {
                    connectionRender([points.prePrepare.start[0].points, end.points], points.prePrepare.color, '#edf0f5', TRANSDURATION, i * 1 + PREPREPARE_BUFFER, lineGen, lineSVG, 'prePrepare');
                }
            });

            // PREPARE LINES
            points.prepare.start.map((start, index) =>
                points.prepare.end[index].map((end, i) => {
                    return (
                        end.flag && connectionRender([start, end.points], points.prepare.color, '#edf0f5', TRANSDURATION, i * 1 + PREPARE_BUFFER, lineGen, lineSVG, 'prepare')
                    );
                })
            );

            // COMMIT LINES
            points.commit.start.map((start, index) =>
                points.commit.end[index].map((end, i) => {
                    return (
                        end.flag && connectionRender([start, end.points], points.commit.color, '#edf0f5', TRANSDURATION, i * 1 + COMMIT_BUFFER, lineGen, lineSVG, 'commit')
                    );
                })
            );

            // REPLY LINES
            points.reply.start.forEach((start, i) => {
                return (
                    start.flag && connectionRender([start.points, points.reply.end[0].points], points.reply.color, '#edf0f5', TRANSDURATION, i * 1 + REPLY_BUFFER, lineGen, lineSVG, 'reply')
                );
            });
        }
        
    }, [theme, width, height, clear]);

    useEffect(() => {
            debouncedRender();
    }, [debouncedRender]);

    useEffect(() => {
        setClear(true)
        setTimeout(() => {
            setClear(false)
        }, 500)
    }, [speed])

    const onClear = () => {
        setClear(true);
        setPlaying(false);
    }

    const onPlay = () => {
        setClear(false);
        setPlaying(true);
    }

    const animationSpeedChange = (value) => changeSpeed(value);

    return (
        <>
            <div className="flex items-center justify-between gap-x-16 mb-[-1em] mt-2">
                <IconButtons title={!clear ? 'Playing' : 'Play'} onClick={() => onPlay()} disabled={!clear}>
                    <Icon path={!clear ? pauseIcon : playIcon} viewBox={'0 0 384 512'} height={'13px'} fill={!clear ? '#374151' : '#fff'} />
                </IconButtons>
                {playing && (
                    <DropDownButtons selected={speed} elements={['1x', '0.5x', '2x']} onClick={animationSpeedChange} />
                )}
                <IconButtons title={'Clear'} onClick={() => onClear()} disabled={clear}>
                    <Icon path={cancelIcon} viewBox={'0 0 384 512'} height={'14px'} fill={clear ? '#374151' : '#fff'} />
                </IconButtons>
            </div>
            <div className='relative w-full h-full pl-4 pr-2 pb-6'>
                {resizing ? (
                    <div class='loader'>
                        <div>PBFT</div>
                        <div class='inner' />
                    </div>
                ) : (
                    <>
                            <svg id={'svg-one'} ref={graphRef} className='absolute'></svg>
                        {!clear && (
                            <>
                                    <svg ref={lineRef} className='absolute'></svg>
                                    <svg ref={primaryLabelRef} className='absolute'></svg>
                                    <svg ref={faultyReplicasLabelRef} className='absolute'></svg>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default PBFT;
