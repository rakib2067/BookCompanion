import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import AppPicker from '../components/Picker';
import * as firebase from 'firebase';
function LibraryDetailsScreen({route}) {
    const [category, setCategory]=useState(0);
    const [storage, setStorage]=useState(0);
    const item=route.params;
    const title=item.title;
    const author=item.authors;
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
   
    const handleClick= ()=>{
    firebase.firestore().collection("books")
      .doc(item.volumeInfo.title)
      .set({
          title,
          author,
          image
      })
    
    firebase.firestore().collection("users")
      .doc(user).collection("currently reading")
      .doc(title).set({
            title,
            author,
            image

      })
    
    
       
    }
    
 
    return (
        <Screen>
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
            
             </View>
             
             </View>
            </View>
        </Screen>
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