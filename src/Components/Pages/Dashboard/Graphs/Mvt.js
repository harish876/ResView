
import { ResponsiveLine } from "@nivo/line";
import { useContext, useEffect, useState } from "react";
import { COLORS_MVT_GRAPH } from "../../../../Constants";
import { GraphResizerContext, GraphViewContext } from "../../../../Context/graph";
import Loader from "../../../Shared/Loader";
import ResizableContainer from "../Resizable";
import { Icon } from "../../../Shared/Icon";
import { anglesRightIcon } from "../../../../Resources/Icons";
import { MvTSelectButton, ReplicaButton } from "../../../Shared/Buttons";

const LABEL_TOGGLES = { "Replica 1": true, "Replica 2": true, "Replica 3": true, "Replica 4": true }

const FAULT_TOGGLES = { "Replica 1": false, "Replica 2": false, "Replica 3": false, "Replica 4": false }

const MVT_GRAPH_LABELS = ['Replica 1', 'Replica 2', 'Replica 3', 'Replica 4']

const MvtGraph = ({ points }) => {
    return (
        <ResponsiveLine
        points = {points}
        // TODO: Uncomment the below code and remove the above data passing code 
        // data={points}
        margin = {{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale = {{
            type: "linear",
                min: "auto",
                    max: "auto",
                        stacked: false,
                            reverse: false,
                            }}
        yScale = {{
            type: "linear",
                min: "auto",
                    max: "auto",
                        stacked: false,
                            reverse: false,
                            }}
        xFormat = ' >-.2f'
        yFormat = ' >-.2f'
        axisTop = { null}
        axisRight = { null}
        axisBottom = {{
            tickSize: 5,
                tickPadding: 5,
                    tickRotation: 0,
                        legend: "Time Since Replica Started Accepting Messages(10^-5 seconds)",
                            legendOffset: 36,
                                legendPosition: "middle",
                                    fontColor: '#fff'
        }}
        axisLeft = {{
            tickSize: 5,
                tickPadding: 5,
                    tickRotation: 0,
                        legend: "Number of Messages",
                            legendOffset: -40,
                                legendPosition: "middle",
                            }}
        enablePoints = { true}
        pointSize = { 10}
        pointColor = {{ theme: "background" }}
        pointBorderWidth = { 2}
        pointBorderColor = {{ from: "serieColor" }}
        pointLabelYOffset = {- 12}
        useMesh = { true}
        legends = {
            [
            {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
    />
    );
}

// TODO: Change the value of currentTransaction when connecting to BE also pass messageHistory to the Mvt component in the index of Graphs  
const Mvt = ({ messageHistory, currentTransaction=17 }) => {
    const { boxValues, resizing, setResizing } = useContext(GraphResizerContext);
    const { toggleMvtGraphNoChange } = useContext(GraphViewContext);

    const [points , setPoints] = useState();
    const [messageChartData, setMessageChartData] = useState([]);

    const [labelToggle, setLabelToggle] = useState(LABEL_TOGGLES);
    const [labelToggleFaulty, setLabelToggleFaulty] = useState(FAULT_TOGGLES);

    const [resetGraph, setResetGraph] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const updateGraph = () => {
        let value = resetGraph;
        value = value + 1;
        setResetGraph(value);
    }

    const sendMessage = (replicaNumber) => {
        const ws_list = ['22001', '22002', '22003', '22004'];
        const sendWs = new WebSocket('ws://localhost:' + ws_list[replicaNumber]);
        sendWs.onopen = () => {
            sendWs.send("Message");
        }
    }

    const toggleFaulty = (label) => {
        setLabelToggleFaulty((prevLabels) => {
            const updatedLabels = { ...prevLabels };
            updatedLabels[label] = !updatedLabels[label];
            return updatedLabels;
        });
        sendMessage(parseInt(label.slice(-1) - 1));
        updateGraph();
    };

    const toggleLine = (label) => {
        setLabelToggle((prevLabels) => {
            const updatedLabels = { ...prevLabels };
            updatedLabels[label] = !updatedLabels[label];
            return updatedLabels;
        });
        updateGraph();
    };

    useEffect(() => {
        console.log('MESSAGE HISTORY', messageHistory);
        if (!(currentTransaction in messageHistory) || messageHistory[currentTransaction].current_time < 0) {
            setMessageChartData([[], []])
            // console.log(currentTransaction, " Not in messageHistory")
        }
        else {
            const transactionData = messageHistory[currentTransaction];
            console.log("TRANSACTION", transactionData)
            let startTime = 0;
            let firstPrepareTime = 0;
            let pre_prepare_times = [];
            let prepare_times = [];
            let all_prepare_times = [];
            let all_commit_times = [];
            let label_list = [];

            Object.keys(transactionData).forEach((key) => {
                label_list.push("Replica " + key);
                if (transactionData[key].primary_id !== transactionData[key].replica_id) {
                    pre_prepare_times.push(Math.floor(transactionData[key].propose_pre_prepare_time / 10000));
                }
                prepare_times.push(Math.floor(transactionData[key].prepare_time / 10000));
                let replica_prepare_timestamps = [];
                let replica_commit_timestamps = [];
                transactionData[key]["prepare_message_timestamps"].map((time) => {
                    replica_prepare_timestamps.push(Math.floor(time / 10000));
                });
                transactionData[key]["commit_message_timestamps"].map((time) => {
                    replica_commit_timestamps.push(Math.floor(time / 10000));
                });
                all_prepare_times.push(replica_prepare_timestamps);
                all_commit_times.push(replica_commit_timestamps);
            });
            startTime = Math.min(...pre_prepare_times);
            firstPrepareTime = Math.min(...prepare_times);

            let prepareChartData = [];
            let commitChartData = [];
            for (const element of all_prepare_times) {
                let lineData = [{ x: 0, y: 0 }];
                for (let j = 0; j < element.length; j++) {
                    lineData.push({ x: element[j] - startTime, y: j });
                    lineData.push({ x: element[j] - startTime, y: j + 1 });
                }
                prepareChartData.push(lineData);
            }
            for (const element of all_commit_times) {
                let lineData = [{ x: 0, y: 0 }];
                for (let j = 0; j < element.length; j++) {
                    lineData.push({ x: element[j] - firstPrepareTime, y: j });
                    lineData.push({ x: element[j] - firstPrepareTime, y: j + 1 });
                }
                commitChartData.push(lineData);
            }

            let preparePoints = [];
            let data = {};
            for (let i = 0; i < label_list.length; i++) {
                if (!labelToggle[label_list[i]]) {
                    data = {
                        id: label_list[i],
                        color: COLORS_MVT_GRAPH[i],
                        data: [],
                    };
                }
                else {
                    data = {
                        id: label_list[i],
                        color: COLORS_MVT_GRAPH[i],
                        data: prepareChartData[i],
                    };
                }
                preparePoints.push(data);
            }
            let commitPoints = [];
            for (let i = 0; i < label_list.length; i++) {
                if (!labelToggle[label_list[i]]) {
                    data = {
                        id: label_list[i],
                        color: COLORS_MVT_GRAPH[i],
                        data: [],
                    };
                }
                else {
                    data = {
                        id: label_list[i],
                        color: COLORS_MVT_GRAPH[i],
                        data: commitChartData[i],
                    };
                }
                commitPoints.push(data);
            }
            let pointData = { 1: preparePoints, 2: commitPoints };
            console.log("Graph: ", pointData);
            setMessageChartData(pointData);
        }
    }, [messageHistory, currentTransaction, labelToggle, resetGraph]);

    return (
        <div className="flex flex-col">
            <div className='dark:text-gray-300 text-gray-700 font-bold text-24p text-center'>
                Messages vs Time Graph
            </div>
            <div className="flex items-center justify-center gap-x-16 mt-8 mb-4">
                <MvTSelectButton title={'Prepare Messages'} onClick={() => toggleMvtGraphNoChange(1)} graphNo={1} />
                <MvTSelectButton title={'Commit Messages'} onClick={() => toggleMvtGraphNoChange(2)} graphNo={2} />
            </div>
            <ResizableContainer>
                <div className='relative w-full h-full pl-4 pr-2 pb-6'>
                    {(resizing || isLoading) ? (
                        <div class='loader'>
                            <div>MVT</div>
                            <div class='inner' />
                        </div>
                    ) : (
                        <>
                                {/* <MvtGraph points={messageChartData[mvtGraphNo]} /> */}
                        </>
                    )}
                </div>
            <div className='absolute bottom-0 right-0 rotate-45'>
                <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
            </div>
            </ResizableContainer>
            <div className='mb-4 flex items-center justify-center'>
                <MvTGraphManipulator
                    toggleFaulty={toggleFaulty}
                    toggleLine={toggleLine}
                    labelToggleFaulty={labelToggleFaulty}
                    labelToggle={labelToggle}
                />
            </div>
        </div>
    );
};

export const MvTGraphManipulator = ({
    labelToggleFaulty,
    labelToggle,
    toggleFaulty,
    toggleLine,
}) => {
    return (
        <div className='mt-2 rounded-md shadow-md w-700p py-6 px-2 dark:border-1p dark:border-solid dark:border-gray-50 flex flex-col gap-y-6'>
            <div className="flex flex-col gap-y-4">
                <div className='dark:text-gray-300 text-gray-700 font-bold text-18p text-center'>
                    Select Replica To be Faulty:                
                </div>
                <div className='flex gap-x-7 justify-center'>
                    {MVT_GRAPH_LABELS.length > 0 && MVT_GRAPH_LABELS.map((title, index) => (
                        <ReplicaButton
                            title={title}
                            onClick={() => toggleFaulty(title)}
                            faulty={labelToggleFaulty[title]}
                            key={index}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className='dark:text-gray-300 text-gray-700 font-bold text-18p text-center'>
                    Toggle Line Graph:
                </div>
                <div className='flex gap-x-7 justify-center'>
                    {MVT_GRAPH_LABELS.length > 0 && MVT_GRAPH_LABELS.map((title, index) => (
                        <ReplicaButton
                            title={title}
                            onClick={() => toggleLine(title)}
                            lineActive={labelToggle[title]}
                            lineToggle={true}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mvt;
