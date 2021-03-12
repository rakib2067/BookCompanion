import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import * as firebase from 'firebase';
function LibraryDetailsScreen({route}) {
    
    const item=route.params;
    // const title=item.volumeInfo.title;
    // const author=item.volumeInfo.authors;
    // const image= item.volumeInfo.imageLinks.thumbnail
    const user=firebase.auth().currentUser.uid
    const handleClick= ()=>{
    // firebase.firestore().collection("books")
    //   .doc(item.volumeInfo.title)
    //   .set({
    //       title,
    //       author,
    //       image
    //   })
    
    // firebase.firestore().collection("users")
    //   .doc(user).collection("currently")
    //   .doc(title).set({
    //         title,
    //         author,
    //         image

    //   })
       
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
            <ListItem
               title="Add to Read"
               onPress={handleClick}
               IconComponent={<Icon iconColor="#a86cc1" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
             />
             <ListItem
               title="Delete"
               onPress={handleClick}
               IconComponent={<Icon iconColor="#a86cc1" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
             />
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