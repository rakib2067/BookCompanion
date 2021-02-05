import React from 'react';
import {Image, ImageBackground, StyleSheet,Text,View} from "react-native";
import App from '../../App.js';
import AppButton from '../components/AppButton.js';
import colors from '../config/colors.js'
import routes from '../navigation/routes.js';
function WelcomeScreen({navigation}) {
    return (
       
        <ImageBackground 
        resizeMode= "cover"
        style={styles.background}
        source={require('../assets/books.jpg')} >
         <View style= {styles.logoContainer}>
         <Image
         style={styles.logo}
         source={require('../assets/logo-red.png')} />
         <Text style={styles.slogan}>Making Reading Fun Again </Text>
         </View>
         <View
         style={styles.buttonContainer}>
            <AppButton title="Login" onPress={() =>navigation.navigate(routes.LOGIN)}/>
            <AppButton title="Register" color="secondary" onPress={()=>navigation.navigate(routes.REGISTER)}/>       
         </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
        //this is set to 1 so that the image bacjground takes up the entire screen
    },
    buttonContainer:{
        padding: 20,
        width: '100%'
    },
    logo:{
        width: 100,
        height: 100,
    },
    logoContainer:{
        position: 'absolute',
        top: 50,
        alignItems: 'center'
    },
    slogan:{
        color: colors.black,
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 20,

    }


    
})
export default WelcomeScreen;