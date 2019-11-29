import React, { useState, useEffect } from "react";

import { View, StyleSheet } from "react-native";

import axios from "axios";

import RentCard from "../components/RentCard";

export default function HomeScreen() {
  const [offer, setOffer] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://airbnb-api.herokuapp.com/api/room?city=paris"
    );
    setOffer(response.data.rooms);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.upPage}>
      <RentCard offer={offer} />
    </View>
  );
}

const styles = StyleSheet.create({
  upPage: {
    backgroundColor: "white"
  }
});
