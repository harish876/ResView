import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children } ) => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (!prevTheme ? true : false));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
        {children}
    </ThemeContext.Provider>
    
  );
};
