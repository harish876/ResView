// !! IMPORTANT - DELETE THIS FOLDER AFTER VISUALIZER IS COMPLETE


import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { GraphResizerContext, GraphViewContext } from "../../../Context/graph";
import { anglesRightIcon, eyeIcon } from "../../../Resources/Icons";
import { LinkButton } from '../../Shared/Buttons';
import { Icon } from '../../Shared/Icon';
import Title, { FontVarTitle, Subtitle } from '../../Shared/Title';
import Wrapper from "../../Shared/Wrapper";
import Input from '../Visualizer/Components/Input';
import Mvt from './Graphs/MVT';
import PBFT from './Graphs/PBFT';
import HRline from '../../Shared/HRline';
import ResizableContainer from './ResizableContainer';
import TransInfo from './TransInfo'
import { WebSocketDemo } from '../../../Socket';


const colorList = ["hsl(148, 70%, 50%)", "hsl(200, 70%, 50%)", "hsl(171, 70%, 50%)", "hsl(313, 70%, 50%)"];




const Dashboard = () => {
    const { graph, mvtGraphNo } = useContext(GraphViewContext);
    const { boxValues, setBoxValues, setResizing } =
        useContext(GraphResizerContext);


    const [messageHistory, setMessageHistory] = useState({});
    const [currentTransaction, setCurrentTransaction] = useState(0);
    const [messageChartData, setMessageChartData] = useState([]);
    const [labelToggle, setLabelToggle] = useState({ "Replica 1": true, "Replica 2": true, "Replica 3": true, "Replica 4": true });
    const [resetGraph, setResetGraph] = useState(0);
    const [replicaStatus, setReplicaStatus] = useState([false, false, false, false])


   const onMessage = (newData, txn_number)=>{
        setMessageHistory(JSON.parse(JSON.stringify(newData)));
        setCurrentTransaction(txn_number);
      };

    function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
    }
      
    function fetchReplicaStatuses() {
        let promises = [];
        let results = [false, false, false, false];
    
        for (let i = 0; i < 4; i++) {
            let promise = fetchWithTimeout('http://localhost:1850' + String(i + 1) + '/get_status')
                .then(response => {
                    return response.text(); 
                })
                .then(body => {
                    if (body === 'Not Faulty') {
                        results[i] = true;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    
            promises.push(promise);
        }
    
        Promise.all(promises)
            .then(() => {
                setReplicaStatus(results);
            });
    }
    useEffect(() => {
        const interval = setInterval(() => {
          fetchReplicaStatuses();
        }, 3000); // 3000 milliseconds = 3 seconds
    
        return () => clearInterval(interval);
      }, []);




    useEffect(() => {
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
                        color: colorList[i],
                        data: [],
                    };
                }
                else {
                    data = {
                        id: label_list[i],
                        color: colorList[i],
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
                        color: colorList[i],
                        data: [],
                    };
                }
                else {
                    data = {
                        id: label_list[i],
                        color: colorList[i],
                        data: commitChartData[i],
                    };
                }
                commitPoints.push(data);
            }
            let pointData = { 1: preparePoints, 2: commitPoints };
            setMessageChartData(pointData);
        }
    }, [messageHistory, currentTransaction, labelToggle, resetGraph]);


    const sendGet = async (key) => {
        let url = 'http://127.0.0.1:18000/v1/transactions/' + key;
        try {
            const response = await axios.get(url);
            // console.log("Get response: ", response.data);
        }
        catch (error) {
            // console.error("Error: ", error);
        }
    };


    const sendPost = async (key, value) => {
        let data = { "id": key, "value": value };
        let url = 'http://127.0.0.1:18000/v1/transactions/commit';
        try {
            const response = await axios.post(
                url,
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            // console.log("Get response: ", response.data);
        }
        catch (error) {
            // console.error("Error: ", error);
        }
    };
    return (
        <Wrapper>
            <div className="mt-6 mb-6">
                <Title title={'Visualizer'} icon={eyeIcon} iconViewBox={'0 0 576 512'} titleFontSize={''} />
            </div>
            <div>
                <Subtitle subtitle={'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat vitae, dolor illo harum consequatur ea, temporibus, corrupti iure veniam esse quisquam ut quidem dignissimos quasi. Quas totam temporibus'} />
            </div>
            {<WebSocketDemo onMessage={onMessage} />}
            {/* TODO: Change the below TransactionSelect Component */}
            <div className="my-8">
                <Input chooseTransaction={setCurrentTransaction} sendGet={sendGet} sendPost={sendPost}/>
            </div>
            <div className="w-full">
                <TransInfo messageHistory={messageHistory} transactionNumber={currentTransaction} status={replicaStatus} />
            </div>
            <div className="my-10 flex items-center jusitfy-center gap-x-16">
                <LinkButton title={'PBFT Graph'} link={'/pages/visualizer'} scrollId={'pbft-graph'} />
                <LinkButton title={'Messages v Time Graph'} link={'/pages/visualizer'} scrollId={'mvt-graph'} />
            </div>
            <div className="my-12 w-full">
                <HRline />
            </div>
            <div className="" id='pbft-graph'>
                <div className="mb-8">
                    <FontVarTitle title={'Practical Byzantine Fault Tolerance Graph'} />
                </div>
                <ResizableContainer>
                    <PBFT
                        messageHistory={messageHistory}
                        realTransactionNumber={currentTransaction}
                    />
                    <div className='absolute bottom-0 right-0 rotate-45'>
                        <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
                    </div>
                </ResizableContainer>
            </div>
            <div className="mt-24 mb-16 w-full">
                <HRline />
            </div>
            <div className="" id="mvt-graph">
                <Mvt
                    messageHistory={messageHistory}
                    currentTransaction={currentTransaction}
                />
            </div>
        </Wrapper>
    )
}


const index = () => {
    return (
        <>
            {/* <ParticleWrapper>
                <Dashboard />
            </ParticleWrapper> */}
            <Dashboard />
        </>
    );
}


export default index



