import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Control of the identity of the user and setting is token
  const handleChange = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        {
          email: email,
          password: password
        }
      );

      const userToken = response.data.token;
      setToken(userToken);
    } catch (error) {
      // no user found means or bad input on credential or user doesn't exist in the database
      console.log(error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <View>
      <View style={styles.home}>
        <View style={styles.homeHeader}>
          <Ionicons
            style={styles.icon}
            name="md-home"
            size={120}
            color="white"
          />
          <Text style={styles.welcome}>Welcome </Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={150}
          style={styles.keyboardAV}
        >
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="white"
            value={email}
            onChangeText={text => {
              setEmail(text.toLowerCase());
            }}
          />
          <View style={styles.bar}></View>

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <View style={styles.bar}></View>
          <TouchableOpacity
            style={styles.button}
            title="Login"
            mode="contained"
            onPress={handleChange}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Button
            title="Sign up"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF5A5F",
    height: "100%",
    alignItems: "center"
  },
  homeHeader: {
    justifyContent: "center",
    alignItems: "center"
  },
  icon: { marginTop: 50 },
  welcome: {
    color: "white",
    fontSize: 50,
    fontWeight: "200",
    paddingTop: 20,
    paddingBottom: 30
  },
  keyboardAV: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center"
  },
  input: {
    color: "white",
    fontSize: 30,
    fontWeight: "200",
    width: 500,
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 20
  },
  bar: {
    width: 300,
    height: 0.5,
    backgroundColor: "white"
  },
  button: {
    height: 60,
    width: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 30
  },
  buttonText: {
    color: "#FF5A5F",
    fontSize: 25,
    fontWeight: "200"
  }
});
