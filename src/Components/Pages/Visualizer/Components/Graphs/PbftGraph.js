import React, { useRef, useEffect, useContext, useState } from "react";
import * as d3 from "d3";
import { line } from "d3-shape";
import { GraphResizerContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";

const colors = [
  "#2196F3", 
  "#9C27B0",  
  "#FFC107",
  "#00BCD4",
  "#4CAF50",
  "#795548"
];

const points = {
  request: {
    color: `${colors[0]}`,
    start: [
      {
        flag: true,
        points: { x: 0, y: 0 },
      },
    ],
    end: [
      {
        flag: true,
        points: { x: 200, y: 220 },
      },
    ],
  },
  prePrepare: {
    color: `${colors[1]}`,
    start: [
      {
        flag: true,
        points: { x: 200, y: 220 },
      },
    ],
    end: [
      {
        flag: true,
        points: { x: 400, y: 440 },
      },
      {
        flag: true,
        points: { x: 400, y: 660 },
      },
      {
        flag: true,
        points: { x: 400, y: 880 },
      },
    ],
  },
  prepare: {
    color: `${colors[2]}`,
    start: [
      { x: 400, y: 440 },
      { x: 400, y: 660 },
      { x: 400, y: 880 },
    ],
    end: [
      [
        {
          flag: true,
          points: { x: 600, y: 220 },
        },
        {
          flag: true,
          points: { x: 600, y: 660 },
        },
        {
          flag: true,
          points: { x: 600, y: 880 },
        },
      ],
      [
        {
          flag: true,
          points: { x: 600, y: 220 },
        },
        {
          flag: true,
          points: { x: 600, y: 440 },
        },
        {
          flag: true,
          points: { x: 600, y: 880 },
        },
      ],
      [
        {
          flag: true,
          points: { x: 600, y: 220 },
        },
        {
          flag: true,
          points: { x: 600, y: 440 },
        },
        {
          flag: true,
          points: { x: 600, y: 660 },
        },
      ],
    ],
  },
  commit: {
    color: `${colors[3]}`,
    start: [
      { x: 600, y: 220 },
      { x: 600, y: 440 },
      { x: 600, y: 660 },
      { x: 600, y: 880 },
    ],
    end: [
      [
        {
          flag: true,
          points: { x: 800, y: 440 },
        },
        {
          flag: true,
          points: { x: 800, y: 660 },
        },
        {
          flag: true,
          points: { x: 800, y: 880 },
        },
      ],
      [
        {
          flag: true,
          points: { x: 800, y: 220 },
        },
        {
          flag: true,
          points: { x: 800, y: 660 },
        },
        {
          flag: true,
          points: { x: 800, y: 880 },
        },
      ],
      [
        {
          flag: true,
          points: { x: 800, y: 440 },
        },
        {
          flag: true,
          points: { x: 800, y: 220 },
        },
        {
          flag: true,
          points: { x: 800, y: 880 },
        },
      ],
      [
        {
          flag: true,
          points: { x: 800, y: 440 },
        },
        {
          flag: true,
          points: { x: 800, y: 660 },
        },
        {
          flag: true,
          points: { x: 800, y: 220 },
        },
      ],
    ],
  },
  reply: {
    color: `${colors[4]}`,
    start: [
      {
        flag: true,
        points: { x: 800, y: 220 },
      },
      {
        flag: true,
        points: { x: 800, y: 440 },
      },
      {
        flag: true,
        points: { x: 800, y: 660 },
      },
      {
        flag: true,
        points: { x: 800, y: 880 },
      },
    ],
    end: [
      {
        flag: true,
        points: { x: 1000, y: 0 },
      },
    ],
  },
};

const verticalLineOne = [
  { x: 0, y: 0 },
  { x: 0, y: 220 },
  { x: 0, y: 440 },
  { x: 0, y: 660 },
  { x: 0, y: 880 },
];

const verticalLineTwo = [
  { x: 200, y: 0 },
  { x: 200, y: 220 },
  { x: 200, y: 440 },
  { x: 200, y: 660 },
  { x: 200, y: 880 },
];

const verticalLineThree = [
  { x: 400, y: 0 },
  { x: 400, y: 220 },
  { x: 400, y: 440 },
  { x: 400, y: 660 },
  { x: 400, y: 880 },
];

const verticalLineFour = [
  { x: 600, y: 0 },
  { x: 600, y: 220 },
  { x: 600, y: 440 },
  { x: 600, y: 660 },
  { x: 600, y: 880 },
];

const verticalLineFive = [
  { x: 800, y: 0 },
  { x: 800, y: 220 },
  { x: 800, y: 440 },
  { x: 800, y: 660 },
  { x: 800, y: 880 },
];

const verticalLineSix = [
  { x: 1000, y: 0 },
  { x: 1000, y: 220 },
  { x: 1000, y: 440 },
  { x: 1000, y: 660 },
  { x: 1000, y: 880 },
];


const horizontalLineOne = [
  { x: 0, y: 0 },
  { x: 200, y: 0 },
  { x: 400, y: 0 },
  { x: 600, y: 0 },
  { x: 800, y: 0 },
  { x: 1000, y: 0 },
];

const horizontalLineTwo = [
  { x: 0, y: 220 },
  { x: 200, y: 220 },
  { x: 400, y: 220 },
  { x: 600, y: 220 },
  { x: 800, y: 220 },
  { x: 1000, y: 220 },
];

const horizontalLineThree = [
  { x: 0, y: 440 },
  { x: 200, y: 440 },
  { x: 400, y: 440 },
  { x: 600, y: 440 },
  { x: 800, y: 440 },
  { x: 1000, y: 440 },
];

const horizontalLineFour = [
  { x: 0, y: 660 },
  { x: 200, y: 660 },
  { x: 400, y: 660 },
  { x: 600, y: 660 },
  { x: 800, y: 660 },
  { x: 1000, y: 660 },
];

const horizontalLineFive = [
  { x: 0, y: 880 },
  { x: 200, y: 880 },
  { x: 400, y: 880 },
  { x: 600, y: 880 },
  { x: 800, y: 880 },
  { x: 1000, y: 880 },
];

const generatePoints = (
  width,
  height,
  margin = 0,
  padding = 0,
  numberOfReplicas = 4,
  numberOfSteps = 6
) => {
  const xStart = Math.floor(margin / 2) + Math.floor(padding / 2);
  const yStart = Math.floor(margin / 2) + Math.floor(padding / 2);

  const numberOfTotalSteps = numberOfSteps + 1;

  const cummulativeH = height - (padding + margin);
  const cummulativeW = width - (padding + margin);

  const distX = Math.floor(cummulativeH / numberOfReplicas);
  const distY = Math.floor(cummulativeW / numberOfSteps);

  let data = new Array((numberOfReplicas + 1) * numberOfTotalSteps).fill({
    x: 0,
    y: 0,
  });

  let changeX = xStart,
    changeY = yStart;
  let newData = [];

  for (let i = 0; i < data.length; i++) {
    if (i !== 0) {
      if (i < numberOfSteps && i % numberOfSteps === 0) {
        changeY += distY;
        changeX = xStart;
      } else if (i % (numberOfSteps + 1) === 0) {
        changeY += distY;
        changeX = xStart;
      }
    }
    data[i].x = changeX;
    data[i].y = changeY;
    changeX += distX;
    newData.push({ x: data[i].x, y: data[i].y });
  }
  return newData;
};

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
    const data = generatePoints(
      1100,
      800,
      0,
      0,
      4,
      5
    );
    console.log('DATA', data);
    const svg = d3
      .select(ref.current)
      .attr("width", 1200)
      .attr("height", 800)
    //   .classed("border-1p", true)
    //   .classed("border-solid", true)
    //   .classed("border-gray-100", true)
      .classed("flex", true)
      .classed("justify-center", true)
      .classed("items-center", true);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
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

    // First dotted vertical line DVL3
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

    // First dotted vertical line DVL5
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

    // REQUEST LINES 
    points.request.end.forEach((end, i) => {
        end.flag &&
          svg
            .append("path")
            .attr("d", lineGen([points.request.start[0].points, end.points]))
            .attr("stroke", `${points.request.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow)")
            .style("opacity", 0)
            .transition()
            .duration(TRANSDURATION)
            .delay(i * 100)
            .style("opacity", 1);
    });

    // PRE-PREPARE LINES 
    points.prePrepare.end.forEach((end, i) => {
        end.flag &&
          svg
            .append("path")
            .attr("d", lineGen([points.prePrepare.start[0].points, end.points]))
            .attr("stroke", `${points.prePrepare.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow)")
            .style("opacity", 0)
            .transition()
            .duration(TRANSDURATION + 200)
            .delay(i * 100)
            .style("opacity", 1);
    });

    // PREPARE LINES 
    points.prepare.start.map((pts, index) => {
        return points.prepare.end[index].map((end, i) => {
            end.flag &&
              svg
                .append("path")
                .attr("d", lineGen([points.prepare.start[index], end.points]))
                .attr("stroke", `${points.prepare.color}`)
                .attr("fill", "none")
                .attr("stroke-width", 1)
                .attr("marker-end", "url(#arrow)")
                .style("opacity", 0)
                .transition()
                .duration(TRANSDURATION + 200)
                .delay(i * 100)
                .style("opacity", 1);
        })
    })

    // COMMIT LINES
    points.commit.start.map((pts, index) => {
      return points.commit.end[index].map((end, i) => {
        end.flag &&
          svg
            .append("path")
            .attr("d", lineGen([points.commit.start[index], end.points]))
            .attr("stroke", `${points.commit.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow)")
            .style("opacity", 0)
            .transition()
            .duration(TRANSDURATION + 200)
            .delay(i * 100)
            .style("opacity", 1);
      });
    });

    // REPLY LINES 
    points.reply.start.forEach((start, i) => {
        start.flag &&
          svg
            .append("path")
            .attr("d", lineGen([start.points, points.reply.end[0].points]))
            .attr("stroke", `${points.reply.color}`)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrow)")
            .style("opacity", 0)
            .transition()
            .duration(TRANSDURATION + 400)
            .delay(i * 100)
            .style("opacity", 1);
    });
  }, [theme, boxValues]);

  return <svg ref={ref}></svg>;
};

export default PbftGraph;
