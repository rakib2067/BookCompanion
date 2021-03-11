import React, { useState } from 'react';
import { StyleSheet,View} from 'react-native';
import Icon from '../components/Icon';
import { ListItem } from "../components/lists";
import Screen from '../components/Screen';
import colors from '../config/colors';
import * as firebase from 'firebase';
import routes from '../navigation/routes';

function LibraryScreen({navigation}) {
  
  const user=firebase.auth().currentUser.uid;
  const [count,setCount]=useState();
  var x = []
  const current= firebase.firestore().collection("users")
  .doc(user).collection("currently").get().then((querySnapshot)=>{
    setCount(querySnapshot.size)
  })

  return (
        
        <Screen style={styles.container}>
        <View style={styles.container1}>
        
        <ListItem
          title="Currently Reading"
          subTitle={count? count+ " books":" books"}
          onPress={() => navigation.navigate(routes.CURRENT_DETAILS)}
          IconComponent={<Icon iconColor="#a86cc1" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
        />
      </View>
      <View style={styles.container1}>
        <ListItem
          title="Want To Read"
          subTitle="0 Books"
          onPress={()=>{console.log("hello")}}
          IconComponent={<Icon iconColor="#98fb98" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
        />
      </View>
      <View style={styles.container1}>
        <ListItem
          
          title="Read"
          subTitle="0 Books"
          onPress={()=>{console.log("hello")}}
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