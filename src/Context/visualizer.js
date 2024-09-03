import React, { createContext, useEffect, useRef, useState } from "react";
import { dummyData } from "../Components/Pages/Visualizer/Ancilliary/Data/data";
import { computeTableData, computeTransInfo, truncData } from "../Components/Pages/Visualizer/Ancilliary/Computation/TransInfo";

export const VizDataHistoryContext = createContext({
    messageHistory: {},
    changeMessageHistory: (newHistory) => { },
    currentTransaction: 17,
    changeCurrentTransaction: (transactionNumber) => { },
    replicaStatus: [false, false, false, false],
    primaryIndexVal: -1,
    data: {},
    truncatedData: {},
    totalPercentFaulty: 0,
    totalHistoryLength: 0,
    noPrimaryCount: 0,
    loading: false,
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
    const transactionCount = useRef(0);
    const allMessages = useRef({});
    const keyList = useRef([[], [], [], []]);
    let updatedMessageList;


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

    const onMessage = (newData, txn_number) => {
        if (messageHistory) {
            let incomingData = JSON.parse(JSON.stringify(newData))
            changeMessageHistory({
                ...messageHistory,
                ...incomingData
            })
        } else {
            changeMessageHistory(JSON.parse(JSON.stringify(newData)));
        }
    };

    const addMessage = (receivedMessage) => {
        if (receivedMessage === null) {
            return;
        }
        const reply = new Date().getTime();
        let newMessage = {
            ...receivedMessage,
            reply_time: reply,
        }
        const txn_number = String(newMessage.txn_number);
        const replica_number = String(newMessage.replica_id);
        updatedMessageList = allMessages.current;
        if (txn_number in updatedMessageList) {
            let txn_messages = updatedMessageList[txn_number];
            txn_messages = {
                ...txn_messages,
                [replica_number]: newMessage,
            };
            updatedMessageList[txn_number] = txn_messages;
            allMessages.current = updatedMessageList;
        }
        else {
            let txn_messages = {
                [replica_number]: newMessage,
            }
            updatedMessageList[txn_number] = txn_messages;
            allMessages.current = updatedMessageList;
            transactionCount.current = transactionCount.current + 1;
        }
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

    useEffect(() => {
        const fetchData = async (replicaPort) => {
            try {
                let port = parseInt(18501) + replicaPort
                const response = await fetch("http://localhost:" + String(port) + "/consensus_data");
                const newData = await response.json();
                Object.keys(newData).map(key => {
                    if (!keyList.current[replicaPort].includes(key)) {
                        keyList.current[replicaPort].push(key);
                        addMessage(newData[key]);
                        onMessage(allMessages.current, key);
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const updateStatus = async () => {
            setLoading(true); 
            try {
                for (let i = 0; i < 4; i++) {
                    await fetchData(i);
                }
            } finally {
                setLoading(false);
            }
        };

        updateStatus();
        const interval = setInterval(updateStatus, 20000);
        return () => clearInterval(interval);
    }, []);

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