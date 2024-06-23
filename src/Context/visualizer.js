import React, { createContext, useEffect, useState } from "react";
import { dummyData } from "../Components/Pages/Visualizer/Ancilliary/Data/data";
import { computeTransInfo } from "../Components/Pages/Visualizer/Ancilliary/Computation/TransInfo";

export const VizDataHistoryContext = createContext({
    messageHistory: {},
    changeMessageHistory: () => { },
    currentTransaction: 17,
    changeCurrentTransaction: () => { },
    replicaStatus: [false, false, false, false]
});

export const VizDataHistoryProvider = ({ children }) => {
    const { Provider } = VizDataHistoryContext;
    const [messageHistory, setMessageHistory] = useState(dummyData);
    const [currentTransaction, setCurrentTransaction] = useState(17);
    const [replicaStatus, setReplicaStatus] = useState([false, false, false, false])
    const [primaryIndexVal, setPrimaryIndexVal] = useState(-1)


    const changeMessageHistory = (value) => {
        setMessageHistory(value)
    }

    const changeCurrentTransaction = (value) => {
        setCurrentTransaction(value)
    }

    const fetchWithTimeout = (url, options, timeout = 5000) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), timeout)
            )
        ]);
    }

    const fetchReplicaStatuses = () => {
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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetchReplicaStatuses();
    //     }, 3000); // 3000 milliseconds = 3 seconds

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        let results = [false, false, false, false];
        const { primaryIndex, currentStatus } = computeTransInfo(messageHistory, currentTransaction, results)

        setReplicaStatus(currentStatus)
        setPrimaryIndexVal(primaryIndex)
        // ! CHECK THE BELOW DEPENDENCIES WHEN THIS CONNECTED TO THE BE
    }, [currentTransaction, messageHistory])

    return (
        <Provider value={
            {   messageHistory, 
                changeMessageHistory, 
                changeCurrentTransaction, 
                replicaStatus, 
                currentTransaction, 
                primaryIndexVal, 
            }
        }>
            {children}
        </Provider>
    )
}