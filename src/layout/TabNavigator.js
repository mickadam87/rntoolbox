import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ screens }) => {
  const { UserContext } = useGlobalContext();
  const { auth } = UserContext();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {screens &&
          screens.map((screen) => {
            if (screen.authRequired) {
              return auth === true ? (
                <Tab.Screen name={screen.name} component={screen.component} />
              ) : null;
            } else {
              return (
                <Tab.Screen name={screen.name} component={screen.component} />
              );
            }
          })}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
