import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack= createStackNavigator();

const StackNavigator= ({routes})=> {

    return (
        <Stack.Navigator>
            {routes.map((item,index)=> (
                <Stack.Screen name={item.title} component={item.main} key={index}/>
            ))}
        </Stack.Navigator>
    )
}


export default StackNavigator;