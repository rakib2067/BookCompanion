import React from 'react';
import { Image, StyleSheet} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import {Formik} from 'formik';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import AppText from '../components/AppText';
import ErrorMessage from '../components/ErrorMessage';
import AppFormField from '../components/AppFormField';

import AppForm from '../components/AppForm';
import SubmitButton from '../components/SubmitButton';
function LoginScreen(props) {


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});
    return (
        <Screen>
            <Image 
            style={styles.logo}
            source={require("../assets/logo-red.png")}/>
            <AppForm
            initialValues={{email:"", password:""}}
            onSubmit={(values) => console.log(values)} 
            validationSchema={validationSchema}
            >
                <AppFormField
                    placeholder="Email" 
                    icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    name="email"
                    textContentType="emailAddress"
                    />              
                <AppFormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="password"
                    placeholder="Password"
                    icon="lock"
                    secureTextEntry
                    textContentType="password" 
                    />
                <SubmitButton title="Login" />
                    
              
            </AppForm>  
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