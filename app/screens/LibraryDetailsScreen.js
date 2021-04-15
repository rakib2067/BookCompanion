import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet, ScrollView, Alert, FlatList, ToastAndroid, Vibration } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import AppPicker from '../components/Picker';
import * as firebase from 'firebase';
import routes from '../navigation/routes';
import { AirbnbRating, Rating } from 'react-native-ratings';
import AppTextInput from '../components/AppTextInput';
import ListItemSeparator from '../components/ListItemSeparator';
import ListDeleteAction from '../components/ListDeleteAction';
import * as Analytics from 'expo-firebase-analytics';
import Card from '../components/Card';

function LibraryDetailsScreen({route,navigation}) {
    const [category, setCategory]=useState(0);//state for category
    const [storage, setStorage]=useState(0);
    const [average, setAverage]=useState(0);
    const[deleted,setDeleted]=useState(true)//state to handle review changes - delete/modify
    const [rating,setRating]=useState();//state for rating
    const [number,setNumber]=useState();// 
    const [def,setDef]=useState();//state for default rating
    const [name, setName]=useState();//state for current user
    const[review,setReview]=useState();//onChangetext
    const[reviews,setReviews]=useState([]);//reviews
    const [isRated,setIsRated]=useState(false);
    const[refresh,setRefresh]=useState(true);
    const[levelUp,setLevelup]=useState(true);
    const [progress,setProgress]=useState({
        exp:null,
        level:null,
        target:null,
        total:null
      })
    const item=route.params;
    const title=item.title;
    const author=item.author;
    const image= item.image
    const description=item.description
    const published= item.published
    const user=firebase.auth().currentUser.uid
    const categories=[
        {
            label: "want to read",
            value: 2,
          },
          {
            label: "currently reading",
            value: 1,
          },
          {
            label: "read",
            value: 3,
          },
    ]

    //Gets all initial points
    useEffect(()=>{
      firebase.firestore().collection("points")
      .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
        const Ref=doc.data();
        setProgress({
          exp:Ref.exp,
          level:Ref.level,
          target:Ref.target,
          total:Ref.total
        })
      })
  },[])
  //a useEffect to be called whenever the refresh state is triggered to get points
    useEffect(()=>{
      firebase.firestore().collection("points")
      .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
        const Ref=doc.data();
        setProgress({
          exp:Ref.exp,
          level:Ref.level,
          target:Ref.target,
          total:Ref.total
        })
        setLevelup(!levelUp)
      })
  },[refresh])
  //Use effect to check whether a user has levelled up
  useEffect(()=>{
    if(progress.level>1)
    {if(progress.exp>=progress.target){
      firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:0,
                  level:progress.level+1,
                  target:Math.round(progress.target*1.25),
                  total:Math.round(progress.total)
                },{merge:true}).then(setRefresh(!refresh))
                Vibration.vibrate()
                ToastAndroid.show('You leveled up to Level: '+(progress.level+1)+"!", ToastAndroid.LONG);
                //Now we test if this works levelling them up in real time
    }}
  },[levelUp])
  //checks for users exp and gives them a rating
  useEffect(()=>{
    if(progress.level==1&&progress.exp==40){
      Alert.alert("Give a rating")
    }
},[name])
//gets the initial rating
    useEffect(()=>{
        let Rate;
        const ratingRef=firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
        ratingRef.get().then((doc)=>{
            if(doc.exists){
                Rate=doc.data()
                setDef(Rate) 
                setIsRated(true)
            }
        })
    },[])
    //gets users info to use for submitting reviews
    useEffect(()=>{
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
        .then((doc)=>{
          setName(doc.data())
        })
    
      },[])
      //Used to post ratings 
    useEffect(()=>{
      //Upon clicking on the rating, setRating is called, wherein we check first if rating state exists, execute
        if(rating){
          //if there is already a default def will be filled otherwise we set def to the default rating, which will show 
          if(isRated==true){ //we want to check if there is already a default rating, otherwise we would like to pass on to the else statement
            setDef({rating:rating})
            const x=rating;
            firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
            .set({
                rating
            })
          }
          else{
            //now we set the value of the def.rating, so that it can be used to pass the rating to the firestore database 
            setDef({rating:rating})
            setIsRated(true)
            firebase.firestore().collection("books").doc(title).collection("ratings").doc(firebase.auth().currentUser.uid)
            .set({
                rating
            })
            //after this rating has been set we check for levels, so if a new user has rated, they get 10 exp, otherwise a regular user  gets 20 
              if(progress.level==1&&progress.exp==40){
                firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:progress.exp+10,
                  total:50
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations","You have received 10 exp, now write a review"
                );
              }
              else if(progress.level!==1){
                firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:progress.exp+20,
                  total:progress.total+20
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations","You have received 20 exp, now write a review"
                );
              }
          }
          Analytics.logEvent('Rating', {
            screen: 'Details Screen',
            purpose: 'User has given a rating',
          });
      } 
    },[rating])
    //used to change book from one library state to another 
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
        //If book already exists in one of the other libraries
        currentRef.get().then((doc)=>{
            if (doc.exists){
                setStorage({label:"currently reading", value:2})
            }
        })
        futureRef.get().then((doc)=>{
            if (doc.exists){
                setStorage({label:"want to read", value:1}) 
            }
        })
        pastRef.get().then((doc)=>{
            if (doc.exists){
                setStorage({label:"read", value:3})
            }
        })

        if(category)//when changing category
        {
          if(storage){
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid).collection(storage.label)
            .doc(title).delete().then(()=>{
                console.log("Document deleted")
                
            }).catch((e)=>{
                Alert.alert("Error removing document",e)
            })
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid).collection(category.label)
            .doc(title).set({
                  title,
                  author,
                  image,
                  published,
                  description
            })

            if(storage.label=="want to read")
            {if(category.label=="currently reading"){
              firebase.firestore().collection("points")
            .doc(firebase.auth().currentUser.uid).set({
              exp:progress.exp+10,
              total:progress.total+10
            },{merge:true}).then(setRefresh(!refresh))
            Alert.alert("Success","You have earned 10 exp")
            }
            else if(category.label=="want to read"){
              Alert.alert("Error","This book is already in the specified library")
            }
            else if(category.label=="read"){
            Alert.alert("Success","Book Has Changed Libraries")
            }
          }
          else if(storage.label=="currently reading"){
            if(category.label=="read"){
              firebase.firestore().collection("points")
            .doc(firebase.auth().currentUser.uid).set({
              exp:progress.exp+15,
              total:progress.total+15
            },{merge:true}).then(setRefresh(!refresh))
            Alert.alert("Success","You have earned 15 exp")
            }
            else if(category.label=="want to read"){
            Alert.alert("Success","Book Has Changed Libraries")
            }
            else if(category.label=="currently reading"){
            Alert.alert("Error","This book is already in the specified library")
            }
            
          }
          else if(storage.label=="read"){
            if(category.label=="read"){
            Alert.alert("Error","This book is already in the specified library")
            }
            else if(category.label=="want to read"){
            Alert.alert("Success","Book Has Changed Libraries")
            }
            else if(category.label=="currently reading"){
            Alert.alert("Success","Book Has Changed Libraries")
            }
            
          }
        }  
        }
      },[category])
//used to get the average rating
useEffect(()=>{
  const ratingRef=firebase.firestore().collection("books").doc(title).collection("ratings").onSnapshot(snapshot=>{
    const change=snapshot.docChanges()
    change.forEach((change)=>{
      if(change.type==="added"){
        let updateAdd=[]
        firebase.firestore().collection("books").doc(title).collection("ratings").get().then((snapshot)=>{
          snapshot.forEach((doc)=>{
            updateAdd.push(doc.data())
          })
          let avg=0
          let count=0
          updateAdd.forEach(rate=>{
            avg=avg+rate.rating
            count=count+1
          })
          console.log(count)
          setAverage((avg/count).toFixed(2))
        })
      }
      if(change.type==="modified"){
        let updateAdd=[]
        firebase.firestore().collection("books").doc(title).collection("ratings").get().then((snapshot)=>{
          snapshot.forEach((doc)=>{
            updateAdd.push(doc.data())
          })
          let avg=0
          let count=0
          updateAdd.forEach(rate=>{
            avg=avg+rate.rating
            count=count+1
          })
          console.log(count)
          setAverage((avg/count).toFixed(2))
        })
      }
    })
  })
})
//Reviews
//gets reviews in real time 
useEffect(()=>{
    //can call a live subscriber function to get all books
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
  const noReviews= ()=>{
    console.log(reviews.length)
    if(reviews.length===0){
      return <ListItem subTitle="No Reviews" chevron={false}/>
    }
    else if (reviews){
      return null
    }
  }
  //Delete useEffect live subscriber to delete books from the flatlist 
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
    //Handle submit to check first for gibberish, then for the length of the review text
    const handleSubmit=()=>{
       if(def!==undefined){ //first check if users entered gibberish
        const words = require("gibberish-detective")({useCache: false});
        words.set("useCache", true)
        var tester=words.detect(review)
        if(tester==false){
        const userName=name.name
        var userRating=def.rating
        var uid=firebase.auth().currentUser.uid
        if(!name.url){
            firebase.firestore().collection("books").doc(title).collection("reviews").doc(user).set({
            uid,
            userName,
            review,
            userRating
        })
        if(progress.level==1&&progress.exp==50){
          firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+10,
            total:60
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations", "you have received 10 exp, now delete your review"
          );
        }
        else if(progress.level!==1){
          if(review.length>100){
            firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+50,
            total:progress.total+50
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations" ,"you have received 50 exp"
          );
          }
          else if(review.length>50){
            firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+30,
            total:progress.total+30
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations", "you have received 30 exp"
          );
          }
          else if(review.length>25){
            firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+20,
            total:progress.total+20
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations","you have received 20 exp"
          );
          }else{
            firebase.firestore().collection("points")
            .doc(firebase.auth().currentUser.uid).set({
              exp:progress.exp+15,
              total:progress.total+15
            },{merge:true}).then(setRefresh(!refresh) )
            Alert.alert(
              "Congratulations", "you have received 15 exp"
            );

          }
        }
        setDeleted(!deleted)

        }
        
        else{
        var userRating=def.rating
        var storage=firebase.storage().ref(firebase.auth().currentUser.uid).getDownloadURL()
        .then((url)=>{
            firebase.firestore().collection("books").doc(title).collection("reviews").doc(user).set({
            uid,
            userName,
            review,
            url,
            userRating
        })
        if(progress.level==1&&progress.exp==50){
          firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+10,
            total:60
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations","you have received 10 exp, now delete your review"
          );
        }
        else if(progress.level!==1){
          if(review.length>100){
            firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+50,
            total:progress.total+50
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations", "you have received 50 exp"
          );
          }
          else if(review.length>50){
            firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+30,
            total:progress.total+30
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations", "you have received 30 exp"
          );
          }
          else if(review.length>25){
            firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).set({
            exp:progress.exp+20,
            total:progress.total+20
          },{merge:true}).then(setRefresh(!refresh) )
          Alert.alert(
            "Congratulations", "you have received 20 exp"
          );
          }else{
            firebase.firestore().collection("points")
            .doc(firebase.auth().currentUser.uid).set({
              exp:progress.exp+15,
              total:progress.total+15
            },{merge:true}).then(setRefresh(!refresh) )
            Alert.alert(
              "Congratulations", "you have received 15 exp"
            );

          }
        }
        Analytics.logEvent('Review', {
          screen: 'Details Screen',
          purpose: 'User has posted a review',
        });
        setDeleted(!deleted)
    })
    } }
    //in the case that the person enters gibberish 
    else{
      Alert.alert('Error','This Review is not valid')
    }}
    else{
      Alert.alert('Error','Cant submit review without rating first!')
    }
    }
    //event handler to delete the review frm the flatlist 
    const handleDelete= item =>{
        if(item.uid==firebase.auth().currentUser.uid){
        firebase.firestore().collection("books").doc(title).collection("reviews").doc(item.uid).delete()
        .then(()=>{
            setDeleted(!deleted)
            if(progress.level==1&&progress.exp==60){
              firebase.firestore().collection("points")
              .doc(firebase.auth().currentUser.uid).set({
                exp:progress.exp+10,
                total:70
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
            Alert.alert('Error: ',e)
        })}
        else{
            Alert.alert('Error','You do not have permission to remove this document')
        }
    };


    return (
        <ScrollView style={{backgroundColor:colors.light}}>
            <Image 
            style={styles.image}
            source={{uri: item.image}} />
            <View style={styles.detailsContainer}>
            <AppText style= {styles.title}>{item.title}</AppText>
            <AppText style={styles.author}>{item.author}</AppText>
            <View style={{justifyContent:"flex-start", alignItems:"flex-start", }}>
            <AppText style={styles.rating}>Average Rating: {average}/5</AppText>
            <Rating readonly={true} imageSize={30} startingValue={average} tintColor={colors.light}/> 
            </View>
            
            <View style={styles.listItem}>
            <Card backgroundColor={colors.white} 
              description
              title={item.description}
              numberOfLines={10}
              subTitle={"Published: "+item.published}

              />
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
            
            <AppTextInput
            backgroundColor={colors.white}
            placeholder="Write a review"
            onSubmitEditing={handleSubmit}
            onChangeText={text => setReview(text)}
            />
            <ListItem title="Reviews" chevron={false}/>
            <FlatList 
            data={reviews}
            renderItem={({item}) => 
            <ListItem 
                title={item.userName}
                subTitle={item.review}
                rating={item.userRating}
                image={{uri:item.url?item.url:"https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg"}}
                numberOfLines={number? number: 2}
                onPress={()=>setNumber(10)}
                renderRightActions={()=>
                <ListDeleteAction onPress={()=>handleDelete(item)}/>}
            />}       
            ItemSeparatorComponent={ListItemSeparator} 
        />
        {noReviews()}
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
    rating:{
        color:colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5
        
    },
    listItem:{
        marginVertical: 30
    },
    
  
    
})
export default LibraryDetailsScreen;