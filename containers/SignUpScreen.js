import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/sign_up",
        {
          username: username,
          email: email,
          password: password
        }
      );

      const userToken = response.data.token;
      setToken(userToken);
    } catch (error) {
      console.log(error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={150}
        style={styles.keyboardAV}
      >
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="white"
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
        />
        <View style={styles.bar}></View>
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          placeholderTextColor="white"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <View style={styles.bar}></View>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor="white"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <View style={styles.bar}></View>
        <Button title="Sign up" onPress={handleChange} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF5A5F",
    height: "100%",
    alignItems: "center"
  },
  keyboardAV: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center"
  },
  text: {
    fontSize: 35,
    fontWeight: "200",
    color: "white"
  },
  input: {
    color: "white",
    fontSize: 30,
    fontWeight: "200",
    width: 500,
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 30
  },
  bar: {
    width: 300,
    height: 0.5,
    backgroundColor: "white"
  }
});
