import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";

const MapListScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      setProducts(response.data.rooms);
      setIsLoading(false);
    } catch (error) {
      alert("Error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {isLoading === true ? (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          >
            {products.map((element, index) => {
              return (
                <MapView.Marker
                  onPress={() => {
                    //transfer the user to the RoomScreen of the element
                    navigation.navigate("Room", { roomId: element._id });
                    console.log(element._id);
                  }}
                  key={index}
                  coordinate={{
                    latitude: element.loc[1],
                    longitude: element.loc[0]
                  }}
                />
              );
            })}
          </MapView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MapListScreen;
