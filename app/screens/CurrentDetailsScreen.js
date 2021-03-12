import React,{useState,useEffect} from "react";
import { View, Image, StyleSheet,FlatList } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";
import * as firebase from 'firebase';
import routes from "../navigation/routes";
import Card from "../components/Card";

function CurrentDetailsScreen({navigation}) {
  const[state,setState]= useState({
    results: [],
    
  });
  useEffect(() =>{
    let Result=[];
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").onSnapshot((snapshot)=>{
      snapshot.docs.forEach(doc =>{
        Result.push(doc.data())
      })
      setState({results: Result});
    })
  },[])
    return (
      <Screen > 
        <FlatList
        data={state.results}
        renderItem={({item}) => (
          <Card
            title={item.title}
            subTitle={item.author}
            image={item.image}
            onPress={() => navigation.navigate(routes.LIBRARY_DETAILS, item)}
            backgroundColor={colors.light}
          />
        )}
      />
      </Screen>
  );
}

export default CurrentDetailsScreen;