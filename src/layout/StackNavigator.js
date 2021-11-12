import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Stack = createNativeStackNavigator();

export const StackNavigator = ({ screens }) => {
  const { UserContext } = useGlobalContext();
  const { auth } = UserContext();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens &&
          screens.map((screen) => {
            if (screen.authRequired) {
              return auth === true ? (
                <Stack.Screen name={screen.name} component={screen.component} />
              ) : null;
            } else {
              return (
                <Stack.Screen name={screen.name} component={screen.component} />
              );
            }
          })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
