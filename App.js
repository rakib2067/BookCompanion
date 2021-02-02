
import React, {useEffect, useState, UseState} from 'react';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions,ImageBackground,Platform, Text, StatusBar,View,TouchableNativeFeedback,Image,Alert,SafeAreaView, Button, TextInput, Switch, TextComponent } from 'react-native';
import { render } from 'react-dom';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Screen from './app/components/Screen';
import ImageInput from './app/components/ImageInput';
import ImageInputList from './app/components/ImageInputList';
import colors from './app/config/colors';
import ListingEditScreen from './app/screens/ListingEditScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import ListDetailsScreen from './app/screens/ListDetailsScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AccountScreen from './app/screens/AccountScreen';


//Define variables outside for hardcoding data (no backend)
// {} brackets are used to dynamically display data (Application Logic)
const TweetDetails = ({route}) =>(
  <Screen>
    <Text>Tweet Details {route.params.id}</Text>
    
  </Screen>
)

const Stack = createStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator 
  screenOptions={{
      headerStyle: {backgroundColor:"dodgerblue"},
      headerTintColor:"white",
      
    }}>
    <Stack.Screen 
    name="Tweets" 
    component={Tweets}
    options={{headerShown: false}}
     />
    <Stack.Screen 
    name="TweetDetails" 
    component={TweetDetails}
    options={({route}) =>({title: route.params.id})} />
  </Stack.Navigator>
)

const Link =() =>{ 
  const navigation= useNavigation();
  return (
  <Button
  title="Click"
  onPress={() =>navigation.navigate('TweetDetails')} />
)}
const Tweets = ({navigation}) => (
  <Screen>
    <Text>Tweets</Text>
    <Button 
      title="View Tweet"
      onPress={() => navigation.navigate("TweetDetails",{id:1})}
    />
  </Screen>
)

const Tab = createBottomTabNavigator();
const TabNavigator = () =>(
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "dodgerblue",
      activeTintColor:colors.white,
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: colors.black
    }}>
    <Tab.Screen 
    name="Feed" 
    component={FeedNavigator}
    options={{tabBarIcon: ({size,color})=> <MaterialCommunityIcons color={color} name="home" size={size}/>}}
    />
    <Tab.Screen 
    name="Accounts" 
    component={Account}
    options={{tabBarIcon: ({size,color})=> <MaterialCommunityIcons name="apps" color={color} size={size}/>}}
    />
  </Tab.Navigator>
)
const Account = ()=>
  <Screen>
    <Text>Account</Text>
  </Screen>
export default function App() {
//define variables inside to create state hooks
  
  return(
    
    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
    <WelcomeScreen />
    
    );
  }
  