import React, { createContext, useEffect, useState } from "react";
import { dummyData } from "../Components/Pages/Visualizer/Ancilliary/Data/data";
import { computeTableData, computeTransInfo, truncData } from "../Components/Pages/Visualizer/Ancilliary/Computation/TransInfo";

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
    const [data, setData] = useState({});    
    const [truncatedData, setTruncatedData] = useState({});    
    const [totalPercentFaulty, setTotalPercentFaulty] = useState(0);
    const [totalHistoryLength, setTotalHistoryLength] = useState(0);
    const [noPrimaryCount, setNoPrimaryCount] = useState(0);
    const [loading, setLoading] = useState(false);


    const changeMessageHistory = (value) => {
        setMessageHistory(value)
    }

    const changeCurrentTransaction = (value) => {
        setLoading(true);
        setCurrentTransaction(value)
        const smallData = truncData(data, value);
        setTruncatedData(smallData)
        setLoading(false);
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


    useEffect(() => {
        setLoading(true);
        let results = [false, false, false, false];
        const { primaryIndex, currentStatus } = computeTransInfo(messageHistory, currentTransaction, results)

        setReplicaStatus(currentStatus)
        setPrimaryIndexVal(primaryIndex)

        const { data, totalPctFaulty, totalHistLength, noPrimaryCnt } = computeTableData(messageHistory);

        const smallData = truncData(data, currentTransaction);

        setData(data);
        setTotalPercentFaulty(totalPctFaulty)
        setTotalHistoryLength(totalHistLength)
        setNoPrimaryCount(noPrimaryCnt);
        setTruncatedData(smallData)

        setLoading(false);
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
                data, 
                totalPercentFaulty,
                totalHistoryLength,
                noPrimaryCount,
                loading,
                truncatedData
            }
        }>
            {children}
        </Provider>
    )
}