import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
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
  const [name,setName]=useState({
    exp:null,
    level:null,
    target:null
  })
  useEffect(()=>{
    firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
      const Ref=doc.data();
      setName({
        exp:Ref.exp,
        level:Ref.level,
        target:Ref.target
      })
    })

  },[])
  useEffect(()=>{
    firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
      const Ref=doc.data();
      setName({
        exp:Ref.exp,
        level:Ref.level,
        target:Ref.target
      })
    })

  },[refresh])
  useEffect(()=>{
    if(name.level==1&&name.exp==0){
      Alert.alert('Congratulations You just gained 10 points. Now Search for a book')
      firebase.firestore().collection("points")
      .doc(firebase.auth().currentUser.uid).set({
        exp:10
      },{merge:true}).then(setRefresh(!refresh))
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
        console.log(volumeInfo.imageLinks.thumbnail)
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
      let pre=data.items;
      results=cleanData(pre);
      if(name.level==1){
        Alert.alert('Congratulations You just gained 10 points. Now Add a book to your library')
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp+10
        },{merge:true}).then(setRefresh(!refresh))
      }
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
