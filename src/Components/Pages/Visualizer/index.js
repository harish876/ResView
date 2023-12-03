import { Resizable } from "re-resizable";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { GraphResizerContext, GraphViewContext } from "../../../Context/graph";
import { anglesRightIcon } from "../../../Resources/Icons";
import { Icon } from "../../Shared/Icon";
import Wrapper from "../../Shared/Wrapper";
import ButtonRow from "./Components/Ancillary/Buttons";
import Dropdown from "./Components/Ancillary/Dropdown";
import TypeSelector from "./Components/Ancillary/TypeSelector";
import CandC from "./Components/Graphs/CandC";
import TestingGraph from "./Components/Graphs/TestingGraphs";
import axios from 'axios';
import { WebSocketDemo } from '../../../Socket'


// TODO: Remove the below Unknown dummy component once the other graphs are built and remove it from GRAPH_CHANGE object
const Dummy = () => {
  return <div className='text-18p my-4 mx-4 text-red-50'>Dummy</div>;
};

const mvtTitles = {
  1: "Commit Messages vs Time Graph",
  2: "Prepare Messages vs Time Graph",
};


const Visualizer = () => {
  const { graph, mvtGraphNo } = useContext(GraphViewContext);
  const { boxValues, setBoxValues } = useContext(GraphResizerContext);

  const [messageHistory, setMessageHistory]= useState({});
  const [currentTransaction, setCurrentTransaction] = useState(0);
  const [prepareData, setPrepareData] = useState([]);
  const [commit, setCommitData] = useState([]);

  const onMessage = (newData)=>{
    setMessageHistory(newData);
    setCurrentTransaction(Object.keys(messageHistory).length);

    console.log(messageHistory, 'MESSAGE HISTORY')
  };

  useEffect(() => {
    if(!(currentTransaction in messageHistory)){
      setPrepareData([]);
      setCommitData([]);
      console.log(currentTransaction, " Not in messageHistory")
    }
    else{
      const transactionData = messageHistory[currentTransaction];
      console.log(transactionData)
      let startTime=0;
      let pre_prepare_times=[];
      let all_prepare_times=[];
      Object.keys(transactionData).map((key) => {
        if(transactionData[key].primary_id!==transactionData[key].replica_id){
          pre_prepare_times.push(Math.floor(transactionData[key].propose_pre_prepare_time/10000)%100000);
        }
        let replica_timestamps=[];
        transactionData[key]["prepare_message_timestamps"].map((time) => {
          replica_timestamps.push(Math.floor(time/10000)%100000);
        });
        all_prepare_times.push(replica_timestamps);
      });
      console.log("Pre_prepare time: ", pre_prepare_times);
      console.log("All timestamps: ", all_prepare_times);
      startTime = Math.min(...pre_prepare_times);
      console.log(startTime);
      for(let i=0; i<all_prepare_times.length; i++){
        for(let j=0; j<all_prepare_times.length; j++){
          all_prepare_times[i][j]=all_prepare_times[i][j]-startTime;
        }
      }
      console.log("Updated timestamps: ", all_prepare_times);
    }
  }, [messageHistory, currentTransaction]);

  const sendGet = async () => {
    let key = 'key1';
    let url = 'http://127.0.0.1:18000/v1/transactions/' + key;
    try{
      const response= await axios.get(url);
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  const sendPost = async () => {
    let key = 'key1';
    let value = 'value1';
    let data = {"id": key, "value": value};
    let url = 'http://127.0.0.1:18000/v1/transactions/commit';
    try{
      const response = await axios.post(
        url,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  // TODO: Fill the below ? with appropriate title and its full form
  const graphToTitle = useMemo(
    () => ({
      PBFT: "Practical Byzantine Fault Tolerance Graph",
      MvT: mvtTitles[mvtGraphNo],
      "?": "",
    }),
    [mvtGraphNo]
  );

  const GRAPH_CHANGE = useMemo(
    () => ({
      // PBFT: <PbftGraph />,
      PBFT: <TestingGraph />,
      MvT: <CandC />,
      "?": <Dummy />,
    }),
    []
  );

  return (
    <Wrapper>
      <div>
        <WebSocketDemo onMessage={onMessage} />
      </div>
      <div>
        <button className="bg-white" onClick={sendPost}>Test Set Transaction</button>
        {'\n'}
        <button className="bg-white" onClick={sendGet}>Test Get Transaction</button>
      </div>
      <div className='mt-[2em] mb-4 mx-8'>
        <ButtonRow />
      </div>
      {graph === "MvT" && (
        <div className="my-4" data-aos='fade-in' data-aos-delay={100}>
          <TypeSelector />
        </div>
      )}
      <div
        className='my-18p mx-5p text-22p text-blue-190'
        data-aos='fade-in'
        data-aos-delay={200}
      >
        {graphToTitle[graph]}
      </div>
      {graph === "PBFT" && (
        <div className='my-4 mx-8' data-aos='fade-in' data-aos-delay={200}>
          <Dropdown length={4} />
        </div>
      )}
      {/* // ! DO NOT TOUCH THE BELOW COMPONENT !!!!!! */}
      <Resizable
        className='py-3 px-2 shadow-md flex justify-center items-center rounded-md bg-white my-[2em] dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300 relative'
        data-aos='fade-in'
        data-aos-delay={300}
        size={{ width: boxValues.width, height: boxValues.height }}
        onResizeStop={(e, direction, ref, d) => {
          setBoxValues({
            width: boxValues.width + d.width,
            height: boxValues.height + d.height,
          });
        }}
      >
        {GRAPH_CHANGE[graph]}
        <div className='absolute bottom-0 right-0 rotate-45'>
          <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
        </div>
      </Resizable>
    </Wrapper>
  );
};

export default Visualizer;
