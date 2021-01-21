
import React from 'react';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions,ImageBackground,Platform, Text, StatusBar,View,TouchableNativeFeedback,Image,Alert,SafeAreaView, Button } from 'react-native';
import { render } from 'react-dom';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppText from './app/components/AppText';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import LoginButton from './app/components/LoginButton';
import AppButton from './app/components/AppButton';
import Card from './app/components/Card';
import ListDetailsScreen from './app/screens/ListDetailsScreen';
import MessagesScreen from './app/screens/MessagesScreen';
export default function App() {

  return(

    <MessagesScreen />
 
  );
}
