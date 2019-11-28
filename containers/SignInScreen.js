import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <View>
      <View style={styles.home}>
        <Ionicons style={styles.icon} name="md-home" size={120} color="white" />
        <Text style={styles.welcome}>Welcome </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
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
            navigation.navigate("Sign_up");
          }}
        />
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
  icon: { marginTop: 50 },
  welcome: {
    color: "white",
    fontSize: 50,
    fontWeight: "200",
    paddingTop: 20,
    paddingBottom: 30
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
