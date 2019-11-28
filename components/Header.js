import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.goHome}>
        <TouchableOpacity
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        >
          <Ionicons
            style={styles.icon}
            name="md-home"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  goHome: { height: 30, backgroundColor: "#FF5A5F" }
});
export default Header;
