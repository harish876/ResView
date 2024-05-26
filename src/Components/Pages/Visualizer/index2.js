import React, { useEffect, useState } from "react";
import { VISUALIZER_PAGE_SUBTITLE } from "../../../Constants";
import { anglesRightIcon, eyeIcon } from "../../../Resources/Icons";
import { WebSocket } from '../../../Socket';
import { LinkButton } from '../../Shared/Buttons';
import HRline from '../../Shared/HRline';
import { Icon } from '../../Shared/Icon';
import Title, { FontVarTitle, Subtitle } from '../../Shared/Title';
import {VisualizerWrapper} from "../../Shared/Wrapper";
import Mvt from './Graphs/MVT';
import PBFT from './Graphs/PBFT';
import Input from './Input';
import ResizableContainer from './ResizableContainer';
import TransInfo from './TransInfo';


const Visualizer = () => {
    const [messageHistory, setMessageHistory] = useState({});
    const [currentTransaction, setCurrentTransaction] = useState(17);
    const [replicaStatus, setReplicaStatus] = useState([false, false, false, false])


    const onMessage = (newData, txn_number) => {
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
            //let port= parseInt(process.env.REACT_APP_DEFAULT_LOCAL_PORT)+i
            //let url = process.env.REACT_APP_DEFAULT_LOCAL + String(port) + process.env.REACT_APP_REPLICA_STATUS_EP
            let port = parseInt(18501) + i
            let url = "http://localhost:" + String(port) + "/get_status"
            let promise = fetchWithTimeout(url)
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


    return (
        <div className="py-6">
            <TransInfo messageHistory={messageHistory} transactionNumber={currentTransaction} status={replicaStatus} />
            <div className="ml-[220px] p-2 py-6">
                <div className="grid grid-cols-2 gap-x-12 w-full">
                    <div className="" id='pbft-graph'>
                        <div className="mb-8">
                            <FontVarTitle title={'Practical Byzantine Fault Tolerance Graph'} />
                        </div>
                        <ResizableContainer>
                            {/* <PBFT
                        messageHistory={messageHistory}
                        realTransactionNumber={currentTransaction}
                    /> */}
                            {/* <div className='absolute bottom-0 right-0 rotate-45'>
                            <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
                        </div> */}
                        </ResizableContainer>
                    </div>
                    <div className="" id='pbft-graph'>
                        <div className="mb-8">
                            <FontVarTitle title={'View Change Graph'} />
                        </div>
                        <ResizableContainer>
                            {/* <PBFT
                        messageHistory={messageHistory}
                        realTransactionNumber={currentTransaction}
                    /> */}
                            {/* <div className='absolute bottom-0 right-0 rotate-45'>
                            <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
                        </div> */}
                        </ResizableContainer>
                    </div>
                </div>
                <div className="mt-24 mb-16 w-full">
                    {/* <HRline /> */}
                </div>
                <div className="" id="mvt-graph">
                    <Mvt
                        messageHistory={messageHistory}
                        currentTransaction={currentTransaction}
                    />
                </div>
            </div>   
        </div>
    )
}


const index = () => {
    return (
        <>
            <Visualizer />
        </>
    );
}


export default index



