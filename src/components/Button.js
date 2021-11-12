import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = new StyleSheet.create({
  frame: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});

export const Button = ({
  title,
  style,
  textStyle,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  onFocus,
  onBlur,
}) => {
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.frame }}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
};
