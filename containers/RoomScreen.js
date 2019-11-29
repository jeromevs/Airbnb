import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { useRoute } from "@react-navigation/core";
import MapView from "react-native-maps";
import Carrousel from "../components/Carrousel";

import axios from "axios";
import StarReview from "../components/StarReview";

export default function RoomScreen() {
  const { params } = useRoute();

  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [textView, setTextView] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/room/" + params.roomId
        );
        setRoom(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        alert("impossible de se connecter au server");
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
        <View style={styles.container}>
          <View style={styles.room}>
            {/* create a carrousel of pics using the room pics  */}
            <Carrousel photos={room.photos} />

            <View style={styles.infos}>
              <View style={styles.infosUp}>
                <View style={styles.price}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20
                    }}
                  >
                    {room.price}$
                  </Text>
                </View>
                <View style={styles.infosUpBlock}>
                  <Text style={{ fontSize: 20 }}>{room.title}</Text>
                  <View style={styles.rating}>
                    <StarReview ratingValue={room.ratingValue} />

                    <Text style={styles.ratingText}>{room.reviews}</Text>
                    <Text style={styles.ratingText}> reviews</Text>
                  </View>
                </View>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: room.user.account.photos[0]
                  }}
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity
                //   allows to display 3 lines of text or more if clicked
                onPress={() => {
                  setTextView(!textView);
                }}
                style={styles.description}
              >
                <Text
                  style={styles.textDescription}
                  numberOfLines={textView === false ? 3 : null}
                >
                  {room.description}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.map}>
            {/* display a map centered on Paris */}
            <MapView
              style={styles.mapDisplay}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.352219,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09
              }}
              provider="google"
            >
              {/* display a pointer focused on the element address */}
              <MapView.Marker
                coordinate={{
                  longitude: room.loc[0],
                  latitude: room.loc[1]
                }}
              />
            </MapView>
          </View>
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
  },
  container: {
    flex: 1
  },
  room: {
    flex: 3
  },
  image: {
    width: "100%",
    height: 240
  },
  infos: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20
  },
  infosUp: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20
  },
  description: {
    flex: 1
  },
  rating: {
    flexDirection: "row",
    paddingTop: 5
  },
  ratingText: {
    fontSize: 20
  },
  textDescription: {
    fontSize: 16
  },
  price: {
    backgroundColor: "black",
    height: 35,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "absolute",
    top: -40,
    left: 10
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  map: {
    flex: 2,
    backgroundColor: "white",
    padding: 20
  },
  mapDisplay: {
    width: "100%",
    height: "100%"
  }
});
