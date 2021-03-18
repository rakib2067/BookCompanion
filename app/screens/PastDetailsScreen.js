import React,{useState,useEffect} from "react";
import { View, Image, StyleSheet,FlatList,Alert} from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";
import * as firebase from 'firebase';
import routes from "../navigation/routes";
import Card from "../components/Card";
import CardDeleteAction from "../components/CardDeleteAction";

function PastDetailsScreen({navigation}) {
  const[state,setState]= useState({
    results: [],
    
  });
  useEffect(() =>{
    let Result=[];
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("read").onSnapshot((snapshot)=>{
      snapshot.docs.forEach(doc =>{
        Result.push(doc.data())
      })
      setState({results: Result});
    })
  },[])
  const handleDelete= item =>{
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("read").doc(item.title).delete()
    .then(()=>{
      Alert.alert('Removed from library')
    }).catch((e)=>{
      Alert.alert('Error:' + e)
    })
  }
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
            renderRightActions={()=>
                <CardDeleteAction onPress={()=>handleDelete(item)}/>}
          />
        )}
      />
      </Screen>
  );
}

export default PastDetailsScreen;