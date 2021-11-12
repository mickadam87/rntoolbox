import React from "react";
import { StackNavigator } from "./StackNavigator";
import { AppFrame } from "./AppFrame";

export const StackFrame = ({
  screens,
  themeContextValues,
  userContextValues,
}) => (
  <AppFrame
    themeContextValues={themeContextValues}
    userContextValues={userContextValues}
  >
    <StackNavigator screens={screens} />
  </AppFrame>
);
