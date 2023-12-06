import React, { useRef, useEffect, useContext, useState, useCallback } from "react";
import * as d3 from "d3";
import { line } from "d3-shape";
import { GraphResizerContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";
import { height } from "@mui/system";
import Loader from "../../../../Shared/Loader";

const colors = [
  "#2196F3", 
  "#9C27B0",  
  "#FFC107",
  "#00BCD4",
  "#4CAF50",
  "#795548"
];

const ACTION_TYPE = ["request", "prePrepare", "prepare", "commit", "reply"];

const TITLES = ["REQUEST", "PRE-PREPARE", "PREPARE", "COMMIT", "REPLY"];

const NODES = ["CLIENT", "REPLICA 1", "REPLICA 2", "REPLICA 3", "REPLICA 4"];

const TRANSDURATION = 750;

const NUMBER_OF_STEPS = 5;

const generateConnections = (data, numberOfSteps, xCoords, yCoords) => {
    let points = {};

    ACTION_TYPE.forEach((action, index) => (
        points = {
          ...points,
          [action]: {
            color: `${colors[index]}`,
            start: [],
            end: [],
          },
        }
    ));

    // REQUEST OBJECT
    points.request.start.push({
        flag: true,
        points: data[0]
    })
    points.request.end.push({
      flag: true,
      points: data[numberOfSteps+2],
    });


    // PRE-PREPARE OBJECT
    points.prePrepare.start.push({
        flag: true,
        points: points.request.end[0].points
    })

    for(let i=2; i<yCoords.length; i++){
        points.prePrepare.end.push({
            flag: true,
            points: {
                x: xCoords[2],
                y: yCoords[i]
            }
        })
    }

    // PREPARE OBJECT
    points.prePrepare.end.map((element, index) => (
        points.prepare.start.push(element.points)
    ))

    for(const element of points.prepare.start) points.prepare.end.push([]);

    for(let i=0; i<numberOfSteps-2; i++){
        for(let j=1; j<yCoords.length; j++){
          if (points.prepare.start[i].y !== yCoords[j]) {
              points.prepare.end[i].push({
                flag: true,
                points: {
                  x: xCoords[3],
                  y: yCoords[j],
                },
              });
          }
        }
    }

    // COMMIT OBJECT
    for(let i=1; i<yCoords.length; i++){
        points.commit.start.push({
            x: xCoords[3],
            y: yCoords[i]
        })
    }

    for (const element of points.commit.start) points.commit.end.push([]);

    for (let i = 0; i < numberOfSteps - 1; i++) {
      for (let j = 1; j < yCoords.length; j++) {
        if (points.commit.start[i].y !== yCoords[j]) {
          points.commit.end[i].push({
            flag: true,
            points: {
              x: xCoords[4],
              y: yCoords[j],
            },
          });
        }
      }
    }

    // REPLY OBJECT
    points.reply.end.push({
      flag: true,
      points: data[numberOfSteps],
    });

    for (let i = 1; i < yCoords.length; i++) {
      points.reply.start.push({
        flag: true,
        points: {
          x: xCoords[4],
          y: yCoords[i],
        },
      });
    }

    return { points };
};

const generateLabels = (xCoords, yCoords) => {
  let labelsX = [], labelsY = [];

  if(xCoords.length < 2 || yCoords.length < 2) return labelsX;

  for(let i=0; i<xCoords.length-1; i++){
    let obj = {
      x: Math.floor((xCoords[i] + xCoords[i + 1]) / 2),
      y: yCoords[0] - 20,
      title: `${TITLES[i]}`,
    };
    labelsX.push(obj)
  }

  for(let i=0; i<yCoords.length; i++){
    let obj = {
      x: xCoords[0]-50,
      y: yCoords[i]+5,
      title: `${NODES[i]}`,
    };
    labelsY.push(obj);
  }

  return { labelsX, labelsY };
};

const generateLines = (data, numberOfSteps) => {
    let verticalLines = [],
      horizontalLines = [];

    let xCoords = [];
    let yCoords = [];

    for (let i = 0; i <= numberOfSteps; i++) {
      xCoords.push(data[i].x);
    }

    for (let i = 0; i < data.length; i += (numberOfSteps+1)) {
      yCoords.push(data[i].y);
    }

    for(const eleX of xCoords){
        let arr = [];
        for(const eleY of yCoords){
           arr.push({
             x: eleX,
             y: eleY,
           });
        }
        verticalLines.push(arr);
    }

    for (const eleY of yCoords) {
      let arr = [];
      for (const eleX of xCoords) {
        arr.push({
          x: eleX,
          y: eleY,
        });
      }
      horizontalLines.push(arr);
    }

    return { verticalLines, horizontalLines, xCoords, yCoords };
};

const generatePoints = (
  width,
  height,
  margin = 0,
  padding = 0,
  numberOfReplicas = 4,
  numberOfSteps = 5
) => {
  const xStart = Math.floor(margin / 2) + Math.floor(padding / 2);
  const yStart = Math.floor(margin / 2) + Math.floor(padding / 2);

  const numberOfTotalSteps = numberOfSteps + 1;

  const cummulativeH = height - (padding + margin);
  const cummulativeW = width - (padding + margin);

  const distX = Math.floor(cummulativeW / numberOfSteps);
  const distY = Math.floor(cummulativeH / numberOfReplicas);

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

const PbftGraph = () => {
  const { boxValues, resizing } = useContext(GraphResizerContext);
  const { width, height } = boxValues;
  const { theme } = useContext(ThemeContext);

const ref = useRef(null);

const debouncedRender = useCallback(() => {
  const data = generatePoints(
    width,
    height,
    0,
    Math.floor(height/4),
    4,
    NUMBER_OF_STEPS
  );

  const { xCoords, yCoords, verticalLines, horizontalLines } = generateLines(
    data,
    NUMBER_OF_STEPS
  );

  const { points } = generateConnections(
    data,
    NUMBER_OF_STEPS,
    xCoords,
    yCoords
  );

  const { labelsX, labelsY } = generateLabels(xCoords, yCoords);

  const svg = d3
    .select(ref.current)
    .attr("width", width)
    .attr("height", height)
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

  // ARROW HEAD
  ACTION_TYPE.forEach((action, index) =>
    svg
      .append("defs")
      .append("marker")
      .attr("id", `arrow-${action}`)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("fill", `${colors[index]}`)
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
  );

  // VERTICAL DOTTED LINES
  verticalLines.forEach((line, index) =>
    svg
      .append("path")
      .attr("d", lineGen(line))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10")
  );

  // HORIZONTAL DOTTED LINES
  horizontalLines.forEach((line, index) =>
    svg
      .append("path")
      .attr("d", lineGen(line))
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("stroke-dasharray", "5,10")
  );

  // LABELS FOR EACH ACTION
  labelsX.forEach((label) =>
    svg
      .append("text")
      .attr("transform", "translate(" + label.x + " ," + label.y + ")")
      .attr("fill", "#c4c4c4")
      .style("text-anchor", "middle")
      .text(`${label.title}`)
  );

  // LABELS FOR EACH NODE
  labelsY.forEach((label) =>
    svg
      .append("text")
      .attr("transform", "translate(" + label.x + " ," + label.y + ")")
      .attr("fill", "#c4c4c4")
      .style("text-anchor", "middle")
      .text(`${label.title}`)
  );

  // REQUEST LINES
  points.request.end.forEach((end, i) => {
    end.flag &&
      svg
        .append("path")
        .attr("d", lineGen([points.request.start[0].points, end.points]))
        .attr("stroke", `${points.request.color}`)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow-request)")
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
        .attr("marker-end", "url(#arrow-prePrepare)")
        .style("opacity", 0)
        .transition()
        .duration(TRANSDURATION + 200)
        .delay(i * 200)
        .style("opacity", 1);
  });

  // PREPARE LINES
  points.prepare.start.map((start, index) =>
    points.prepare.end[index].map((end, i) => {
      return (
        end.flag &&
        svg
          .append("path")
          .attr("d", lineGen([start, end.points]))
          .attr("stroke", `${points.prepare.color}`)
          .attr("fill", "none")
          .attr("stroke-width", 1)
          .attr("marker-end", "url(#arrow-prepare)")
          .style("opacity", 0)
          .transition()
          .duration(TRANSDURATION + 200)
          .delay(i * 300)
          .style("opacity", 1)
      );
    })
  );

  // COMMIT LINES
  points.commit.start.map((start, index) =>
    points.commit.end[index].map((end, i) => {
      return (
        end.flag &&
        svg
          .append("path")
          .attr("d", lineGen([start, end.points]))
          .attr("stroke", `${points.commit.color}`)
          .attr("fill", "none")
          .attr("stroke-width", 1)
          .attr("marker-end", "url(#arrow-commit)")
          .style("opacity", 0)
          .transition()
          .duration(TRANSDURATION + 200)
          .delay(i * 400)
          .style("opacity", 1)
      );
    })
  );

  // REPLY LINES
  points.reply.start.forEach((start, i) => {
    return (
      start.flag &&
      svg
        .append("path")
        .attr("d", lineGen([start.points, points.reply.end[0].points]))
        .attr("stroke", `${points.reply.color}`)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow-reply)")
        .style("opacity", 0)
        .transition()
        .duration(TRANSDURATION + 400)
        .delay(i * 500)
        .style("opacity", 1)
    );
  });
}, [theme, width, height]);

  useEffect(() => {
    debouncedRender();
  }, [debouncedRender]);

  return (
    <div className='relative w-full h-full p-4'>
      {resizing ? (
        <div class='loader'>
          <div>PBFT</div>
          <div class='inner' />
        </div>
      ) : (
        <svg ref={ref} className='absolute'></svg>
      )}
    </div>
  );
};

export default PbftGraph;


// ? POINTS DATA FOR REFERENCE FOR PLOTTING IS BELOW 
// const points = {
//   request: {
//     color: `${colors[0]}`,
//     start: [
//       {
//         flag: true,
//         points: { x: 0, y: 0 },
//       },
//     ],
//     end: [
//       {
//         flag: true,
//         points: { x: 200, y: 220 },
//       },
//     ],
//   },
//   prePrepare: {
//     color: `${colors[1]}`,
//     start: [
//       {
//         flag: true,
//         points: { x: 200, y: 220 },
//       },
//     ],
//     end: [
//       {
//         flag: true,
//         points: { x: 400, y: 440 },
//       },
//       {
//         flag: true,
//         points: { x: 400, y: 660 },
//       },
//       {
//         flag: true,
//         points: { x: 400, y: 880 },
//       },
//     ],
//   },
//   prepare: {
//     color: `${colors[2]}`,
//     start: [
//       { x: 400, y: 440 },
//       { x: 400, y: 660 },
//       { x: 400, y: 880 },
//     ],
//     end: [
//       [
//         {
//           flag: true,
//           points: { x: 600, y: 220 },
//         },
//         {
//           flag: true,
//           points: { x: 600, y: 660 },
//         },
//         {
//           flag: true,
//           points: { x: 600, y: 880 },
//         },
//       ],
//       [
//         {
//           flag: true,
//           points: { x: 600, y: 220 },
//         },
//         {
//           flag: true,
//           points: { x: 600, y: 440 },
//         },
//         {
//           flag: true,
//           points: { x: 600, y: 880 },
//         },
//       ],
//       [
//         {
//           flag: true,
//           points: { x: 600, y: 220 },
//         },
//         {
//           flag: true,
//           points: { x: 600, y: 440 },
//         },
//         {
//           flag: true,
//           points: { x: 600, y: 660 },
//         },
//       ],
//     ],
//   },
//   commit: {
//     color: `${colors[3]}`,
//     start: [
//       { x: 600, y: 220 },
//       { x: 600, y: 440 },
//       { x: 600, y: 660 },
//       { x: 600, y: 880 },
//     ],
//     end: [
//       [
//         {
//           flag: true,
//           points: { x: 800, y: 440 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 660 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 880 },
//         },
//       ],
//       [
//         {
//           flag: true,
//           points: { x: 800, y: 220 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 660 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 880 },
//         },
//       ],
//       [
//         {
//           flag: true,
//           points: { x: 800, y: 440 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 220 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 880 },
//         },
//       ],
//       [
//         {
//           flag: true,
//           points: { x: 800, y: 440 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 660 },
//         },
//         {
//           flag: true,
//           points: { x: 800, y: 220 },
//         },
//       ],
//     ],
//   },
//   reply: {
//     color: `${colors[4]}`,
//     start: [
//       {
//         flag: true,
//         points: { x: 800, y: 220 },
//       },
//       {
//         flag: true,
//         points: { x: 800, y: 440 },
//       },
//       {
//         flag: true,
//         points: { x: 800, y: 660 },
//       },
//       {
//         flag: true,
//         points: { x: 800, y: 880 },
//       },
//     ],
//     end: [
//       {
//         flag: true,
//         points: { x: 1000, y: 0 },
//       },
//     ],
//   },
// };
