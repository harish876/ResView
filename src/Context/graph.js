import React, { createContext, useState } from "react";

export const GraphResizerContext = createContext({
  width: 1200,
  height: 800,
  resizing: false
});

export const GraphResizerProvider = ({ children }) => {
  const { Provider } = GraphResizerContext;
  const [boxValues, setBoxValues] = useState({
    width: 1200,
    height: 800,
  });
  const [resizing, setResizing] = useState(false);

  return (
    <Provider value={{ boxValues, setBoxValues, resizing, setResizing }}>
      {children}
    </Provider>
  );
};

// CONTEXT FOR THE GRAPH VIEW
export const GraphViewContext = createContext({
  graph: "MvT",
  mvtGraphNo: 1,
  // TODO: Look into the toggleGraphChange and change it as a value will be passed to reference the next changed state of the graph
  toggleGraphChange: () => {},
  toggleMvtGraphNoChange: () => {},
});

export const GraphViewProvider = ({ children }) => {
  const [graph, setGraph] = useState("MvT");
  const [mvtGraphNo, setMvtGraphNo] = useState(1);
  const { Provider } = GraphViewContext;

  const toggleGraphChange = (value) => {
    setGraph(value);
  };

  const toggleMvtGraphNoChange = (value) => {
    setMvtGraphNo(value);
  };

  return (
    <Provider
      value={{
        graph,
        mvtGraphNo,
        toggleGraphChange,
        toggleMvtGraphNoChange,
      }}
    >
      {children}
    </Provider>
  );
};
