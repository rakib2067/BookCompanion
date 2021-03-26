import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet, ScrollView, FlatList, Alert, Text, ToastAndroid, Vibration } from 'react-native';
import AppText from '../components/AppText'
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
import Icon from '../components/Icon';
import * as firebase from 'firebase';
import AppPicker from '../components/Picker';
import ListDeleteAction from '../components/ListDeleteAction';
import { ListItemSeparator } from '../components/lists';
import routes from '../navigation/routes';
import { Rating } from 'react-native-ratings';
function ListDetailsScreen({route,navigation}) {
    const [category, setCategory]=useState(0);
    const [storage, setStorage]=useState(0);
    const [number,setNumber]=useState();
    const [average,setAverage]=useState(0);
    const[reviews,setReviews]=useState();
    const[levelUp,setLevelup]=useState(true);
    const[refresh,setRefresh]=useState(true);
    const [name,setName]=useState({
        exp:null,
        level:null,
        target:null,
        total:null
      })
  // initially fetch all points from the db 
  useEffect(()=>{
      firebase.firestore().collection("points")
      .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
        const Ref=doc.data();
        setName({
          exp:Ref.exp,
          level:Ref.level,
          target:Ref.target,
          total:Ref.total
        })
      })
  },[])
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
        if(change.type=="modified"){
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
  useEffect(()=>{
      if(name.level==1&&name.exp==30){
        Alert.alert("Nice","Add the book to your library")
      }
  },[name])
  //triggers on refresh
      useEffect(()=>{
        firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
          const Ref=doc.data();
          setName({
            exp:Ref.exp,
            level:Ref.level,
            target:Ref.target,
            total:Ref.total
          })
          setLevelup(!levelUp)
        })
    
      },[refresh])
      useEffect(()=>{
        if(name.level>1)
        {if(name.exp>=name.target){
          firebase.firestore().collection("points")
                    .doc(firebase.auth().currentUser.uid).set({
                      exp:0,
                      level:name.level+1,
                      target:Math.round(name.target*1.25),
                      total:Math.round(name.total+name.target)
                    },{merge:true}).then(setRefresh(!refresh))
                    Vibration.vibrate()
                    ToastAndroid.show('You leveled up to Level: '+(name.level+1)+"!", ToastAndroid.LONG);
                    //Now we test if this works levelling them up in real time
        }}
    
      },[levelUp])
    const item=route.params;
    const title=item.volumeInfo.title;
    const author=item.volumeInfo.authors;
    const image= item.volumeInfo.imageLinks.thumbnail
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
          if(change.type==="modified"){//checks if any reviews were added into the db, loads all reviews
            let updateAdd =[]
            firebase.firestore().collection("books")
            .doc(title).collection("reviews").get().then((snapshot)=>{
              snapshot.forEach((doc)=>{
                updateAdd.push(doc.data())
              })
               setReviews(updateAdd)
            })
          }
          if(change.type==="removed"){//checks if any reviews were added into the db, loads all reviews
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
                setStorage({label:"currently reading", value:1})
                if(name.level==1 && name.exp==30){
                firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:name.exp+10
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations",
                  "You just earned 10 exp!",
                  [
                    { text: "go to library", onPress: () => navigation.navigate(routes.LIBRARY_SCREEN)}
                  ]
                );
                }
             
            }
        })
        futureRef.get().then((doc)=>{
            if (doc.exists){
                setStorage({label:"want to read", value:2})
                if(name.level==1 && name.exp==30){
                  firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:name.exp+10
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations",
                  "You just earned 10 exp!",
                  [
                    { text: "go to library", onPress: () => navigation.navigate(routes.LIBRARY_SCREEN)}
                  ]
                );
                }
           
            }
        })
        pastRef.get().then((doc)=>{
            if (doc.exists){
                setStorage({label:"read", value:3})
                if(name.level==1 && name.exp==30){
                  firebase.firestore().collection("points")
                .doc(firebase.auth().currentUser.uid).set({
                  exp:name.exp+10
                },{merge:true}).then(setRefresh(!refresh) )
                Alert.alert(
                  "Congratulations",
                  "You just earned 10 exp!",
                  [
                    { text: "go to library", onPress: () => navigation.navigate(routes.LIBRARY_SCREEN)}
                  ]
                );
                }        
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
        firebase.firestore().collection("books").doc(item.volumeInfo.title)
        .set({
        
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
        if(name.level==1){
            Alert.alert('Congratulations', 'You just gained 10 points. Now go to your library')
            firebase.firestore().collection("points")
            .doc(firebase.auth().currentUser.uid).set({
              exp:name.exp+10
            },{merge:true}).then(setRefresh(!refresh))
          }
          else if(name.level!==1){
            Alert.alert('Congratulations You just gained 10 points. Now go to your library')
            firebase.firestore().collection("points")
            .doc(firebase.auth().currentUser.uid).set({
              exp:name.exp+10,
              total:name.total+10
            },{merge:true}).then(setRefresh(!refresh))

          }
        }
      },[category])
    return (
        <ScrollView style={styles.container}>
            <Image 
            style={styles.image}
            source={{uri: item.volumeInfo.imageLinks.thumbnail}} />
            <View style={styles.detailsContainer}>
            <AppText style= {styles.title}>{item.volumeInfo.title}</AppText>
            <AppText style={styles.author}>{item.volumeInfo.authors}</AppText>
            <View style={{justifyContent:"flex-start", alignItems:"flex-start"}}>
            <AppText style={styles.rating}>Average Rating: {average}/5</AppText>
            <Rating  readonly={true} imageSize={30} startingValue={average} tintColor={colors.light}/></View>
            <View style={styles.listItem}>
            <View styles={styles.iconContainer}>
      
              <AppPicker 
              selectedItem={category?category:storage}
              onSelectItem={item =>setCategory(item)}
              items={categories}
              icon="apps" 
              placeholder="Add To Library"/>
              <ListItem title="Reviews" chevron={false}/>
            <FlatList 
            data={reviews}
            renderItem={({item}) => 
            <ListItem
                title={item.userName}
                subTitle={item.review}
                image={{uri:item.url}}
                numberOfLines={number? number: 2}
                onPress={()=>setNumber(10)}
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
    rating:{
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5
        
    },
    listItem:{
        marginVertical: 30
    },
  
    
})
export default ListDetailsScreen;