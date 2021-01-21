import React from 'react';
import {Text, StyleSheet,Platform, Button, View} from 'react-native';
import colors from '../config/colors.js'

function LoginButton({title}) {
    return (
        <View
        style={styles.loginButton}>
        <Text
        style={styles.text}
        >{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    loginButton:{
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%'
    },
    text:{
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'

    } 
})
export default LoginButton;
