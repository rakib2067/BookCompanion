import React, {useContext}from "react";
import { Alert, StyleSheet } from "react-native";
import * as Yup from "yup";
import firebase from 'firebase';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const authContext=useContext(AuthContext)
  const handleSubmit= async({name, email, password}) =>{
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then((result)=>{
    const user= result
    firebase.firestore().collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({
        name, 
        email

      })
    firebase.firestore().collection("points")
    .doc(firebase.auth().currentUser.uid).set({
      level:1,
      exp:0,
      target:80,
      total:0,
      name
    })
    authContext.setUser(user);
    

  })
  .catch((error)=>{
    Alert.alert("error",error.message)
  })
}
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
