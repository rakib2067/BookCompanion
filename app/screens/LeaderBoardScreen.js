import React,{useState,useEffect}from 'react';
import { Text,StyleSheet} from 'react-native';
import * as firebase from 'firebase'
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import Leaderboard from '../components/LeaderBoard';
function LeaderBoardScreen(props) {
    const[data,setData]=useState([])
    const[state,setState]=useState('total')
    useEffect(()=>{
        //can call a separate function to get all books
        const subscriber=firebase.firestore().collection("points")
        .onSnapshot(snapshot=>{
          const change=snapshot.docChanges()
          change.forEach((change)=>{
            if(change.type==="added"){//checks if any reviews were added into the db, loads all reviews
              let updateAdd =[]
              firebase.firestore().collection("points")
              .get().then((snapshot)=>{
                snapshot.forEach((doc)=>{
                  updateAdd.push(doc.data())
                })
                 setData(updateAdd)
              })
            }
            else if(change.type==="modified"){
            console.log("modified")//If doc was modified this will log
            let update =[]
            firebase.firestore().collection("points")
            .get().then((snapshot)=>{
              snapshot.forEach((doc)=>{
                update.push(doc.data())
              })
               setData(update)
            })
          }
          }
          )
        })
      },[])
      const handlePress= ()=>{
        if(state=="total"){
          setState('level')
        }
        else{
          setState("total")
        }

      }
    return (
        
        <Screen style={styles.container}>
        <ListItem title="Leaderboards" onPress={handlePress}/>
        <Leaderboard
        data={data}
        sortBy={state}
        labelBy='name'
        icon='url' />
        </Screen>
        
    );
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.light
  }
})
export default LeaderBoardScreen;