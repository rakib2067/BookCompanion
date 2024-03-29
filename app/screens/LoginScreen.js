import React,{useContext} from "react";
import { StyleSheet, Image, Alert, View } from "react-native";
import * as Yup from "yup";
import * as firebase from 'firebase';
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AuthContext from "../auth/context";
import Icon from "../components/Icon";
import colors from "../config/colors";
import * as Analytics from 'expo-firebase-analytics';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const authContext =useContext(AuthContext);
  const handleSubmit= async(userInfo) =>{
    firebase.auth().signInWithEmailAndPassword(userInfo.email,userInfo.password)
    .then((result)=>{
      const user=result;
      Analytics.logEvent('Login', {
        screen: 'Home Screen',
        purpose: 'User has Logged in',
      });
      authContext.setUser(user);
    })
    .catch((error)=>{
      console.log(error)
      Alert.alert("error",error.message)
    })
  }
  return (
    <Screen style={styles.container}>
        <View style={styles.logo}>
         <Icon  iconColor={colors.primary} size={200} backgroundColor="transparent" name="book-multiple-outline"/>
         </View>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {

    alignSelf: "center",
    
  },
});

export default LoginScreen;
