import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import WelcomeScreen from "../screens/WelcomeScreen";


const Stack= createStackNavigator();

const AccountNavigator= () =>(
    <Stack.Navigator>
        <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
    </Stack.Navigator>
)
export default AccountNavigator;