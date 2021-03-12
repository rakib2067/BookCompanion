import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CurrentDetailsScreen from "../screens/CurrentDetailsScreen";
import LibraryScreen from "../screens/LibraryScreen";
import LibraryDetailsScreen from "../screens/LibraryDetailsScreen";

const Stack= createStackNavigator();

const LibraryNavigator= () =>(
    <Stack.Navigator>
         <Stack.Screen name="Library" component={LibraryScreen} options={{headerShown:false}}/>
         <Stack.Screen name="CurrentDetails" component={CurrentDetailsScreen} options={{headerShown:false}}/>
         <Stack.Screen name="LibraryDetails" component={LibraryDetailsScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
)
export default LibraryNavigator;