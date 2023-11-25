import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const transactionCount = useRef(0);
  //Choose which transaction we want to look at, if txn 1 is chosen display txn 1 data
  const [currentTransaction, setCurrentTransaction] = useState(0);
  //Info for PBFT diagram, sent to PBFT data=
  const [diagramInfo, setDiagramInfo] = useState({});
  const [prepareInfo, setPrepareInfo] = useState({});
  const [commitInfo, setCommitInfo] = useState({});
  //Stores all messages from ResDB
  const allMessages = useRef({});
  console.log("Check", allMessages.current);
  //For Websocket functionality, boot up start_service.sh on backend first, then
  //load websocket. If console says "Websocket Open" for all 4, functionality works
  let updatedMessageList;


  class Lock{
    constructor(){
      this.lock=false;
      this.queue=[];
    }
    async getLock(){
      if(!this.lock){
        this.lock=true;
        return true;
      }
      else{
        return new Promise((resolve)=> {
          this.queue.push(resolve);
        });
      }
    }

    release(){
      if(this.queue.length>0){
        const resolve = this.queue.shift();
        resolve(true);
      }
      else{
        this.lock=false;
      }
    }
  }

  useEffect(() => {
    let ws1 = new WebSocket('ws://localhost:21001');
    let ws2 = new WebSocket('ws://localhost:21002');
    let ws3 = new WebSocket('ws://localhost:21003');
    let ws4 = new WebSocket('ws://localhost:21004');
    const messageLock= new Lock();

    ws1.onopen = () => {
      console.log('WebSocket1 Open');
    }
    ws2.onopen = () => {
      console.log('WebSocket2 Open');
    }
    ws3.onopen = () => {
      console.log('WebSocket3 Open');
    }
    ws4.onopen = () => {
      console.log('WebSocket4 Open');
    }
    ws1.onmessage = async (event) => {
      //console.log('Received 1 Data: ', event.data);
      await messageLock.getLock();
      //console.log("Got Lock 1");
      //console.log("Message List:", allMessages.current);
      addMessage(event.data);
      //console.log("Message Lis 2: ", allMessages.current);
      messageLock.release();
    }
    ws2.onmessage = async (event) => {
      //console.log('Received 2 Data: ', event.data);
      await messageLock.getLock();
      //console.log("Got Lock 2");
      //console.log("Message List:", allMessages.current);
      addMessage(event.data);
      //console.log("Message Lis 2: ", allMessages.current);
      messageLock.release();
    }
    ws3.onmessage = async (event) => {
      //console.log('Received 3 Data: ', event.data);
      await messageLock.getLock();
      //console.log("Got Lock 3");
      //console.log("Message List:", allMessages.current);
      addMessage(event.data);
      //console.log("Message Lis 2: ", allMessages.current);
      messageLock.release();
    }
    ws4.onmessage = async (event) => {
      //console.log('Received 4 Data: ', event.data);
      await messageLock.getLock();
      //console.log("Got Lock 4");
      //console.log("Message List:", allMessages.current);
      addMessage(event.data);
      //console.log("Message Lis 2: ", allMessages.current);
      messageLock.release();
    }
  
    ws1.onclose= (event) =>{
      console.log('WebSocket1 Close', event.reason);
      ws1 = new WebSocket('ws://localhost:21001');
    }
    ws2.onclose= (event) =>{
      console.log('WebSocket2 Close', event.reason);
      ws3 = new WebSocket('ws://localhost:21003');
    }
    ws3.onclose= (event) =>{
      console.log('WebSocket3 Close', event.reason);
      ws3 = new WebSocket('ws://localhost:21001');
    }
    ws4.onclose= (event) =>{
      console.log('WebSocket4 Close', event.reason);
      ws4 = new WebSocket('ws://localhost:21004');
    }
  }, []);

  const addMessage = (receivedMessage) => {
    let newMessage=JSON.parse(receivedMessage);
    const reply= new Date().getTime();
    newMessage = {
      ...newMessage,
      reply_time: reply,
    }
    const txn_number = String(newMessage.txn_number);
    const replica_number = String(newMessage.replica_id);
    updatedMessageList = allMessages.current;
    if(txn_number in updatedMessageList){
      let txn_messages = updatedMessageList[txn_number];
      txn_messages = {
        ...txn_messages,
        [replica_number]: newMessage,
      };
      updatedMessageList[txn_number]= txn_messages;
      console.log("Received Message: ", updatedMessageList)
      allMessages.current=updatedMessageList;
    }
    else{
      let txn_messages = {
        [replica_number]: newMessage,
      }
      updatedMessageList[txn_number]= txn_messages;
      console.log("Received Message: ", updatedMessageList)
      allMessages.current=updatedMessageList;
      transactionCount.current = transactionCount.current+1;
    }
    console.log(allMessages.current);
  }

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("wss://demos.kaazing.com/echo"),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};
