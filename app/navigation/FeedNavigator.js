import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListDetailsScreen from "../screens/ListDetailsScreen";


const Stack= createStackNavigator();

const FeedNavigator= () =>(
    <Stack.Navigator>
        <Stack.Screen name="Listings" component={ListingsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ListingDetails" component={ListDetailsScreen} options={{headerShown:false}}/>
       
    </Stack.Navigator>
)
export default FeedNavigator;