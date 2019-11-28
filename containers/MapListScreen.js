import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import MapView from "react-native-maps";
const MapListScreen = () => {
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
      alert("Erreur");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {isLoading === true ? (
        <Text>Chargement...</Text>
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
                  coordinate={{
                    latitude: element.loc[1],
                    longitude: element.loc[0]
                  }}
                  key={index}
                />
              );
            })}
          </MapView>
        </View>
      )}
    </View>
  );
};
export default MapListScreen;
