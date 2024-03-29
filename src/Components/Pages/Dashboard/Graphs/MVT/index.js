
import { useContext, useEffect, useState } from "react";
import { COLORS_MVT_GRAPH } from "../../../../../Constants";
import { GraphResizerContext, GraphViewContext } from "../../../../../Context/graph";
import { anglesRightIcon } from "../../../../../Resources/Icons";
import { MvTSelectButton } from "../../../../Shared/Buttons";
import { Icon } from "../../../../Shared/Icon";
import { FontVarTitle } from "../../../../Shared/Title";
import ResizableContainer from "../../ResizableContainer";
import Manipulator from "./Manipulator";
import MvtGraph from "./Graph";

const LABEL_TOGGLES = { "Replica 1": true, "Replica 2": true, "Replica 3": true, "Replica 4": true }

const FAULT_TOGGLES = { "Replica 1": false, "Replica 2": false, "Replica 3": false, "Replica 4": false }


// TODO: Change the value of currentTransaction when connecting to BE also pass messageHistory to the Mvt component in the index of Graphs  
const Mvt = ({ messageHistory, currentTransaction = 17 }) => {
    const { boxValues, resizing, setResizing } = useContext(GraphResizerContext);
    const { toggleMvtGraphNoChange, mvtGraphNo } = useContext(GraphViewContext);

    const [points, setPoints] = useState();
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

        const setFaulty = async (label) => {
            console.log(label);
            try {
                let response = await fetch('http://localhost:1850' + String(label.charAt(label.length - 1)) + '/make_faulty');
                

                console.log(response.body());
            } catch (error) {
                //console.error('Error toggling faulty:', error);
            }
        }

        setFaulty(label);

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
            setMessageChartData(pointData);
        }
    }, [messageHistory, currentTransaction, labelToggle, resetGraph]);

    return (
        <div className="flex flex-col">
            <FontVarTitle title={'Messages vs Time Graph'} />
            <div className="flex items-center justify-center gap-x-16 mt-8 mb-10">
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
                            <MvtGraph points={messageChartData[mvtGraphNo]} />
                        </>
                    )}
                </div>
                <div className='absolute bottom-0 right-0 rotate-45'>
                    <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
                </div>
            </ResizableContainer>
            <div className='mt-10 mb-4 flex items-center justify-center'>
                <Manipulator
                    toggleFaulty={toggleFaulty}
                    toggleLine={toggleLine}
                    labelToggleFaulty={labelToggleFaulty}
                    labelToggle={labelToggle}
                />
            </div>
        </div>
    );
};


export default Mvt;
