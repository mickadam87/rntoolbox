import React from "react";
import { ThemeContextProvider, ThemeContext } from "../ThemeContext";
import { UserContextProvider, UserContext } from "../UserContext";

export const useGlobalContext = () => {
  const GlobalContextProvider = ({ children, themeValues, userValues }) => {
    return (
      <ThemeContextProvider values={themeValues}>
        <UserContextProvider values={userValues}>
          {children}
        </UserContextProvider>
      </ThemeContextProvider>
    );
  };

  return { UserContext, ThemeContext, GlobalContextProvider };
};
