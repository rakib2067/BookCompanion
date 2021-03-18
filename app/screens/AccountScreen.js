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
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen:routes.MESSAGES,
  },
];

function AccountScreen({navigation}) {
  
  const[state,setState]=useState();
  const[image,setImage]=useState(null);
  const[close,setClose]=useState(0)
  
  useEffect(()=>{
    var storage=firebase.storage().ref(firebase.auth().currentUser.uid).getDownloadURL()
    .then((url)=>{
      setImage(url)
      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
        url
      },{merge:true}).catch((error)=>{
        console.log("error")
      })
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
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const deleteProfile= ()=>{
    var profdel=firebase.storage().ref(firebase.auth().currentUser.uid).delete()
    .then(()=>{
      Alert.alert('File succesfully deleted')
      setClose(close+1)
    }).catch((error)=>{
      Alert.alert(error)
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
        Alert.alert("Success")
      })
      .catch((error)=>{
        Alert.alert(error)

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
  console.log(image)
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={state?state.name:<ActivityIndicator animating/>}
          subTitle={state?state.email:<ActivityIndicator animating/>}
          image={{uri:image}}
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
