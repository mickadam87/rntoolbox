import React from "react";
import { ScrollView } from "react-native-web";
import { styles } from "../styles/styles";

export const ViewFrame = ({ children }) => {
  return <ScrollView style={styles.viewFrame}>{children}</ScrollView>;
};
