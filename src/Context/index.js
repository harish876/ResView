import React, { createContext, useState } from "react";

// CONTEXT FOR THE THEME
export const ThemeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children } ) => {
  const [theme, setTheme] = useState(false);
  const { Provider } = ThemeContext;

  const toggleTheme = () => {
    setTheme((prevTheme) => (!prevTheme ? true : false));
  };

  return (
    <Provider value={{ theme, toggleTheme }} >
        {children}
    </Provider>
    
  );
};

// CONTEXT FOR THE GRAPH VIEW
export const GraphViewContext = createContext({
    graph: 'pBFT',
    // TODO: Look into the toggleGraphChange and change it as a value will be passed to reference the next changed state of the graph 
    toggleGraphChange: () => {}
});

const GraphViewProvider = ({ children }) => {
    const [graph, setGraph] = useState('PBFT');
    const { Provider } = GraphViewContext;
    const toggleGraphChange = (value) => {
      setGraph(value);
    };

    return <Provider value={{ graph, toggleGraphChange }}>{children}</Provider>;
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
]);
