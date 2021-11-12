import React from "react";
import { SafeAreaView } from "react-native";
import { useGlobalContext } from "../hooks/useGlobalContext";

export const AppFrame = ({
  children,
  userContextValues,
  themeContextValues,
}) => {
  const { GlobalContextProvider } = useGlobalContext();
  return (
    <GlobalContextProvider
      themeValues={themeContextValues}
      userValues={userContextValues}
    >
      <SafeAreaView
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        {children}
      </SafeAreaView>
    </GlobalContextProvider>
  );
};
