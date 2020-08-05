import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { routes } from "./Routes";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.title}
            component={item.main}
          ></Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
