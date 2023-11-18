import React, { useContext, useEffect, useMemo, useState } from "react";
import ButtonRow from "../../Shared/Buttons";
import Dropdown from './Components/Dropdown'
import Wrapper from "../../Shared/Wrapper";
import PbftGraph from "./Components/PbftGraph";
import { GraphViewContext } from "../../../Context";

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

  const GRAPH_CHANGE = useMemo(() => ({
    'PBFT': <PbftGraph />,
    'C&C': <Dummy />,
    '?': <Dummy />
  }), []);
  
  return (
    <Wrapper>
        <div className="mt-[4em] mb-4 mx-8">
            <ButtonRow />
        </div>
        <div className="my-18p mx-5p text-22p text-blue-190">
          {graphToTitle[graph]}
        </div>
        {graph === 'PBFT' && <div className="my-4 mx-8">
            <Dropdown length={4} />
        </div>}
        {/* TODO: Check the data-aos declaration below */}
        <div className='w-95per h-450p rounded-md py-3 px-2 border-1p border-solid border-gray-50 shadow-md flex justify-center items-center rounded-md bg-white my-3' data-aos='zoom-in'>
          {GRAPH_CHANGE[graph]}
        </div>
    </Wrapper>
  )
}

export default Visualizer