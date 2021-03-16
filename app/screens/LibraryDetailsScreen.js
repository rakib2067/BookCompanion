import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import AppPicker from '../components/Picker';
import * as firebase from 'firebase';
import routes from '../navigation/routes';
import { AirbnbRating } from 'react-native-ratings';
import AppTextInput from '../components/AppTextInput';
import ListItemSeparator from '../components/ListItemSeparator';
import ListDeleteAction from '../components/ListDeleteAction';

function LibraryDetailsScreen({route},{navigation}) {
    const [category, setCategory]=useState(0);
    const [storage, setStorage]=useState(0);
    const [rating,setRating]=useState();
    const [def,setDef]=useState();
    const[review,setReview]=useState({
        count:0
    });
    const[reviews,setReviews]=useState({
        results:[]
    });
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
        Alert.alert("This Book has changed libraries")
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
    const handleSubmit=()=>{
        let x=1
        firebase.firestore().collection("books").doc(title).collection("reviews").doc(user).set({
            review
        })
        setReview({count:x})
    }
    
    console.log(rating)
    useEffect(()=>{
        let Result=[]
        firebase.firestore().collection("books").doc(title).collection("reviews").onSnapshot((snapshot)=>{
            snapshot.docs.forEach(doc =>{
              Result.push(doc.data())
            })
            setReviews({results: Result});
          })

    },[review])
    //Everything under here is from messages screen
    const initialMessages= [
        {
            id:1,
            title:'T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1',
            description:'How are youHow are youHow are youHow are youHow are youHow are youHow are youHow are youHow are youHow are youHow are you',
            image: require('../assets/me.jpg')
        },
        {
            id:2,
            title:'T2',
            description:'D2',
            image: require('../assets/me.jpg')
        },
    ]
    const [number,setNumber]=useState();
    const [messages, setMessages]= useState(initialMessages);
    const [refreshing, setRefreshing]= useState(false);
    const handleDelete= message =>{
        //delete the message from messages
        setMessages(messages.filter((m) => m.id !== message.id));
    
    };
    console.log(review)
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
            <View style={styles.rating} >
            <AirbnbRating 
               count={5}
               defaultRating={def?def.rating:0}
               onFinishRating={rated => setRating(rated)}
            />
            </View>
            <ListItem title="Reviews" />
            <AppTextInput
            placeholder="Write a review"
            onSubmitEditing={handleSubmit}
            onChangeText={text => setReview(text)}
            />
            <FlatList 
            data={reviews.results}
            renderItem={({item}) => 
            <ListItem 
                // title={item.reviews}
                subTitle={item.review}
                
                numberOfLines={number? number: 2}
                onPress={()=>setNumber(10)}
                renderRightActions={()=>
                <ListDeleteAction onPress={()=>handleDelete(item)}/>}
            />}
        
            ItemSeparatorComponent={ListItemSeparator}
            
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
    rating:{
        
    }
  
    
})
export default LibraryDetailsScreen;