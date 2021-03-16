import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet, ScrollView, DatePickerAndroid } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import AppPicker from '../components/Picker';
import * as firebase from 'firebase';
import routes from '../navigation/routes';
import { AirbnbRating } from 'react-native-ratings';

function LibraryDetailsScreen({route},{navigation}) {
    const [category, setCategory]=useState(0);
    const [storage, setStorage]=useState(0);
    const [rating,setRating]=useState();
    const [def,setDef]=useState();
    const item=route.params;
    const title=item.title;
    const author=item.author;
    const image= item.image
    const user=firebase.auth().currentUser.uid
    const categories=[
        {
            label: "currently reading",
            value: 1,
          },
          {
            label: "want to read",
            value: 2,
          },
          {
            label: "read",
            value: 3,
          },
    ]
    useEffect(()=>{
        let Rate;
        const ratingRef=firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
        ratingRef.get().then((doc)=>{
            if(doc.exists){
                console.log("exists")
                Rate=doc.data()
                setDef(Rate)
                console.log("hello"+JSON.stringify(Rate))
                console.log("bye"+Rate)
            }
        })

    },[])
    useEffect(()=>{
        
        if(rating){
            const x=rating;
            firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
            .set({
                rating
            })
            
        } 

    },[rating])
    useEffect(() =>{
        const currentRef=firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid).collection("currently reading")
        .doc(title);
        const futureRef=firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid).collection("want to read")
        .doc(title);
        const pastRef=firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid).collection("read")
        .doc(title);
        
        currentRef.get().then((doc)=>{
            if (doc.exists){
                console.log("doc exists")
                setStorage({label:"currently reading", value:1})
            }
        })
        futureRef.get().then((doc)=>{
            if (doc.exists){
                console.log("doc exists")
                setStorage({label:"want to read", value:2})
            }
        })
        pastRef.get().then((doc)=>{
            if (doc.exists){
                console.log("doc exists")
                setStorage({label:"read", value:3})
            }
        })
    
        if(category)
        {
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid).collection(category.label)
        .doc(title).set({
              title,
              author,
              image
        })
        if(storage){
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid).collection(storage.label)
            .doc(title).delete().then(()=>{
                console.log("Document deleted")
                
            }).catch((e)=>{
                console.error("Error removing document"+e)
            })
        }
        }
      },[category])
  
    
    console.log(rating)

    return (
        <ScrollView>
            <Image 
            style={styles.image}
            source={{uri: item.image}} />
            <View style={styles.detailsContainer}>
            <AppText style= {styles.title}>{item.title}</AppText>
            <AppText style={styles.author}>{item.author}</AppText>
            <View style={styles.listItem}>
            <View styles={styles.iconContainer}>
            <AppPicker 
              selectedItem={category?category:storage}
              onSelectItem={item =>setCategory(item)}
              items={categories}
              icon="apps" 
              placeholder="Add To Library"/>
            <AirbnbRating
               count={5}
               defaultRating={def?def.rating:0}
               onFinishRating={rated => setRating(rated)}
            />
            
             </View>
             
             </View>
            </View>
            </ScrollView>
    );
}
const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 300,

    },
    detailsContainer:{
        padding: 20, 
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    author:{
        color: colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5
        
    },
    listItem:{
        marginVertical: 30
    },
  
    
})
export default LibraryDetailsScreen;