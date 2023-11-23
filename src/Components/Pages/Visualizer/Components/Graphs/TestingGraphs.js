import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const DUMMY = [
  {id: 'd1', value: 10, region: 'USA'},
  {id: 'd2', value: 11, region: 'India'},
  {id: 'd3', value: 12, region: 'China'},
  {id: 'd4', value: 6, region: 'Germany'},
]

const TestingGraph = () => {
  
  useEffect(() => {
    const svg = d3
      .select("#id-one")
      .classed("h-200p", true)
      .classed("w-200p", true)
      .classed("border-1p", true)
      .classed("border-solid", true)
      .classed("border-gray-100", true)
      .selectAll("p")
      .data(DUMMY)
      .enter()
      .append("p")
      .text((data) => data.region);
  }, [])

  return (
    <div id="id-one">

    </div>
  );
};

export default TestingGraph;
