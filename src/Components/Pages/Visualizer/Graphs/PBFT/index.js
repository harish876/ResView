import * as d3 from "d3";
import { line } from "d3-shape";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import throttle from 'lodash/throttle';
import { ACTION_TYPE_PBFT_GRAPH, COLORS_PBFT_GRAPH, NUMBER_OF_STEPS_PBFT_GRAPH, PBFT_ANIMATION_SPEEDS, PBFT_ANIMATION_SPEEDS_NO_PRIMARY } from "../../../../../Constants";
import { PbftAnimationSpeedContext, PbftGraphClearContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";
import { cancelIcon, pauseIcon, playIcon } from "../../../../../Resources/Icons";
import { DropDownButtons, IconButtons } from "../../../../Shared/Buttons";
import { Icon } from "../../../../Shared/Icon";
import { connectionRender, labelFaultyNode, labelPrimaryNode } from "../../Ancilliary/Computation/D3Pbft";
import { generateConnections, generateLabels, generateLines, generatePoints } from "../../Ancilliary/Computation/CompPbft";
import GraphContainer from "../Components/GraphContainer";
import { VizDataHistoryContext } from "../../../../../Context/visualizer";

const PBFT = () => {
    const { speed, changeSpeed } = useContext(PbftAnimationSpeedContext);

    const { messageHistory, currentTransaction } = useContext(VizDataHistoryContext)

    const {
        TRANSDURATION,
        REQUEST_BUFFER,
        PREPREPARE_BUFFER,
        PREPARE_BUFFER,
        COMMIT_BUFFER,
        REPLY_BUFFER
    } = PBFT_ANIMATION_SPEEDS[speed];

    const {
        TRANSDURATION_NP,
        REQUEST_BUFFER_NP,
        PREPREPARE_BUFFER_NP,
        PREPARE_BUFFER_NP,
        COMMIT_BUFFER_NP,
        REPLY_BUFFER_NP
    } = PBFT_ANIMATION_SPEEDS_NO_PRIMARY[speed];

    const { theme } = useContext(ThemeContext);

    const { clear, changeClear } = useContext(PbftGraphClearContext);

    const colorMode = !theme ? 'black' : "#c4c4c4";
    const pointColorMode = theme ? '#edf0f5' : '#464747';

    const [playing, setPlaying] = useState(true);

    const graphRef = useRef(null);
    const lineRef = useRef(null);
    const primaryLabelRef = useRef(null);
    const faultyReplicasLabelRef = useRef(null);
    const containerRef = useRef(null);
    const doesPrimaryExist = useRef(1);
    const yCoordToReplicasMap = useRef({});
    const transactionsSet = useRef({});
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = throttle(() => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        }, 200);

        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
            updateDimensions.cancel();
        };
    }, []);

    const clearSVGs = () => {
        d3.select(graphRef.current).selectAll("*").remove();
        d3.select(lineRef.current).selectAll("*").remove();
        d3.select(primaryLabelRef.current).selectAll("*").remove();
        d3.select(faultyReplicasLabelRef.current).selectAll("*").remove();
    };

    const debouncedRender = useCallback(() => {
        clearSVGs();

        const { width, height } = dimensions;

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

        const { points, primaryIndex, yCoordToReplicas, transactions } = generateConnections(
            data,
            NUMBER_OF_STEPS_PBFT_GRAPH,
            xCoords,
            yCoords,
            messageHistory,
            currentTransaction,
            theme
        );

        doesPrimaryExist.current = primaryIndex;
        yCoordToReplicasMap.current = yCoordToReplicas;
        transactionsSet.current = transactions;

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
            .attr("r", '1.5')
            .attr("fill", `${!theme ? "black" : "white"}`);

        console.log('THIS IS THE SVG', svg)

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
                .attr("markerWidth", 5)
                .attr("markerHeight", 5)
                .attr("orient", "auto-start-reverse")
                .append("path")
                .attr("fill", `${COLORS_PBFT_GRAPH[index]}`)
                .attr("d", "M 0 0 L 10 5 L 0 10 z")
        );

        // VERTICAL DOTTED LINES
        verticalLines.forEach((line, _) =>
            svg
                .append("path")
                .attr("d", lineGen(line))
                .attr("stroke", colorMode)
                .attr("fill", "none")
                .attr("stroke-width", 0.2)
                .attr("stroke-dasharray", "5,10")
        );

        // HORIZONTAL DOTTED LINES
        horizontalLines.forEach((line, _) =>
            svg
                .append("path")
                .attr("d", lineGen(line))
                .attr("stroke", colorMode)
                .attr("fill", "none")
                .attr("stroke-width", 0.2)
                .attr("stroke-dasharray", "5,10")
        );

        const relativeLabelFont = Math.floor((height + width) / 120)
        const relativeLabelYPos = Math.floor(relativeLabelFont / 2)
        const relativeLabelXPos = relativeLabelYPos - 4

        // LABELS FOR EACH ACTION
        labelsX.forEach((label) =>
            svg
                .append("text")
                .attr("transform", "translate(" + label.x + " ," + (label.y + relativeLabelYPos - 2) + ")")
                .attr("fill", colorMode)
                .attr("font-size", relativeLabelFont)
                .style("text-anchor", "middle")
                .text(`${label.title}`)
        );

        // LABELS FOR EACH NODE
        labelsY.forEach((label, _) => {
            const labelText = svg
                .append("text")
                .attr("transform", "translate(" + (label.x + relativeLabelXPos) + " ," + label.y + ")")
                .attr("font-size", relativeLabelFont)
                .style("text-anchor", "middle")
                .text(`${label.title}`)
                .attr("fill", colorMode)
            return labelText;
        });

        if (!clear) {

            let primaryLabelSVG;

            const faultyReplicasLabelSVG = d3
                .select(faultyReplicasLabelRef.current)
                .attr("width", width)
                .attr("height", height)

            if (primaryIndex !== -1) {
                primaryLabelSVG = d3
                    .select(primaryLabelRef.current)
                    .attr("width", width)
                    .attr("height", height)
            }

            const lineSVG = d3
                .select(lineRef.current)
                .attr("width", width)
                .attr("height", height)
                .classed("flex", true)
                .classed("justify-center", true)
                .classed("items-center", true);


            // CREATE LABELS FOR FAULTY NODES
            let faultyReplicaIndices = new Set();
            for (let [_, value] of Object.entries(yCoordToReplicasMap.current)) {
                if (!transactionsSet.current.has(value)) faultyReplicaIndices.add(value)
            }

            const relativeSpecialLabelFont = Math.floor((height + width) / 120)

            labelsY.forEach((label, index) => {
                if (faultyReplicaIndices.has(index)) return labelFaultyNode(faultyReplicasLabelSVG, label, relativeSpecialLabelFont);
            })

            // IF PRIMARY DOES NOT EXIST AND VICEVERSA
            if (primaryIndex === -1) {

                // REQUEST LINES
                points.request.end[0].points.length > 0 && points.request.end[0].points.forEach((end, i) => {
                    connectionRender([points.request.start[0].points, end], points.request.color, pointColorMode, TRANSDURATION_NP, i * REQUEST_BUFFER_NP, lineGen, lineSVG, 'request');
                });

                // PRE-PREPARE LINES
                points.prePrepare.start.length > 0 && points.prePrepare.start.map((start, index) =>
                    points.prePrepare.end[index].map((end, i) => {
                        return (
                            end.flag && connectionRender([start, end.points], points.prePrepare.color, pointColorMode, TRANSDURATION_NP, i * 1 + PREPREPARE_BUFFER_NP, lineGen, lineSVG, 'prepare')
                        );
                    })
                );

                // PREPARE LINES
                points.prepare.start.length > 0 && points.prepare.start.map((start, index) =>
                    points.prepare.end[index].map((end, i) => {
                        return (
                            end.flag && connectionRender([start, end.points], points.prepare.color, pointColorMode, TRANSDURATION_NP, i * 1 + PREPARE_BUFFER_NP, lineGen, lineSVG, 'prepare')
                        );
                    })
                );

                // COMMIT LINES
                points.commit.start.length > 0 && points.commit.start.map((start, index) =>
                    points.commit.end[index].map((end, i) => {
                        return (
                            end.flag && connectionRender([start, end.points], points.commit.color, pointColorMode, TRANSDURATION_NP, i * 1 + COMMIT_BUFFER_NP, lineGen, lineSVG, 'commit')
                        );
                    })
                );

                // REPLY LINES
                points.reply.start.length > 0 && points.reply.start.forEach((start, i) => {
                    return (
                        start.flag && connectionRender([start.points, points.reply.end[0].points], points.reply.color, pointColorMode, TRANSDURATION_NP, i * 1 + REPLY_BUFFER_NP, lineGen, lineSVG, 'reply')
                    );
                });

            } else {

                labelsY.forEach((label, index) => {
                    if (index === primaryIndex) return labelPrimaryNode(primaryLabelSVG, label);
                })

                points.request.end.length > 0 && points.request.end.forEach((end, i) => {
                    if (end.flag) {
                        connectionRender([points.request.start[0].points, end.points], points.request.color, pointColorMode, TRANSDURATION, i * REQUEST_BUFFER, lineGen, lineSVG, 'request');
                    }
                });

                // PRE-PREPARE LINES
                points.prePrepare.end.length > 0 && points.prePrepare.end.forEach((end, i) => {
                    if (end.flag) {
                        connectionRender([points.prePrepare.start[0].points, end.points], points.prePrepare.color, pointColorMode, TRANSDURATION, i * 1 + PREPREPARE_BUFFER, lineGen, lineSVG, 'prePrepare');
                    }
                });

                // PREPARE LINES
                points.prepare.start.length > 0 && points.prepare.start.map((start, index) =>
                    points.prepare.end[index].map((end, i) => {
                        return (
                            end.flag && connectionRender([start, end.points], points.prepare.color, pointColorMode, TRANSDURATION, i * 1 + PREPARE_BUFFER, lineGen, lineSVG, 'prepare')
                        );
                    })
                );

                // COMMIT LINES
                points.commit.start.length > 0 && points.commit.start.map((start, index) =>
                    points.commit.end[index].map((end, i) => {
                        return (
                            end.flag && connectionRender([start, end.points], points.commit.color, pointColorMode, TRANSDURATION, i * 1 + COMMIT_BUFFER, lineGen, lineSVG, 'commit')
                        );
                    })
                );

                // REPLY LINES
                points.reply.start.length > 0 && points.reply.start.forEach((start, i) => {
                    return (
                        start.flag && connectionRender([start.points, points.reply.end[0].points], points.reply.color, pointColorMode, TRANSDURATION, i * 1 + REPLY_BUFFER, lineGen, lineSVG, 'reply')
                    );
                });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, dimensions, messageHistory, currentTransaction, clear]);

    useEffect(() => {
        debouncedRender();
    }, [debouncedRender]);

    useEffect(() => {
        changeClear(true)
        setTimeout(() => {
            changeClear(false)
        }, 500)
    }, [speed])

    const onClear = () => {
        changeClear(true);
        setPlaying(false);
    }

    const onPlay = () => {
        changeClear(false);
        setPlaying(true);
    }

    const animationSpeedChange = (value) => changeSpeed(value);

    const color = theme && clear ? 'gray' : theme && !clear ? 'white' : !theme && clear ? 'gray' : 'black';

    return (
        <GraphContainer title={'Practical Byzantine Fault Tolerance'} heightBig>
            <div className="flex items-center justify-around w-full flex-row mt-12">
                <div className="basis-1/4">
                    {doesPrimaryExist.current === -1 && (
                        <div className="text-amber-600 font-18p border-1p rounded-md p-1 border-amber-600 w-180p flex items-center justify-center ml-8">
                            !No Primary Exists&#161;
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center gap-x-16 basis-1/2">
                    <IconButtons title={!clear ? 'Playing' : 'Play'} onClick={() => onPlay()} disabled={!clear}>
                        <Icon path={!clear ? pauseIcon : playIcon} viewBox={'0 0 384 512'} height={'11px'} fill={color} />
                    </IconButtons>
                    {playing && (
                        <DropDownButtons selected={speed} elements={['1x', '0.5x', '2x']} onClick={animationSpeedChange} />
                    )}
                    <IconButtons title={'Clear'} onClick={() => onClear()} disabled={clear}>
                        <Icon path={cancelIcon} viewBox={'0 0 384 512'} height={'12px'} fill={color} />
                    </IconButtons>
                </div>
                <div className="basis-1/4" />
            </div>
            <div ref={containerRef} className='relative w-full h-full pl-8 pr-0 pb-1'>
                {/* {resizing ? (
                    <div className='loader'>
                        <div>PBFT</div>
                        <div className='inner' />
                    </div>
                ) : (
                    <> */}
                <svg id={'svg-one'} ref={graphRef} className='absolute'></svg>
                {!clear && (
                    <>
                        <svg ref={lineRef} className='absolute'></svg>
                        <svg ref={primaryLabelRef} className='absolute'></svg>
                        <svg ref={faultyReplicasLabelRef} className='absolute'></svg>
                    </>
                )}
                {/* </>
                )} */}
            </div>
        </GraphContainer>
    );
};

export default PBFT;
