
import React, {useState, UseState} from 'react';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions,ImageBackground,Platform, Text, StatusBar,View,TouchableNativeFeedback,Image,Alert,SafeAreaView, Button, TextInput, Switch } from 'react-native';
import { render } from 'react-dom';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import LoginButton from './app/components/LoginButton';
import AppButton from './app/components/AppButton';
import Card from './app/components/Card';
import ListDetailsScreen from './app/screens/ListDetailsScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import Screen from './app/components/Screen';
import Icon from './app/components/Icon';
import ListItem from './app/components/ListItem';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import AppPicker from './app/components/AppPicker';
import AppText from './app/components/AppText/AppText';
import LoginScreen from './app/screens/LoginScreen';

//Define variables outside for hardcoding data (no backend)


export default function App() {
  //define variables inside to create state hooks

  return(
    
    
    <LoginScreen />
    
 
  );
}
