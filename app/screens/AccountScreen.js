import React,{useContext,useEffect,useState} from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, Alert } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";

import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants'
import { Colors } from "react-native/Libraries/NewAppScreen";
import { set } from "react-native-reanimated";
const menuItems = [
  {
    title: "My Library",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: "#02ced1",
    },
    targetScreen:routes.LIBRARY_SCREEN
  },
  {
    title: "Leaderboards",
    icon: {
      name: "view-list",
      backgroundColor: colors.secondary,
    },
    targetScreen:routes.LEADERBOARDS,
  },
];

function AccountScreen({navigation}) {
  
  const[state,setState]=useState();
  const[image,setImage]=useState(null);
  const[close,setClose]=useState(0)
  const[refresh,setRefresh]=useState(true);
  const [name,setName]=useState({
    exp:null,
    level:null,
    target:null
  })
  //iniital useEffect fetches all the users points 
  useEffect(()=>{
    firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
      const Ref=doc.data();
      setName({
        exp:Ref.exp,
        level:Ref.level,
        target:Ref.target
      })
    })

  },[])
  //refreshes points values whenever something happens 
  useEffect(()=>{
    firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
      const Ref=doc.data();
      setName({
        exp:Ref.exp,
        level:Ref.level,
        target:Ref.target
      })
    })

  },[refresh])
  
  useEffect(()=>{
    var storage=firebase.storage().ref(firebase.auth().currentUser.uid).getDownloadURL()
    .then((url)=>{
      setImage(url)
      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
        url
      },{merge:true}).catch((error)=>{
        console.log("error")
      })
      firebase.firestore().collection("points").doc(firebase.auth().currentUser.uid).set({
        url:url
      },{merge:true})
    }).catch((error)=>{
      Alert.alert("upload a profile picture")
      setImage(null)
      
    })
  },[close])
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Error','Sorry, we need camera roll permissions to make this work!');
        }
        else{
          firebase.firestore().collection("points")
          .doc(firebase.auth().currentUser.uid).get().then((doc)=>{
          const Ref=doc.data();
          if(Ref.level==1){
            Alert.alert("Notice","Upload a profile picture")
          }
        })
        }
      }
    })();
  }, []);
  const deleteProfile= ()=>{
    var profdel=firebase.storage().ref(firebase.auth().currentUser.uid).delete()
    .then(()=>{
      Alert.alert("Success",'File succesfully deleted')
      setClose(close+1)
    }).catch((error)=>{
      Alert.alert("Error","Can't delete an empty profile pic 😦")
    })
    
  }
  //Changing and deleting profile pic
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result.uri,firebase.auth().currentUser.uid)
      .then(()=>{
        setClose(close+1)
        if(name.level==1 && name.exp==10){
          firebase.firestore().collection("points")
        .doc(firebase.auth().currentUser.uid).set({
          exp:name.exp+10,
          total:20
        },{merge:true}).then(setRefresh(!refresh) )
        Alert.alert(
          "Congratulations",
          "You just earned 10 exp!",
          [
            { text: "Search for a book", onPress: () => navigation.navigate(routes.LISTINGS) }
          ]
        );
        }
        else{
          Alert.alert("Success","Profile Picture uploaded")
        }
      })
      .catch((error)=>{
        Alert.alert("Error",error)

      })
    }
  };
  useEffect(()=>{
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
    .then((doc)=>{
      setState(doc.data())
    })

  },[])
  const uploadImage=async(uri,imageName)=>{
    const response = await fetch(uri);
    const blob= await response.blob()
    var ref=firebase.storage().ref().child(imageName)
    return ref.put(blob)
  }
  const{user, setUser}= useContext(AuthContext);
  const handleLogOut =() =>{
    firebase.auth().signOut().then(() => {
      setUser(null)
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={state?state.name:<ActivityIndicator animating/>}
          subTitle={state?state.email:<ActivityIndicator animating/>}
          image={{uri:image}}
          activity
          onPress={pickImage}
        />
      </View>
      <View style={styles.container}>
        <ListItem title="Delete Profile Pic" onPress={deleteProfile} IconComponent={<Icon name="delete" backgroundColor={colors.primary}/>} />
        <ListItemSeparator/>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={ ()=> navigation.navigate(item.targetScreen)}
            />
          )}
        />
       
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
