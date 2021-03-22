import React,{useState,useEffect} from "react";
import { View, Image, StyleSheet,FlatList, Alert,ToastAndroid, Vibration } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";
import * as firebase from 'firebase';
import routes from "../navigation/routes";
import Card from "../components/Card";
import CardDeleteAction from "../components/CardDeleteAction";

function FutureDetailsScreen({navigation}) {
  const[deleted,setDeleted]=useState(true)
  const[future,setFuture]= useState([]);
  const[refresh,setRefresh]=useState(true);
  const[increase,setIncrease]=useState(true);
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
        setIncrease(!increase)
      })
    },[refresh])
    useEffect(()=>{
      if(name.level==1&&name.exp==name.target){
        firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:0,
                  level:2,
                  target:100,
                  total:100
                },{merge:true}).then(setRefresh(!refresh))
                Vibration.vibrate()
                ToastAndroid.show('You leveled up to Level 2!', ToastAndroid.LONG);
      }
    },[increase])
    useEffect(()=>{
      if(name.level==1&&name.exp==70){
        Alert.alert("Delete the book from your library")
      }
  },[name])

  useEffect(()=>{
    //can call a separate function to get all books
    const subscriber=firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("want to read").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        if(change.type==="added"){//checks if any books were added into the db
          let updateAdd =[]
          firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid).collection("want to read").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              updateAdd.push(doc.data())
            })
             setFuture(updateAdd)
          })
        }
      }
      
      )
    })
    
  },[])
  useEffect(()=>{
    const subscriber=firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("want to read").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        if(change.type==="removed"){
          subscriber()
          console.log("removed")//If doc was removed this will log
          let update =[]
          firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid).collection("want to read").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              update.push(doc.data())
            })
             setFuture(update)
          })
        }
      })
    })

  },[deleted])
  const handleDelete= item =>{
    firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).collection("want to read").doc(item.title).delete()
    .then(()=>{
      setDeleted(!deleted)
      if(name.level==1 && name.exp==70){
        firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:name.exp+10
                },{merge:true})
                setRefresh(!refresh)
                Alert.alert("Congratulations, You just earned 10xp!")
        }
        else{
          Alert.alert('Removed from library')
        }
    }).catch((e)=>{
      Alert.alert('Error:' + e)
    })
  }
    return (
      <Screen > 
        <FlatList
        data={future}
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

export default FutureDetailsScreen;