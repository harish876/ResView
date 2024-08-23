import React, { createContext, useState } from "react";


// CONTEXT FOR PBFT GRAPH ANIMATION SPEEDS 
export const PbftAnimationSpeedContext = createContext({
  speed: '1x',
});

export const PbftAnimationSpeedProvider = ({ children }) => {
  const { Provider } = PbftAnimationSpeedContext;
  const [speed, setSpeed] = useState('1x')

  const changeSpeed = (value) => setSpeed(value);

  return (
    <Provider value={{ speed, changeSpeed }}>
      {children}
    </Provider>
  );
};

// CONTEXT FOR PBFT GRAPH CLEARING
export const PbftGraphClearContext = createContext({
  clear: false,
});

export const PbftGraphClearProvider = ({ children }) => {
  const { Provider } = PbftGraphClearContext;
  const [clear, setClear] = useState(false)

  const changeClear = (value) => setClear(value);

  return (
    <Provider value={{ clear, changeClear }}>
      {children}
    </Provider>
  );
};
