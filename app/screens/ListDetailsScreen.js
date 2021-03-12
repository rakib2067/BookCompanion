import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import * as firebase from 'firebase';
import AppPicker from '../components/Picker';
function ListDetailsScreen({route}) {
    const [category, setCategory]=useState(0);
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
    
        if(category!=0){
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid).collection(category.label)
        .doc(title).set({
              title,
              author,
              image
  
        })}
        
      },[])
    const item=route.params;
    const title=item.volumeInfo.title;
    const author=item.volumeInfo.authors;
    const image= item.volumeInfo.imageLinks.thumbnail
    const user=firebase.auth().currentUser.uid
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
        <ScrollView style={styles.container}>
        
            <Image 
            style={styles.image}
            source={{uri: item.volumeInfo.imageLinks.thumbnail}} />
            <View style={styles.detailsContainer}>
            <AppText style= {styles.title}>{item.volumeInfo.title}</AppText>
            <AppText style={styles.author}>{item.volumeInfo.authors}</AppText>
            <View style={styles.listItem}>
            <View styles={styles.iconContainer}>
            <ListItem
               title="Add to Library"
               onPress={handleClick}
               IconComponent={<Icon iconColor="#a86cc1" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
             />
              <AppPicker 
              selectedItem={category}
              onSelectItem={item =>setCategory(item)}
              items={categories}
              icon="apps" 
              placeholder="Add To Library"/>
            
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
    container:{
        backgroundColor: colors.light
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
export default ListDetailsScreen;