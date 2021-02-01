
import React, {useEffect, useState, UseState} from 'react';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions,ImageBackground,Platform, Text, StatusBar,View,TouchableNativeFeedback,Image,Alert,SafeAreaView, Button, TextInput, Switch } from 'react-native';
import { render } from 'react-dom';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Screen from './app/components/Screen';
import ImageInput from './app/components/ImageInput';

//Define variables outside for hardcoding data (no backend)


export default function App() {
  //define variables inside to create state hooks
  const [imageUri, setImageUri]=useState();
  const requestPermission = async () =>{
  const {granted}= await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted)
    alert('You need to enable permission in order to use pictures ')
  }
    useEffect(() => {
      requestPermission();
    },[])
  const selectImage =async () => {
  try {
  const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled)
      setImageUri(result.uri);
  } catch (error) {
    console.log('Error reading an image', error)
  }
  
  }
  return(
    
    <Screen>
      <ImageInput 
      onChangeImage={uri => setImageUri(uri)}
      imageUri={imageUri} />
    </Screen>
    
 
  );
}
