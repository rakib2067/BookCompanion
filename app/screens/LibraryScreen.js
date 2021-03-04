import React from 'react';
import { StyleSheet,View} from 'react-native';
import Icon from '../components/Icon';
import { ListItem } from "../components/lists";
import Screen from '../components/Screen';
import colors from '../config/colors';
function LibraryScreen(props) {
    return (
        
        <Screen style={styles.container}>
        <View style={styles.container1}>
        
        <ListItem
          title="Currently Reading"
          subTitle="0 Books"
          onPress={()=>{console.log("hello")}}
          IconComponent={<Icon iconColor="#a86cc1" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
        />
      </View>
      <View style={styles.container1}>
        <ListItem
          title="Want To Read"
          subTitle="0 Books"
          onPress={()=>{console.log("hello")}}
          IconComponent={<Icon iconColor="#98fb98" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
        />
      </View>
      <View style={styles.container1}>
        <ListItem
          
          title="Read"
          subTitle="0 Books"
          onPress={()=>{console.log("hello")}}
          IconComponent={<Icon iconColor="#7289DA" backgroundColor="#2c2f33" size={60} name="book-plus"/>}
          
        />
      </View>


        </Screen>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        
        paddingTop:50,

    },
    container1:{
      paddingTop:30,
      
    }
    
})
export default LibraryScreen;