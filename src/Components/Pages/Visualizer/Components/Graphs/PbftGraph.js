import * as d3 from "d3";
import { line } from "d3-shape";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ACTION_TYPE_PBFT_GRAPH, COLORS_PBFT_GRAPH, NODES_PBFT_GRAPH, NUMBER_OF_STEPS_PBFT_GRAPH, TITLES_PBFT_GRAPH, TRANSDURATION_PBFT_GRAPH } from "../../../../../Constants";
import { GraphResizerContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";
import { dummyData } from "../data/data";

const computeDataDetails = (data) => {
  let transactions = new Set();
  let primaryInd = -1;

  for (const property in data) {
    transactions.add(parseInt(property));
  }

  for (const [key, value] of Object.entries(data)) {
    if (value.primary_id === value.replica_id) primaryInd = key;
  }

  let primaryIndex = parseInt(primaryInd);

  return { primaryIndex, transactions };
};

const primaryIndexToPoint = {
  1: 2,
  2: 8,
  3: 14,
  4: 20
}

const generateConnections = (
  data,
  numberOfSteps,
  xCoords,
  yCoords,
  messageHistory,
  transactionNumber = 17
) => {
  let points = {};

  const currentData = messageHistory[transactionNumber];

  const { primaryIndex, transactions } =
    computeDataDetails(currentData);

  console.log(transactions);

  ACTION_TYPE_PBFT_GRAPH.forEach(
    (action, index) =>
      (points = {
        ...points,
        [action]: {
          color: `${COLORS_PBFT_GRAPH[index]}`,
          start: [],
          end: [],
        },
      })
  );

  let currentPrimaryPointIndex = primaryIndexToPoint[primaryIndex]
  // REQUEST OBJECT
  points.request.start.push({
    flag: true,
    points: data[0],
  });
  points.request.end.push({
    flag: true,
    points: data[numberOfSteps + currentPrimaryPointIndex],
  });
  // PRE-PREPARE OBJECT
  points.prePrepare.start.push({
    flag: true,
    points: points.request.end[0].points,
  });

  for (let i = 1; i < yCoords.length; i++) {
    if (primaryIndex === i) continue;
    points.prePrepare.end.push({
      flag: true,
      points: {
        x: xCoords[2],
        y: yCoords[i],
      },
    });
  }

  let yCoordToReplicas = {};
  
  for (let i = 1; i < yCoords.length; i++) {
    yCoordToReplicas = {
      ...yCoordToReplicas,
      [yCoords[i]]: i,
    };
  }
  // PREPARE OBJECT
  points.prePrepare.end.forEach((element, index) => {
    if (transactions.has(yCoordToReplicas[element.points.y])) {
      points.prepare.start.push(element.points);
    }
  });

  for (const element of points.prepare.start) points.prepare.end.push([]);

  for (let i = 0; i < points.prepare.start.length; i++) {
    for (let j = 1; j < yCoords.length; j++) {
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
  for (let i = 1; i < yCoords.length; i++) {
    if(transactions.has(i)){
      points.commit.start.push({
        x: xCoords[3],
        y: yCoords[i],
      });
    }
  }

  for (const element of points.commit.start) points.commit.end.push([]);

  for (let i = 0; i < points.commit.start.length; i++) {
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
    if(transactions.has(i)){
      points.reply.start.push({
        flag: true,
        points: {
          x: xCoords[4],
          y: yCoords[i],
        },
      });
    }
  }
  return { points, primaryIndex };
};

const generateLabels = (xCoords, yCoords) => {
  let labelsX = [], labelsY = [];

  if(xCoords.length < 2 || yCoords.length < 2) return labelsX;

  for(let i=0; i<xCoords.length-1; i++){
    let obj = {
      x: Math.floor((xCoords[i] + xCoords[i + 1]) / 2),
      y: yCoords[0] - 20,
      title: `${TITLES_PBFT_GRAPH[i]}`,
    };
    labelsX.push(obj)
  }

  for(let i=0; i<yCoords.length; i++){
    let obj = {
      x: xCoords[0]-50,
      y: yCoords[i]+5,
      title: `${NODES_PBFT_GRAPH[i]}`,
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

const generateTransactionIds = (data) => {
  let transactionIds = [];

  for (const property in data) {
    transactionIds.push(parseInt(property));
  }

  console.log(transactionIds);

  return { transactionIds };
};

const connectionRender = (lineData, lineColor, dotColor, duration, delay, lineGen, svg, arrow) => {
  var line = svg.append("path")
    .attr("d", lineGen(lineData))
    .attr("id", `${lineData[0][1]}${lineData[0][0]}`)
    .attr("stroke", lineColor)
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("marker-end", `url(#arrow-&${arrow})`)
    .style("opacity", 0)

  // Define the tooltip div
  var tooltip = d3.select(`#${lineData[0][1]}${lineData[0][0]}`)
    .append("div")
    .attr("class", "tooltip")
    .attr("fill", "white")
    .attr("height", "100px")
    .attr("width", "100px")
    .attr("stroke", "steelblue")
    .style("opacity", 1);

  // Append tooltip text
  var tooltipText = "Tooltip text here"; 

  line.transition()
    .duration(duration / 2)
    .delay(delay)
    .style("opacity", 1)
    .on("end", function () {
      let dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", `${dotColor}`)
        .attr("cx", lineData[0][0])
        .attr("cy", lineData[0][1])
        .style("opacity", 0);

      dot.transition()
        .duration(duration / 2)
        .style("opacity", 1)
        .attrTween("cx", function () {
          return function (t) {
            var interpolatedPoint = line.node().getPointAtLength(t * line.node().getTotalLength());
            return interpolatedPoint.x;
          };
        })
        .attrTween("cy", function () {
          return function (t) {
            var interpolatedPoint = line.node().getPointAtLength(t * line.node().getTotalLength());
            return interpolatedPoint.y;
          };
        });
    })

  // Add event listeners to show/hide tooltip when hovering over the line
  d3.select(`#${lineData[0][1]}${lineData[0][0]}`)
  .on('mouseover', function (e, d) {
    console.log('HELLO')
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 1)
  })
    .on("mousemove", function (e,d) {
      console.log('HELLO 2')
      tooltip.html(tooltipText)
        .style("left", (e.pageX) + "px")
        .style("top", (e.pageY - 28) + "px");
    })
    .on("mouseout", function () {
      console.log('HELLO 3')
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    
}

const labelPrimaryNode = (svg, label) => {
  svg
    .append("rect")
    .attr("x", label.x - 42.5)
    .attr("y", label.y - 20)
    .attr("width", 85)
    .attr("height", 40)
    .attr("fill", "none")
    .attr("stroke", "#fc453f")
    .attr("stroke-width", 1)
    .attr("rx", 10)
    .attr("ry", 10);

  svg
    .append("text")
    .attr("transform", "translate(" + label.x + " ," + (label.y + 15) + ")")
    .attr("fill", "#fc453f")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Primary");

  return svg;
};

const PbftGraph = ({ 
  messageHistory, 
  // TODO: Uncomment the below after connecting to the BE
  // transactionNumber 
}) => {
  const { boxValues, resizing, setResizing } = useContext(GraphResizerContext);
  const { width, height } = boxValues;
  const { theme } = useContext(ThemeContext);

  // TODO: Comment the below two lines after connecting to the BE
  const { transactionIds } = generateTransactionIds(dummyData);
  const [transactionNumber, setTransactionNumber] = useState(transactionIds[0]);

  const ref = useRef(null);

  const debouncedRender = useCallback(() => {
    const data = generatePoints(
      width,
      height,
      0,
      Math.floor(height / 4),
      4,
      NUMBER_OF_STEPS_PBFT_GRAPH
    );

    const { xCoords, yCoords, verticalLines, horizontalLines } = generateLines(
      data,
      NUMBER_OF_STEPS_PBFT_GRAPH
    );

    const { points, primaryIndex } = generateConnections(
      data,
      NUMBER_OF_STEPS_PBFT_GRAPH,
      xCoords,
      yCoords,
      // TODO: Change dummyData to messageHistory after connecting to BE
      dummyData,
      transactionNumber
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
    ACTION_TYPE_PBFT_GRAPH.forEach((action, index) =>
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
        .attr("fill", `${COLORS_PBFT_GRAPH[index]}`)
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
    labelsY.forEach((label, index) =>{
      const labelText = svg
        .append("text")
        .attr("transform", "translate(" + label.x + " ," + label.y + ")")
        .style("text-anchor", "middle")
        .text(`${label.title}`)
        .attr("fill", "#c4c4c4")

      if (index === primaryIndex) labelPrimaryNode(svg, label);
      return labelText;
    });

    // REQUEST LINES
    points.request.end.forEach((end, i) => {
      if (end.flag) {
        console.log('REQUEST POINTS', points.request.color);
        connectionRender([points.request.start[0].points, end.points], points.request.color, 'gray', TRANSDURATION_PBFT_GRAPH + 1000, i * 2000, lineGen, svg, 'request');
      }
    });

    // PRE-PREPARE LINES
    points.prePrepare.end.forEach((end, i) => {
      if (end.flag) {
        connectionRender([points.prePrepare.start[0].points, end.points], points.prePrepare.color, 'gray', TRANSDURATION_PBFT_GRAPH + 2000, i * 2000, lineGen, svg, 'prePrepare');
      }
    });

    // PREPARE LINES
    points.prepare.start.map((start, index) =>
      points.prepare.end[index].map((end, i) => {
        return (
            end.flag && connectionRender([start, end.points], points.prepare.color, 'gray', TRANSDURATION_PBFT_GRAPH + 3000, i * 3000, lineGen, svg, 'prepare')
        );
      })
    );

    // COMMIT LINES
    points.commit.start.map((start, index) =>
      points.commit.end[index].map((end, i) => {
        return (
          end.flag && connectionRender([start, end.points], points.commit.color, 'gray', TRANSDURATION_PBFT_GRAPH + 4000, i * 4000, lineGen, svg, 'commit')
        );
      })
    );

    // REPLY LINES
    points.reply.start.forEach((start, i) => {
      return (
        start.flag && connectionRender([start.points, points.reply.end[0].points], points.reply.color, 'gray', TRANSDURATION_PBFT_GRAPH + 3000, i * 3000, lineGen, svg, 'reply')
      );
    });
  }, [theme, width, height]);

  useEffect(() => {
    debouncedRender();
  }, [debouncedRender]);

  useEffect(() => {
    console.log("MESSAGE HISTIRY", messageHistory);
  }, [messageHistory]);

  return (
    <div className='relative w-full h-full pl-4 pr-2 pb-6'>
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


// ! POINTS DATA FOR REFERENCE FOR PLOTTING IS BELOW DO NOT DELETE IT!!!
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
