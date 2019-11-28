import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import StarReview from "./StarReview";
//create a flatlist of each element of the array with a transfer on click to the detailed page of each element
const RentCard = props => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={props.offer}
      keyExtractor={item => {
        return String(item._id);
      }}
      renderItem={({ item }) => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                //transfer the user to the RoomScreen of the element
                navigation.navigate("Room", { roomId: item._id });
              }}
              style={styles.page}
            >
              <View style={styles.card}>
                <Image
                  style={styles.imageCard}
                  source={{
                    uri: item.photos[0]
                  }}
                  resizeMode="cover"
                />
                <View style={styles.cardDescription}>
                  <View style={styles.price}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20
                      }}
                    >
                      {item.price}$
                    </Text>
                  </View>
                  <View style={styles.description}>
                    <Text numberOfLines={1} style={{ fontSize: 18 }}>
                      {item.title}
                    </Text>
                    <View style={styles.rating}>
                      {/* initiate a color dynamic row of stars depending on the rating value */}
                      <StarReview ratingValue={item.ratingValue} />

                      <Text style={styles.ratingText}>{item.reviews}</Text>
                      <Text style={styles.ratingText}> reviews</Text>
                    </View>
                  </View>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: item.user.account.photos[0]
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 370,
    height: 300,
    backgroundColor: "blue",
    marginTop: 20
  },
  imageCard: {
    width: "100%",
    height: 180
  },
  cardDescription: {
    flexDirection: "row",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    position: "relative"
  },
  description: {
    flex: 1,
    height: "80%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "white"
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
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    height: 20
  },
  ratingText: {
    fontSize: 20
  }
});

export default RentCard;
