import React, { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children, values }) => {
  return (
    <ThemeContext.Provider value={{ ...values }}>
      {children}
    </ThemeContext.Provider>
  );
};
