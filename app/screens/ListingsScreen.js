import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text , ToastAndroid, Vibration, Image,View, ActivityIndicator} from "react-native";
import axios from 'axios';

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppTextInput from "../components/AppTextInput";
import { FormField } from "../components/forms";
import { State } from "react-native-gesture-handler";
import * as firebase from 'firebase'
import * as Progress from 'react-native-progress'
import ListItem from "../components/ListItem";
import AppText from "../components/Text";
function ListingsScreen({navigation}) {
  const[refresh,setRefresh]=useState(true);
  const[levelUp,setLevelup]=useState(true);
  const[other,setOther]=useState({
    name:null,
    url:null
  });
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
      let data=doc.data()
      setOther({name: data.name,
                url:data.url})
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
                  target:Math.round(name.target*1.25),
                  total:Math.round(name.total)
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
        exp:10,
        total:10
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

      if(book.hasOwnProperty('volumeInfo')){
        console.log(book)

      }
      if(book.volumeInfo.hasOwnProperty('publishedDate')=== false){
        book.volumeInfo['publishedDate']='0000';
      }
      else if(book.volumeInfo.hasOwnProperty('imageLinks')=== false){
        book.volumeInfo['imageLinks']={thumbnail:'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg'}
      }
      else if(book.volumeInfo.hasOwnProperty('authors')=== false){
        book.volumeInfo['authors']='Anonymous';
      }
      else if(book.volumeInfo.hasOwnProperty('description')=== false){
        book.volumeInfo['description']='Currently Not Available';
      }
      else if(book.volumeInfo.description=== undefined){
        book.volumeInfo['description']='Currently Not Available';
      }
      else if(book.volumeInfo['description']=== undefined){
        book.volumeInfo['description']='Currently Not Available';
      }
      else if(book.volumeInfo['description']=== false){
        book.volumeInfo['description']='Currently Not Available';
      }
      else if(book.volumeInfo['description']=== null){
        book.volumeInfo['description']='Currently Not Available';
      }
      else if(book.volumeInfo.hasOwnProperty('publishedDate')=== false){
        book.volumeInfo['publishedDate']='Currently Not Available';
      }
      return book;
    })
      return cleanedData;
   }
  const search=()=>{
    axios.get(apiURL+state.s+"&key="+apiKey+"&maxResults=10")
    .then(({data})=>{
      if(name.level==1&&name.exp==20){
        Alert.alert('Congratulations', 'You just gained 10 points')
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp+10,
          total: 30
        },{merge:true}).then(setRefresh(!refresh))
      }
      else if(name.level!==1){
        Alert.alert('Congratulations', 'You just gained 5 points')
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp+5,
          total:name.total+5
        },{merge:true}).then(setRefresh(!refresh))//this should check the exp and level 
      }
      let pre=data.items;
      results=cleanData(pre);//Function to clean the data
      
      setState(prevState => {
        return {...prevState, results:results}
      })
    }).catch((error)=>{
      Alert.alert("Error","There was an error with your search. Please try again")
      if(level==1){
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp-10,
          total:name.total-10
        },{merge:true}).then(setRefresh(!refresh))    
      }
      else{
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp-5,
          total:name.total-5
        },{merge:true}).then(setRefresh(!refresh))
      }
    })
  }

  
  return (
    <Screen style={styles.screen}>
        <View style={styles.container}>
        <Image style={styles.image}
        source={{uri:other.url}}/>
        <View style={styles.textContainer}>
        <AppText style= {styles.title} numberOfLines={1}>{other.name}</AppText>
        <Progress.Bar color={colors.primary} indeterminate={name.exp!==null?false:true} progress={name.exp/name.target}/>
        <AppText style= {styles.subTitle}>{name.exp+"/"+name.target}</AppText>
        </View>
        <AppText style={{width: 35,
        height: 25,
        borderRadius: 25,
        backgroundColor:colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',}}>{name.level}</AppText>
        </View>
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
            subTitle={item.volumeInfo.description}
            image={item.volumeInfo.imageLinks.thumbnail}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            backgroundColor={colors.white}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
  input:{
    backgroundColor:"red",
    flex:1
  },
  container:{
    alignItems: "center",
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius:25
},
image:{
    borderRadius: 35,
    height: 70,
    width: 70,
    borderRadius: 35,
    

},
title:{
    fontWeight: "bold",


},
textContainer:{
    marginLeft: 10,
    justifyContent: "center",
    flex:1

},
subTitle:{
    color: colors.medium

}
});

export default ListingsScreen;
