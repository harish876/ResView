import React, { useContext, useEffect, useMemo, useState } from "react";
import ButtonRow from "./Components/Buttons";
import Dropdown from './Components/Dropdown'
import Wrapper from "../../Shared/Wrapper";
import PbftGraph from "./Components/PbftGraph";
import { GraphViewContext } from "../../../Context";
import TestingGraph from "./Components/TestingGraphs";

// TODO: Remove the below Unknown dummy component once the other graphs are built and remove it from GRAPH_CHANGE object
const Dummy = () => {
  return (
    <div className="text-18p my-4 mx-4 text-red-50">
      Dummy
    </div>
  );
};

// TODO: Change the below object ? to the graph that needs to be inputted
const graphToTitle = {
  'PBFT': 'Practical Byzantine Fault Tolerance',
  'C&C': 'Compare and Commit',
  '?': '?'
};

const Visualizer = () => {

  const { graph } = useContext(GraphViewContext);

  const GRAPH_CHANGE = useMemo(
    () => ({
      // PBFT: <PbftGraph />,
      PBFT: <TestingGraph />,
      "C&C": <Dummy />,
      "?": <Dummy />,
    }),
    []
  );
  
  return (
    <Wrapper>
        <div className="mt-[2em] mb-4 mx-8" data-aos='fade-in'>
            <ButtonRow />
        </div>
        <div className="my-18p mx-5p text-22p text-blue-190" data-aos='fade-in'>
          {graphToTitle[graph]}
        </div>
        {graph === 'PBFT' && <div className="my-4 mx-8" data-aos='fade-in'>
            <Dropdown length={4} />
        </div>}
        {/* // ! DO NOT TOUCH THE BELOW COMPONENT !!!!!! */}
        <div className='w-95per h-450p py-3 px-2 shadow-md flex justify-center items-center rounded-md bg-white my-3 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300' data-aos='fade-in'>
          {GRAPH_CHANGE[graph]}
        </div>
    </Wrapper>
  )
}

export default Visualizer