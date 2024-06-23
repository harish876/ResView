import React, { useContext, useEffect, useRef } from "react";
import { VizDataHistoryContext } from "../Context/visualizer";
import { dummyData } from "../Components/Pages/Visualizer/Ancilliary/Data/data";

export const WebSocket = () => {

  const { messageHistory, changeMessageHistory, changeCurrentTransaction } = useContext(VizDataHistoryContext);

  const transactionCount = useRef(0);
  const allMessages = useRef({});
  const keyList = useRef([[], [], [], []]);
  let updatedMessageList;

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
    //console.log(receivedMessage);
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
      //console.log("Received Message: ", updatedMessageList)
      allMessages.current = updatedMessageList;
    }
    else {
      let txn_messages = {
        [replica_number]: newMessage,
      }
      updatedMessageList[txn_number] = txn_messages;
      //console.log("Received Message: ", updatedMessageList)
      allMessages.current = updatedMessageList;
      transactionCount.current = transactionCount.current + 1;
    }
    //console.log(allMessages.current);
  }

  useEffect(() => {
    const fetchData = async (replicaPort) => {
      try {
        // Make API call
        //let port = parseInt(process.env.REACT_APP_DEFAULT_LOCAL_PORT) + replicaPort
        //const response = await fetch(process.env.REACT_APP_DEFAULT_LOCAL + String(port) + process.env.REACT_APP_SOCKET_URL_EP);
        let port = parseInt(18501) + replicaPort
        const response = await fetch("http://localhost:" + String(port) + "/consensus_data");
        const newData = await response.json();
        // Update state with new data
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
      //console.log(keyList);
      //console.log(allMessages);
      for (var i = 0; i < 4; i++) {
        fetchData(i);
      }
    }

    updateStatus();
    // Set interval to fetch data every 20 seconds
    const interval = setInterval(updateStatus, 20000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    </div>
  );
};
