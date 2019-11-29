import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActionSheetIOS
} from "react-native";

export default function ProfileScreen(props) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/user/" + props.userId,
          {
            headers: { Authorization: "Bearer " + props.userToken }
          }
        );
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View>
          <Text>user id :{props.userId}</Text>
          <Text>user token :{props.userToken}</Text>
          <Text>user token :{user.account.username}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
