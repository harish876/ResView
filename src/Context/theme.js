import React, { createContext, useState } from "react";

// CONTEXT FOR THE THEME
export const ThemeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
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
    <Provider value={{ theme, toggleDarkTheme, toggleLightTheme }}>
      {children}
    </Provider>
  );
};
