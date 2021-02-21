import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import axios from 'axios';

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppTextInput from "../components/AppTextInput";
import { FormField } from "../components/forms";
import { State } from "react-native-gesture-handler";

function ListingsScreen({navigation}) {
  const apiKey="AIzaSyAoTVNQJ8sweojgvXzz7TpZuCyJURTcgWA";
  const [state, setState]=useState({
    s: "Title/Author/ISBN",
    results:[],
    selected:{}

  });
  const apiURL="https://www.googleapis.com/books/v1/volumes?q="


  
  const search=()=>{
    axios.get(apiURL+state.s+"&key="+apiKey+"&maxResults=10")
    .then(({data})=>{
      let results=data.items;
      console.log(results);
      setState(prevState => {
        return {...prevState, results:results}
      })
    });


  }
  const searchCheck=(results)=>{
    results

  }
  
  
  return (
    <Screen style={styles.screen}>
    <AppTextInput 
      backgroundColor={"lightgrey"} 
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
    backgroundColor: colors.white,
  },
  input:{
    backgroundColor:"red",
    flex:1
  }
});

export default ListingsScreen;
