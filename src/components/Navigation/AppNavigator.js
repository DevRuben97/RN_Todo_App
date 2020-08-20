import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { routes } from "./Routes";

const Stack = createBottomTabNavigator();

const AppNavigator = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.title}
            component={item.main}
            options={{
                tabBarIcon: ()=> <Icon name={item.icon} color="#007ACC" size={32}/>,
                headerTitleAlign: 'center'

            }}
          ></Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
