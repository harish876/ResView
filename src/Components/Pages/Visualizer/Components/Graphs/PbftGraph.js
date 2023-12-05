import React, { useRef, useEffect, useContext, useState } from "react";
import * as d3 from "d3";
import { line } from "d3-shape";
import { GraphResizerContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";

const startPoint = { x: 50, y: 100 };

const endPoints = [
  { x: 200, y: 200 },
  { x: 200, y: 300 },
  { x: 200, y: 400 },
  { x: 200, y: 500 },
];

const verticalLineOne = [
  { x: 200, y: 0 },
  { x: 200, y: 100 },
  { x: 200, y: 200 },
  { x: 200, y: 300 },
  { x: 200, y: 400 },
  { x: 200, y: 500 },
  { x: 200, y: 600 },
];

const verticalLineTwo = [
  { x: 350, y: 0 },
  { x: 350, y: 100 },
  { x: 350, y: 200 },
  { x: 350, y: 300 },
  { x: 350, y: 400 },
  { x: 350, y: 500 },
  { x: 350, y: 600 },
];

const verticalLineThree = [
  { x: 500, y: 0 },
  { x: 500, y: 100 },
  { x: 500, y: 200 },
  { x: 500, y: 300 },
  { x: 500, y: 400 },
  { x: 500, y: 500 },
  { x: 500, y: 600 },
];

const verticalLineFour = [
  { x: 650, y: 0 },
  { x: 650, y: 100 },
  { x: 650, y: 200 },
  { x: 650, y: 300 },
  { x: 650, y: 400 },
  { x: 650, y: 500 },
  { x: 650, y: 600 },
];

const verticalLineFive = [
  { x: 800, y: 0 },
  { x: 800, y: 100 },
  { x: 800, y: 200 },
  { x: 800, y: 300 },
  { x: 800, y: 400 },
  { x: 800, y: 500 },
  { x: 800, y: 600 },
];

const verticalLineSix = [
  { x: 950, y: 0 },
  { x: 950, y: 100 },
  { x: 950, y: 200 },
  { x: 950, y: 300 },
  { x: 950, y: 400 },
  { x: 950, y: 500 },
  { x: 950, y: 600 },
];

const horizontalLineOne = [
  { x: 0, y: 100 },
  { x: 50, y: 100 },
  { x: 200, y: 100 },
  { x: 350, y: 100 },
  { x: 500, y: 100 },
  { x: 650, y: 100 },
  { x: 800, y: 100 },
  { x: 950, y: 100 },
];

const horizontalLineTwo = [
  { x: 0, y: 200 },
  { x: 50, y: 200 },
  { x: 200, y: 200 },
  { x: 350, y: 200 },
  { x: 500, y: 200 },
  { x: 650, y: 200 },
  { x: 800, y: 200 },
  { x: 950, y: 200 },
];

const horizontalLineThree = [
  { x: 0, y: 300 },
  { x: 50, y: 300 },
  { x: 200, y: 300 },
  { x: 350, y: 300 },
  { x: 500, y: 300 },
  { x: 650, y: 300 },
  { x: 800, y: 300 },
  { x: 950, y: 300 },
];

const horizontalLineFour = [
  { x: 0, y: 400 },
  { x: 50, y: 400 },
  { x: 200, y: 400 },
  { x: 350, y: 400 },
  { x: 500, y: 400 },
  { x: 650, y: 400 },
  { x: 800, y: 400 },
  { x: 950, y: 400 },
];

const horizontalLineFive = [
  { x: 0, y: 500 },
  { x: 50, y: 500 },
  { x: 200, y: 500 },
  { x: 350, y: 500 },
  { x: 500, y: 500 },
  { x: 650, y: 500 },
  { x: 800, y: 500 },
  { x: 950, y: 500 },
];

const dataTest = [
  { x: 5, y: 10 },
  { x: 5, y: 20 },
  { x: 5, y: 30 },
  { x: 5, y: 40 },
  { x: 5, y: 50 },

  { x: 20, y: 10 },
  { x: 20, y: 20 },
  { x: 20, y: 30 },
  { x: 20, y: 40 },
  { x: 20, y: 50 },

  { x: 35, y: 10 },
  { x: 35, y: 20 },
  { x: 35, y: 30 },
  { x: 35, y: 40 },
  { x: 35, y: 50 },

  { x: 50, y: 10 },
  { x: 50, y: 20 },
  { x: 50, y: 30 },
  { x: 50, y: 40 },
  { x: 50, y: 50 },

  { x: 65, y: 10 },
  { x: 65, y: 20 },
  { x: 65, y: 30 },
  { x: 65, y: 40 },
  { x: 65, y: 50 },

  { x: 80, y: 10 },
  { x: 80, y: 20 },
  { x: 80, y: 30 },
  { x: 80, y: 40 },
  { x: 80, y: 50 },

  { x: 95, y: 10 },
  { x: 95, y: 20 },
  { x: 95, y: 30 },
  { x: 95, y: 40 },
  { x: 95, y: 50 },
];

const TITLES = [
  "REQUEST",
  "PROPOSE",
  "PRE-PREPARE",
  "PREPARE",
  "COMMIT",
  "REPLY",
];

const TRANSDURATION = 750;

const PbftGraph = () => {
  const { boxValues, setBoxValues } = useContext(GraphResizerContext);
  const { theme } = useContext(ThemeContext);

  const ref = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", boxValues.width - 40)
      .attr("height", boxValues.height - 40)
      .classed("border-1p", true)
      .classed("border-solid", true)
      .classed("border-gray-100", true);

    const xScale = d3
      .scaleLinear()
      .domain([0, 100]) // data domain
      .range([0, boxValues.width - 40]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([boxValues.height - 40, 0]);

    svg
      .selectAll("circle")
      .data(dataTest)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 2)
      .attr("fill", `${!theme ? "black" : "white"}`);

    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("fill", `${!theme ? "black" : "white"}`)
      .attr("d", "M 0 0 L 10 5 L 0 10 z");

    // First dotted vertical line DVL1
    svg
      .append("path")
      .attr("d", lineGen(verticalLineOne))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL2
    svg
      .append("path")
      .attr("d", lineGen(verticalLineTwo))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL3
    svg
      .append("path")
      .attr("d", lineGen(verticalLineThree))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL4
    svg
      .append("path")
      .attr("d", lineGen(verticalLineFour))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL5
    svg
      .append("path")
      .attr("d", lineGen(verticalLineFive))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted vertical line DVL6
    svg
      .append("path")
      .attr("d", lineGen(verticalLineSix))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL1
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineOne))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL2
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineTwo))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL3
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineThree))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL4
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineFour))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // dotted horizontal line DHL5
    svg
      .append("path")
      .attr("d", lineGen(horizontalLineFive))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10");

    // Title: Request
    svg
      .append("text")
      .attr("transform", "translate(" + 130 + " ," + 50 + ")")
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .text("Request");

    endPoints.forEach((end, i) => {
      svg
        .append("path")
        .attr("d", lineGen([startPoint, end]))
        .attr("stroke", `${!theme ? "black" : "white"}`)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow)")
        .style("opacity", 0)
        .transition()
        .duration(TRANSDURATION)
        .delay(i * 100)
        .style("opacity", 1);
    });
  }, [theme, boxValues]);

  return <svg ref={ref}></svg>;
};

export default PbftGraph;
