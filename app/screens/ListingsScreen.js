import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text , ToastAndroid, Vibration} from "react-native";
import axios from 'axios';

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppTextInput from "../components/AppTextInput";
import { FormField } from "../components/forms";
import { State } from "react-native-gesture-handler";
import * as firebase from 'firebase'
function ListingsScreen({navigation}) {
  const[refresh,setRefresh]=useState(true);
  const[levelUp,setLevelup]=useState(true);
  const [name,setName]=useState({
    exp:null,
    level:null,
    target:null,
    total:null
  })
  //initally gets points and sets it to the state variable
  useEffect(()=>{
    const subscriber=firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).onSnapshot((doc) => {
    
      setName(doc.data())
  })

  },[])
  //whenever refresh is triggered, refetches points and resets state variables 
  useEffect(()=>{
    firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
      const Ref=doc.data();
      setName({
        exp:Ref.exp,
        level:Ref.level,
        target:Ref.target,
        total:Ref.total
      })
      setLevelup(!levelUp)
    })
    //after adding points we set name here and want to trigger a function which will check levels
  },[refresh])
  useEffect(()=>{
    console.log(name)
    if(name.level>1)
    {if(name.exp>=name.target){
      firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:0,
                  level:name.level+1,
                  target:name.target*1.25,
                  total:name.total+name.target 
                },{merge:true}).then(setRefresh(!refresh))
                Vibration.vibrate()
                ToastAndroid.show('You leveled up to Level: '+(name.level+1)+"!", ToastAndroid.LONG);
                //Now we test if this works levelling them up in real time
    }}

  },[levelUp])
  //after the initial values have been loaded up, do stuff, based on users current values
  //Each time name is triggered, this effect will trigger  and sets refresh so that values are reset
  useEffect(()=>{
    if(name.level==1&&name.exp==0){
      firebase.firestore().collection("points")
      .doc(firebase.auth().currentUser.uid).set({
        exp:10
      },{merge:true}).then(setRefresh(!refresh))
      Alert.alert(
        "Congratulations",
        "You just earned 10 exp!",
        [
          { text: "Go to Account Screen", onPress: () => navigation.navigate(routes.ACCOUNT) }
        ]
      );
    }
    //if level is above 1
  },[name])
  const apiKey="AIzaSyAoTVNQJ8sweojgvXzz7TpZuCyJURTcgWA";
  const [state, setState]=useState({
    s: "",
    results:[],
    selected:{}

  });
  const apiURL="https://www.googleapis.com/books/v1/volumes?q="


  cleanData=(data)=>{
    const cleanedData=data.map((book)=>{
      if(book.volumeInfo.hasOwnProperty('publishedDate')=== false){
        book.volumeInfo['publishedDate']='0000';
      }
      else if(book.volumeInfo.hasOwnProperty('imageLinks')=== false){
        book.volumeInfo['imageLinks']={thumbnail:'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg'}
      }
      else if(book.volumeInfo.hasOwnProperty('authors')=== false){
        book.volumeInfo['authors']='Anonymous';
      }
      return book;
    })
      return cleanedData;
   }
  const search=()=>{
    axios.get(apiURL+state.s+"&key="+apiKey+"&maxResults=10")
    .then(({data})=>{
      if(name.level==1&&name.exp==20){
        Alert.alert('Congratulations You just gained 10 points')
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp+10
        },{merge:true}).then(setRefresh(!refresh))
      }
      else if(name.level!==1){
        Alert.alert('Congratulations You just gained 5 points')
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp+5,
          total:name.total+5
        },{merge:true}).then(setRefresh(!refresh))//this should check the exp and level 
      }
      let pre=data.items;
      results=cleanData(pre);
     
      setState(prevState => {
        return {...prevState, results:results}
      })
    });
  }

  
  return (
    <Screen style={styles.screen}>
    <AppTextInput 
      backgroundColor={"lightgrey"} 
      placeholder="Title/Author/ISBN"
      icon="magnify"  value={state.s} 
      onChangeText={text => setState(prevState =>{
        return{...prevState, s:text}
      })}
      onSubmitEditing={search} />  
      <FlatList
        data={state.results}
        renderItem={({ item }) => (
          <Card
            title={item.volumeInfo.title}
            subTitle={item.volumeInfo.authors}
            image={item.volumeInfo.imageLinks.thumbnail}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            backgroundColor={colors.light}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.medium,
  },
  input:{
    backgroundColor:"red",
    flex:1
  }
});

export default ListingsScreen;
