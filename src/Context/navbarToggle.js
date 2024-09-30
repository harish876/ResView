import React, { createContext, useState, useRef, useCallback } from "react";

export const NavbarToggleContext = createContext({
  borderToggle: false,
  toggleBorderTrue: () => {},
  toggleBorderFalse: () => {},
});

export const NavbarToggleProvider = ({ children }) => {
  const [borderToggle, setBorderToggle] = useState(false);
  const { Provider } = NavbarToggleContext;
  const bToggle = useRef()

 const toggleBorderTrue = () => {
    setBorderToggle(true);
  };

  const toggleBorderFalse = () => {
    setBorderToggle(false);
  };

    const bToggleElement = useCallback((node) => {
        if (bToggle.current) {
        bToggle.current.disconnect();
        }
        const options = {
        root: null,
        threshold: 0,
        };
        bToggle.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            toggleBorderFalse();
        } else {
            toggleBorderTrue();
        }
        }, options);
        if (node) {
        bToggle.current.observe(node);
        }
  }, []);

  return (
    <Provider value={{ borderToggle, bToggleElement }}>
      {children}
    </Provider>
  );
};
