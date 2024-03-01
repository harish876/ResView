import React from "react";
import { GraphResizerProvider, GraphViewProvider } from "./graph";
import { ThemeProvider } from "./theme";
import { NavbarToggleProvider } from "./navbarToggle";


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
  [NavbarToggleProvider],
]);
