import React,{useState,useEffect} from "react";
import { View, Image, StyleSheet,FlatList, Alert } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";
import * as firebase from 'firebase';
import routes from "../navigation/routes";
import Card from "../components/Card";
import CardDeleteAction from "../components/CardDeleteAction";

function CurrentDetailsScreen({navigation}) {
  const[deleted,setDeleted]=useState(true)
  const[current,setCurrent]= useState([]);

  useEffect(()=>{
    //can call a separate function to get all books
    const subscriber=firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        if(change.type==="added"){//checks if any books were added into the db
          let updateAdd =[]
          firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid).collection("currently reading").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              updateAdd.push(doc.data())
            })
             setCurrent(updateAdd)
          })
        }
      }
      
      )
    })
    
  },[])
  useEffect(()=>{
    const subscriber=firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        if(change.type==="removed"){
          subscriber()
          console.log("removed")//If doc was removed this will log
          let update =[]
          firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid).collection("currently reading").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              update.push(doc.data())
            })
             setCurrent(update)
          })
        }
      })
    })

  },[deleted])
  const handleDelete= item =>{
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").doc(item.title).delete()
    .then(()=>{
      setDeleted(!deleted)
      Alert.alert('Removed from library')
    }).catch((e)=>{
      Alert.alert('Error:' + e)
    })
  }
    return (
      <Screen > 
        <FlatList
        data={current}
        renderItem={({item}) => (
          <Card
            title={item.title}
            subTitle={item.author}
            renderRightActions={()=>
                <CardDeleteAction onPress={()=>handleDelete(item)}/>}
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