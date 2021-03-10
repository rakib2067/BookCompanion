
import React, {useEffect, useState, UseState} from 'react';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions,ImageBackground,Platform, Text, StatusBar,View,TouchableNativeFeedback,Image,Alert,SafeAreaView, Button, TextInput, Switch, TextComponent } from 'react-native';
import { render } from 'react-dom';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import * as firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "book-companion-304017.firebaseapp.com",
  projectId: "book-companion-304017",
  storageBucket: "book-companion-304017.appspot.com",
  messagingSenderId: "484527704210",
  appId: "1:484527704210:web:ba702570d04d8958717e4b",
  measurementId: "G-VNMP4LKSJ3"
};
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';

// const api_key="AIzaSyAoTVNQJ8sweojgvXzz7TpZuCyJURTcgWA";
if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
  //used to make sure there is only 1 instance of firebase is running 
}
export default function App() {
//define variables inside to create state hooks
  const [user,setUser]=useState();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in")
      
    } else {
      console.log("User is signed out")
    }
  });
  return(
    <AuthContext.Provider value={{user,setUser}}>
    <NavigationContainer theme={navigationTheme}>
      {user?<AppNavigator/>: <AuthNavigator />}
    </NavigationContainer>
    </AuthContext.Provider>

    
    );
  }
  