
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
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';

//Define variables outside for hardcoding data (no backend)
// {} brackets are used to dynamically display data (Application Logic)

// const api_key="AIzaSyAoTVNQJ8sweojgvXzz7TpZuCyJURTcgWA";

export default function App() {
//define variables inside to create state hooks
  
  return(
    
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>

    
    );
  }
  