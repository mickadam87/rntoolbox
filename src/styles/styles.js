import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewFrame: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  flexCenterRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  flexStartRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  flexCenterColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  flexStartColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
