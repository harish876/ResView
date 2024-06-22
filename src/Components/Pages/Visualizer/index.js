import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { DATA_TABLE_DELAY } from "../../../Constants";
import { ThemeContext } from "../../../Context/theme";
import { tableIcon } from "../../../Resources/Icons";
import Footer from "../../Shared/Footer";
import HRline from '../../Shared/HRline';
import { Icon } from "../../Shared/Icon";
import { FontVarTitle } from "../../Shared/Title";
import DataTable from './DataTable';
import Mvt from './Graphs/Mvt';
import Pbft from './Graphs/Pbft';
import TransInfo from './TransComps/Info';
import TransAnalyticsItem from "./TransComps/TransAnalyticsItem";


const Visualizer = () => {
    const { theme } = useContext(ThemeContext)
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

    const goToTransTable = () => {
        const element = document.getElementById("transaction-table");
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };


    return (
        <div className="py-6 h-full">
            <TransInfo 
                messageHistory={messageHistory} 
                transactionNumber={currentTransaction} 
                status={replicaStatus} 
            />
            <div className="ml-[220px] px-8 pt-6 h-full">
                <div className="grid grid-cols-3f-1f gap-x-6 w-full h-full">
                    <Pbft
                        messageHistory={messageHistory}
                        realTransactionNumber={currentTransaction}
                    />
                    <div className="grid grid-rows-2 gap-y-4">
                        <div className={classNames('flex flex-col justify-center items-center rounded-md border-3p bg-blue-10 dark:border-solid dark:bg-blue-450 relative w-full')}>
                            <FontVarTitle title={'Transactions Overview'} />
                            <div className="w-full h-50p absolute bottom-0 flex items-center justify-center gap-x-4 border-t-3p dark:border-solid cursor-pointer" onClick={goToTransTable}>
                                <Icon path={tableIcon} fill={theme ? "rgb(209,213,219)" : "black"} height={"1.2em"} />
                                <div className="dark:text-gray-300 text-gray-700 font-bold text-center text-16p">
                                    Go To Transactions
                                </div>
                            </div>
                        </div>
                        <div className={classNames('flex flex-col rounded-md bg-blue-10 border-3p dark:border-solid dark:bg-blue-450 relative w-full')}>
                            <div className="flex items-center justify-center w-full border-b-2p dark:border-solid h-60p">
                                <FontVarTitle title={'Transactions Overview'} />
                            </div>
                            <div className="grid grid-rows-2 h-full w-full">
                                <div className="flex items-center justify-center w-full border-b-2p dark:border-solid">
                                    <TransAnalyticsItem key={index} value={'Total Transactions'} />
                                </div>
                                <div className="grid grid-cols-2 flex-items-center-justify-center w-full">
                                    <div className="border-r-2p dark:border-solid">
                                        <TransAnalyticsItem key={index} value={'Average Faultiness'} />
                                    </div>
                                    <div>
                                        <TransAnalyticsItem key={index} value={'No Primary'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-8 px-24 w-full">
                    <HRline />
                </div>
                <Mvt
                    messageHistory={messageHistory}
                    currentTransaction={currentTransaction}
                />
                <div className="my-10 px-24 w-full">
                    <HRline />
                </div>
                <div className="px-24" id="transaction-table">
                    <DataTable 
                        messageHistory={messageHistory} 
                        delay={DATA_TABLE_DELAY}
                    />
                </div>
                <div className="mt-10 mb-24 px-24 w-full">
                    <HRline />
                </div>
                <div className="mb-[-2em]">
                    <Footer />
                </div>
            </div>
        </div>
    )
}


const index = () => {
    return (
        <Visualizer />
    );
}


export default index