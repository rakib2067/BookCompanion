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
  const[load,setLoad]=useState(true);
  const[current,setCurrent]= useState([]);
  // function addedBook(doc){
  //   console.log(doc.data())
  // }
  // useEffect(() =>{
  //   let Result=[];
  //   firebase.firestore().collection("users")
  //   .doc(firebase.auth().currentUser.uid).collection("currently reading").get().then((snapshot)=>{
  //     snapshot.docs.forEach(doc =>{
  //       Result.push(doc.data())
  //     })
  //     setState(Result);
  //     setLoad(!load)
  //   })
  // },[])
  useEffect(()=>{
    //can call a separate function to get all books
    const subscriber=firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        console.log(change.doc.data())//This shows every chnage thats happening
        console.log(change.type)
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
        // if(change.type==="removed"){
        //   subscriber()
        //   console.log("removed")//If doc was removed this will log
        //   let update =[]
        //   firebase.firestore().collection("users")
        //   .doc(firebase.auth().currentUser.uid).collection("currently reading").get().then((snapshot)=>{
        //     snapshot.forEach((doc)=>{
        //       update.push(doc.data())
        //     })
        //      setCurrent(update)
        //   })
        // }
      }
      )
    })
    
  },[])
  useEffect(()=>{

  },[])
  const handleDelete= item =>{
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").doc(item.title).delete()
    .then(()=>{
      const subscriber=firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("currently reading").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()


    })
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