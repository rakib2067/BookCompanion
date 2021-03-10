import React,{useContext} from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import * as firebase from 'firebase';
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AuthContext from "../auth/context";

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
      console.log(user)
      authContext.setUser(user);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

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
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
