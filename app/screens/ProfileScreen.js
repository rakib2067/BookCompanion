import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen'
function ProfileScreen(props) {
    return (
        <Screen style={{backgroundColor: 'black'}}>
            
            <ListItem
                image={require("../assets/Oda.jpg")}
                title="Eichiro Oda"
                subTitle="1000 listings"
             />
             
        </Screen>
    );
}
const styles = StyleSheet.create({
    Screen:{
        backgroundColor: "silver"
    }
    ,
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
    }
    
})
export default ProfileScreen;