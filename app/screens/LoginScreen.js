import React, { useState } from 'react';
import { Image, StyleSheet} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import {Formik} from 'formik';
import Screen from '../components/Screen';
function LoginScreen(props) {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
    return (
        <Screen>
            <Image 
            style={styles.logo}
            source={require("../assets/logo-red.png")}/>
            <Formik
            initialValues={{email:"", password:""}}
            onSubmit={(values) => console.log(values)}   
            >
                {({handleChange, handleSubmit}) => (
                    <>
                    <AppTextInput 
            placeholder="Email" 
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={handleChange("email")}
            />
            
            <AppTextInput 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            icon="lock"
            secureTextEntry
            onChangeText={handleChange("password")}
            textContentType="password" />
            <AppButton
            title="Login" 
            onPress={handleSubmit}
            />
                    </>
                )}
            </Formik>
            
        </Screen>

    );
}
const styles = StyleSheet.create({
    logo:{
        width:80,
        height:80,
        alignSelf:"center",
        marginTop:50,
        marginBottom:20
    }
    
})
export default LoginScreen;