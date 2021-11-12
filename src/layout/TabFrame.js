import React from "react";
import { TabNavigator } from "./TabNavigator";
import { AppFrame } from "./AppFrame";

export const TabFrame = ({
  screens,
  themeContextValues,
  userContextValues,
}) => (
  <AppFrame
    themeContextValues={themeContextValues}
    userContextValues={userContextValues}
  >
    <TabNavigator screens={screens} />
  </AppFrame>
);
