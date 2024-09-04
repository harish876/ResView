import React from "react";
import { PbftAnimationSpeedProvider, PbftGraphClearProvider } from "./graph";
import { NavbarToggleProvider } from "./navbarToggle";
import { ThemeProvider } from "./theme";
import { VizDataHistoryProvider } from "./visualizer";


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
  [ThemeProvider],
  [NavbarToggleProvider],
  [PbftAnimationSpeedProvider],
  [PbftGraphClearProvider],
  [VizDataHistoryProvider],
]);
