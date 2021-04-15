import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Screen from "../components/Screen";
import * as firebase from 'firebase';
import routes from "../navigation/routes";
import Card from "../components/Card";
import CardDeleteAction from "../components/CardDeleteAction";
function DiscoverScreen({navigation}) {
    const [discover,setDiscover]=useState([]);
    useEffect(()=>{
        //can call a separate function to get all books
        const subscriber=firebase.firestore().collection("books").onSnapshot(snapshot=>{
          const change=snapshot.docChanges()
          change.forEach((change)=>{
            if(change.type==="added"){//checks if any books were added into the db
              let updateAdd =[]
              firebase.firestore().collection("books").get().then((snapshot)=>{
                snapshot.forEach((doc)=>{
                  updateAdd.push(doc.data())
                })
                 setDiscover(updateAdd)
              })
            }
            else if(change.type==="removed"){
                subscriber()
                console.log("removed")//If doc was removed this will log
                let update =[]
                firebase.firestore().collection("books")
                .get().then((snapshot)=>{
                  snapshot.forEach((doc)=>{
                    update.push(doc.data())
                  })
                   setDiscover(update)
                })
              }
          }     
          )
        })
      },[])

    
    return (
        <Screen style={{padding:10}}>
         <FlatList
        data={discover}
        renderItem={({item}) => (
          <Card
            title={item.title}
            subTitle={item.author}
            image={item.image}
            onPress={() => navigation.navigate(routes.DISCOVER_DETAILS, item)}
            backgroundColor={colors.light}
          />
        )}
      />
            

        </Screen>
    );
}
const styles = StyleSheet.create({
    
})

export default DiscoverScreen;