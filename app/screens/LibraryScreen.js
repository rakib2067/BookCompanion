import React, { useState,useEffect } from 'react';
import { StyleSheet,View,ActivityIndicator} from 'react-native';
import Icon from '../components/Icon';
import { ListItem } from "../components/lists";
import Screen from '../components/Screen';
import colors from '../config/colors';
import * as firebase from 'firebase';
import routes from '../navigation/routes';

function LibraryScreen({navigation}) {
  
  const user=firebase.auth().currentUser.uid;
  const [current,setCurrent]=useState();
  const [past,setPast]=useState();
  const [future,setFuture]=useState();

  useEffect(() =>{
  firebase.firestore().collection("users")
  .doc(firebase.auth().currentUser.uid).collection("currently reading").onSnapshot(snapshot=>{
    setCurrent(snapshot.size)
  })
  firebase.firestore().collection("users")
  .doc(firebase.auth().currentUser.uid).collection("read").onSnapshot(snapshot=>{
    setPast(snapshot.size)
  })
  firebase.firestore().collection("users")
  .doc(firebase.auth().currentUser.uid).collection("want to read").onSnapshot(snapshot=>{
    setFuture(snapshot.size)
  }) 
  },[])
  
  

  return (
        
        <Screen style={styles.container}>
        <View style={styles.container1}>
        
        <ListItem
          title="Currently Reading"
          subTitle={current? current+ " books":<ActivityIndicator/>}
          onPress={() => navigation.navigate(routes.CURRENT_DETAILS)}
          IconComponent={<Icon iconColor="#a86cc1" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
        />
      </View>
      <View style={styles.container1}>
        <ListItem
          title="Want To Read"
          subTitle={future? future+ " books":<ActivityIndicator/>}
          onPress={() => navigation.navigate(routes.FUTURE_DETAILS)}
          IconComponent={<Icon iconColor="#98fb98" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
        />
      </View>
      <View style={styles.container1}>
        <ListItem
          
          title="Read"
          subTitle={past? past+ " books":<ActivityIndicator/>}
          onPress={() => navigation.navigate(routes.PAST_DETAILS)}
          IconComponent={<Icon iconColor="#7289DA" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
          
        />
      </View>


        </Screen>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        
        paddingTop:50,

    },
    container1:{
      paddingTop:30,
      
    }
    
})
export default LibraryScreen;