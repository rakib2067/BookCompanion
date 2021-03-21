import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet, ScrollView, Alert, FlatList, ToastAndroid } from 'react-native';
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

function LibraryDetailsScreen({route,navigation}) {
    const [category, setCategory]=useState(0);//state for category
    const [storage, setStorage]=useState(0);
    const[deleted,setDeleted]=useState(true)//state to handle review changes - delete/modify
    const [rating,setRating]=useState();//state for rating
    const [number,setNumber]=useState();// 
    const [def,setDef]=useState();//state for default rating
    const [name, setName]=useState();//state for current user
    const[review,setReview]=useState();//onChangetext
    const[reviews,setReviews]=useState([]);//reviews
    const[refresh,setRefresh]=useState(true);
    const[levelUp,setLevelup]=useState(true);
    const [progress,setProgress]=useState({
        exp:null,
        level:null,
        target:null
      })
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
      firebase.firestore().collection("points")
      .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
        const Ref=doc.data();
        setProgress({
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
        setProgress({
          exp:Ref.exp,
          level:Ref.level,
          target:Ref.target
        })
        setLevelup(!levelUp)
      })
  },[refresh])
  useEffect(()=>{
    if(progress.level>1)
    {if(progress.exp>=progress.target){
      firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:0,
                  level:progress.level+1,
                  target:progress.target*1.25
                },{merge:true}).then(setRefresh(!refresh))
                ToastAndroid.show('You leveled up to Level: '+(progress.level+1)+"!", ToastAndroid.LONG);
                //Now we test if this works levelling them up in real time
    }}
  },[levelUp])
  useEffect(()=>{
    if(progress.level==1&&progress.exp==40){
      Alert.alert("Give a rating")
    }
},[name])
    useEffect(()=>{
        let Rate;
        const ratingRef=firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
        ratingRef.get().then((doc)=>{
            if(doc.exists){
                Rate=doc.data()
                setDef(Rate)  
            }
        })
    },[])
    useEffect(()=>{
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
        .then((doc)=>{
          setName(doc.data())
        })
    
      },[])
    useEffect(()=>{
        if(rating){
            const x=rating;
            firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
            .set({
                rating
            })
              if(progress.level==1&&progress.exp==40){
                firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:progress.exp+10
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations you have received 10 exp, now write a review"
                );
              }
              else if(progress.level!==1){
                firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:progress.exp+20
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations you have received 20 exp"
                );
              }
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

//Reviews
//gets reviews
useEffect(()=>{
    //can call a separate function to get all books
    const subscriber=firebase.firestore().collection("books")
    .doc(title).collection("reviews").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        if(change.type==="added"){//checks if any reviews were added into the db, loads all reviews
          let updateAdd =[]
          firebase.firestore().collection("books")
          .doc(title).collection("reviews").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              updateAdd.push(doc.data())
            })
             setReviews(updateAdd)
          })
        }
      }
      )
    })
  },[])
  //Delete useEffect
  useEffect(()=>{
    const subscriber=firebase.firestore().collection("books")
    .doc(title).collection("reviews").onSnapshot(snapshot=>{
      const change=snapshot.docChanges()
      change.forEach((change)=>{
        if(change.type==="removed"){
          subscriber()
          console.log("removed")//If doc was removed this will log
          let update =[]
          firebase.firestore().collection("books")
          .doc(title).collection("reviews").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              update.push(doc.data())
            })
             setReviews(update)
          })
        }
        else if(change.type==="modified"){
            subscriber()
          console.log("modified")//If doc was modified this will log
          let update =[]
          firebase.firestore().collection("books")
          .doc(title).collection("reviews").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
              update.push(doc.data())
            })
             setReviews(update)
          })
        }
      })
    })
  },[deleted])
    //Event handlers
    const handleSubmit=()=>{
        //first check if users
        const userName=name.name
        var uid=firebase.auth().currentUser.uid
        if(!name.url){
            firebase.firestore().collection("books").doc(title).collection("reviews").doc(user).set({
            uid,
            userName,
            review,
        })
        if(progress.level==1&&progress.exp==50){
          firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+10
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations you have received 10 exp, now delete your review"
          );
        }
        setDeleted(!deleted)

        }
        
        else{
        var storage=firebase.storage().ref(firebase.auth().currentUser.uid).getDownloadURL()
        .then((url)=>{
            firebase.firestore().collection("books").doc(title).collection("reviews").doc(user).set({
            uid,
            userName,
            review,
            url
        })
        if(progress.level==1&&progress.exp==50){
          firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+10
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations you have received 10 exp, now delete your review"
          );
        }
        setDeleted(!deleted)
    })
    } 
    }
    const handleDelete= item =>{
        if(item.uid==firebase.auth().currentUser.uid){
        firebase.firestore().collection("books").doc(title).collection("reviews").doc(item.uid).delete()
        .then(()=>{
            setDeleted(!deleted)
            if(progress.level==1&&progress.exp==60){
              firebase.firestore().collection("points")
              .doc(firebase.auth().currentUser.uid).set({
                exp:progress.exp+10
              },{merge:true}).then(setRefresh(!refresh) )
              Alert.alert(
                "Congratulations",
                "You just earned 10 exp!",
                [
                  { text: "go to library", onPress: () => navigation.navigate(routes.LIBRARY_SCREEN)}
                ]
              );
            }
        }).catch((e)=>{
            Alert.alert('Error: '+e)
        })}
        else{
            Alert.alert('You do not have permission to remove this document')
        }
    };


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
            data={reviews}
            renderItem={({item}) => 
            <ListItem 
                title={item.userName}
                subTitle={item.review}
                image={{uri:item.url?item.url:"https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg"}}
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