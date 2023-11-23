import React, { createContext, useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

// CONTEXT FOR THE THEME
export const ThemeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children } ) => {
  const [theme, setTheme] = useState(true);
  const { Provider } = ThemeContext;

  const toggleDarkTheme = () => {
    setTheme(true);
    localStorage.setItem("theme", "dark");
  };

  const toggleLightTheme = () => {
    setTheme(false);
    localStorage.setItem("theme", "light");
  };

  return (
    <Provider value={{ theme, toggleDarkTheme, toggleLightTheme }} >
        {children}
    </Provider>
    
  );
};

export const GraphResizerContext = createContext({
  width: 920,
  height: 650
});

const GraphResizerProvider = ({ children }) => {
   const { Provider } = GraphResizerContext;
   const [boxValues, setBoxValues] = useState({
     width: 920,
     height: 600,
   });

   return <Provider value={{ boxValues, setBoxValues }}>{children}</Provider>;
};

// CONTEXT FOR THE GRAPH VIEW
export const GraphViewContext = createContext({
  graph: "MvT",
  mvtGraphNo: 1,
  // TODO: Look into the toggleGraphChange and change it as a value will be passed to reference the next changed state of the graph
  toggleGraphChange: () => {},
  toggleMvtGraphNoChange: () => {},
});

const GraphViewProvider = ({ children }) => {
    const [graph, setGraph] = useState('MvT');
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

// COMBINED PROVIDER FOR ALL CONTEXT
const CombineProviders = (providers) =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }) =>
        (
          <AccumulatedProviders>
            <Provider {...props}>{children}</Provider>
          </AccumulatedProviders>
        ),
    ({ children }) => <>{children}</>
  );

export const AllProviders = CombineProviders([
  [GraphViewProvider],
  [ThemeProvider],
  [GraphResizerProvider],
]);
