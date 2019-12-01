import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

export default function SignUpScreen({ setToken, setId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [CGV, setCGV] = useState(false);
  //Create a new user by retreiving basic infos from the user to send to the api and fetch the token to change the user status to connected
  const handleChange = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/sign_up",
        {
          username: username,
          email: email,
          password: password
        }
      );

      const userToken = response.data.token;
      const Id = response.data._id;
      setId(Id);
      setToken(userToken);
    } catch (error) {
      console.log(error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <ScrollView>
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
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="white"
            value={confirmedPassword}
            onChangeText={text => {
              setConfirmedPassword(text);
            }}
          />
          <View style={styles.bar}></View>
          <View style={styles.CGV}>
            <Switch
              disabled={false}
              onValueChange={value => {
                setCGV(!CGV);
              }}
            />
            <Text style={styles.CGVText}>
              I agree with the terms and conditions
            </Text>
          </View>

          {confirmedPassword !== password || CGV === false ? (
            <TouchableOpacity
              title="Sign up"
              style={styles.buttonOff}
              onPress={() => {
                alert("Password Error !");
              }}
            >
              <Text style={styles.buttonOffText}>Sign Up</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              title="Sign up"
              style={styles.button}
              onPress={handleChange}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF5A5F",
    flex: 1,
    alignItems: "center"
  },
  keyboardAV: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#FF5A5F"
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
  },
  CGV: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  CGVText: {
    paddingLeft: 10,
    color: "white"
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
  buttonOff: {
    height: 60,
    width: 150,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 30
  },
  buttonText: {
    color: "#FF5A5F",
    fontSize: 25,
    fontWeight: "200"
  },
  buttonOffText: {
    color: "white",
    fontSize: 25,
    fontWeight: "200"
  }
});
