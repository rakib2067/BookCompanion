import React from 'react';
import { Image, StyleSheet} from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import {AppForm,AppFormField,SubmitButton} from '../components/forms'
function RegisterScreen(props) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().label("Name"),
        email: Yup.string().required().email().label("Email"),
        password: Yup.string().required().min(4).label("Password")
    });
    return (
        <Screen>
        <AppForm
        initialValues={{email:"",name:"", password:""}}
        onSubmit={(values) => console.log(values)} 
        validationSchema={validationSchema}
        >
            <AppFormField
                placeholder="Name" 
                icon="account"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                name="name"
                textContentType="name"
                />              
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
            <SubmitButton title="Register" /> 
        </AppForm>  
    </Screen>
    );
}

export default RegisterScreen;