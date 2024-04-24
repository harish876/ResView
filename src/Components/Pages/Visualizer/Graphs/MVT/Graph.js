import { ResponsiveLine } from "@nivo/line";
import { useContext } from "react";
import { GraphViewContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";

const themeObj = {
    "text": {
        "fontSize": 12,
        "fill": "#333333",
        "outlineWidth": 0,
        "outlineColor": "transparent"
    },
    "axis": {
        "domain": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            }
        },
        "legend": {
            "text": {
                "fontSize": 15,
                "fill": "#c4c4c4",
                "outlineWidth": 3,
                "outlineColor": "transparent",
            }
        },
        "ticks": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            },
            "text": {
                "fontSize": 13,
                "fill": "#c4c4c4",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "grid": {
        "line": {
            "stroke": "#c4c4c4",
            "strokeWidth": 0.5,
        }
    },
    "legends": {
        "title": {
            "text": {
                "fontSize": 13,
                "fill": "#c4c4c4",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        },
        "text": {
            "fontSize": 13,
            "fill": "#c4c4c4",
            "outlineWidth": 0,
            "outlineColor": "transparent"
        },
        "ticks": {
            "line": {},
            "text": {
                "fontSize": 10,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "annotations": {
        "text": {
            "fontSize": 13,
            "fill": "#333333",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "link": {
            "stroke": "#000000",
            "strokeWidth": 1,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "outline": {
            "stroke": "#000000",
            "strokeWidth": 2,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "symbol": {
            "fill": "#000000",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        }
    },
    "tooltip": {
        "container": {
            "background": "#ffffff",
            "color": "#333333",
            "fontSize": 12
        },
        "basic": {},
        "chip": {},
        "table": {},
        "tableCell": {},
        "tableCellValue": {}
    }
}

const MvtGraph = ({ chartData, chartMaxData }) => {
    const { mvtGraphNo } = useContext(GraphViewContext)
    const { theme } = useContext(ThemeContext);

    const graphTheme = theme ? themeObj : {
        ...themeObj,
        axis: {
            ...themeObj.axis, 
            legend: {
                text: {
                    ...themeObj.axis.legend.text,
                    "fill": "#2c2e2d",
                }
            },
            ticks: {
                ...themeObj.axis.ticks,
                text: {
                    ...themeObj.axis.ticks.text,
                    "fill": "#2c2e2d",
                }
            }
        },
        legends: {
            ...themeObj.legends,
            text: {
                ...themeObj.legends.text,
                "fill": "#2c2e2d",
            },
        },
        grid: {
            line: {
                ...themeObj.grid.line,
                "stroke": "#5d5e5e",
            }
        },
    };

    return (
        <ResponsiveLine
            data={chartData[mvtGraphNo]}
            margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
            xScale={{
                type: "linear",
                min: "auto",
                max: chartMaxData[mvtGraphNo] + 100 ?? "auto",
                stacked: false,
                reverse: false,
            }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            xFormat=' >-.2f'
            yFormat=' >-.2f'
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time Since Replica Started Accepting Messages(10^-5 seconds)",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Messages",
                legendOffset: -40,
                legendPosition: "middle",
            }}
            enablePoints={true}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={- 12}
            useMesh={true}
            legends={
                [
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]
            }
            theme={graphTheme}
        />
    );
}



export default MvtGraph

// useEffect(() => {
//     console.log('MESSAGE HISTORY', messageHistory);
//     if (!(currentTransaction in messageHistory) || messageHistory[currentTransaction].current_time < 0) {
//         setMessageChartData([[], []])
//         // console.log(currentTransaction, " Not in messageHistory")
//     }
//     else {
//         const transactionData = messageHistory[currentTransaction];
//         let startTime = 0;
//         let firstPrepareTime = 0;
//         let prePrepareTimes = [];
//         let prepareTimes = [];
//         let allPrepareTimes = [];
//         let allCommiteTimes = [];
//         let labelList = [];

//         Object.keys(transactionData).forEach((key) => {
//             labelList.push("Replica " + key);

//             if (transactionData[key].primary_id !== transactionData[key].replica_id) {
//                 prePrepareTimes.push(Math.floor(transactionData[key].propose_pre_prepare_time / 10000));
//             }

//             prepareTimes.push(Math.floor(transactionData[key].prepare_time / 10000));

//             let replicaPrepareTS = [];
//             let replicaCommitTS = [];

//             transactionData[key]["prepare_message_timestamps"].map((time) =>
//                 replicaPrepareTS.push(Math.floor(time / 10000))
//             );

//             transactionData[key]["commit_message_timestamps"].map((time) =>
//                 replicaCommitTS.push(Math.floor(time / 10000))
//             );

//             allPrepareTimes.push(replicaPrepareTS);
//             allCommiteTimes.push(replicaCommitTS);
//         });

//         startTime = Math.min(...prePrepareTimes);
//         firstPrepareTime = Math.min(...prepareTimes);

//         let prepareChartData = [];
//         let commitChartData = [];
//         let maxPrepareTS = 0;
//         let maxCommitTS = 0;

//         for (const element of allPrepareTimes) {
//             let lineData = [{ x: 0, y: 0 }];
//             for (let j = 0; j < element.length; j++) {
//                 const relativeTime = element[j] - startTime;
//                 lineData.push({ x: relativeTime, y: j });
//                 lineData.push({ x: relativeTime, y: j + 1 });
//                 maxPrepareTS = Math.max(maxPrepareTS, relativeTime);
//             }
//             prepareChartData.push(lineData);
//         }

//         for (const element of allCommiteTimes) {
//             let lineData = [{ x: 0, y: 0 }];
//             for (let j = 0; j < element.length; j++) {
//                 const relativeTime = element[j] - firstPrepareTime;
//                 lineData.push({ x: relativeTime, y: j });
//                 lineData.push({ x: relativeTime, y: j + 1 });
//                 maxCommitTS = Math.max(maxCommitTS, relativeTime);
//             }
//             commitChartData.push(lineData);
//         }

//         let data = {};

//         let preparePointsObj = { max: 0, points: [] }
//         preparePointsObj.max = maxPrepareTS;

//         for (let i = 0; i < labelList.length; i++) {
//             if (!labelToggle[labelList[i]]) {
//                 data = {
//                     id: labelList[i],
//                     color: COLORS_MVT_GRAPH[i],
//                     data: [],
//                 };
//             }
//             else {
//                 data = {
//                     id: labelList[i],
//                     color: COLORS_MVT_GRAPH[i],
//                     data: prepareChartData[i],
//                 };
//             }
//             preparePointsObj.points.push(data);
//         }

//         let commitPointsObj = { max: 0, points: [] }
//         commitPointsObj.max = maxCommitTS;

//         for (let i = 0; i < labelList.length; i++) {
//             if (!labelToggle[labelList[i]]) {
//                 data = {
//                     id: labelList[i],
//                     color: COLORS_MVT_GRAPH[i],
//                     data: [],
//                 };
//             }
//             else {
//                 data = {
//                     id: labelList[i],
//                     color: COLORS_MVT_GRAPH[i],
//                     data: commitChartData[i],
//                 };
//             }
//             commitPointsObj.points.push(data);
//         }

//         let pointData = { 1: preparePointsObj, 2: commitPointsObj };

//         setMessageChartData(pointData);
//     }
// }, [messageHistory, currentTransaction, labelToggle, resetGraph]);