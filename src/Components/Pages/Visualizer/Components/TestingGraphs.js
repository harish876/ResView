import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Width and height
const w = 500;
const h = 300;

// Data
const nodes = [
  { id: "Client", x: 150, y: 100 },
  { id: "Primary", x: 150, y: 150 },
  { id: "Backup 1", x: 150, y: 200 },
  { id: "Backup 2", x: 150, y: 250 },
  { id: "Backup 3", x: 150, y: 300 },
];

const links = [
  { source: "Client", target: "Primary" },
  { source: "Primary", target: "Backup 1" },
  { source: "Primary", target: "Backup 2" },
  { source: "Primary", target: "Backup 3" },
];


const TestingGraph = () => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("viewBox", [0, 0, w, h]);

    // Create links
    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Create nodes
    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 20)
      .attr("fill", "steelblue");

    // Position nodes
    node
      .attr("cx", (d) => (d.id === "Client" ? 150 : 350))
      .attr("cy", (d) => 100 + 50 * nodes.indexOf(d));

    // Update link positions
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

  }, []);

  return (
    <></>
  );
};

export default TestingGraph;
