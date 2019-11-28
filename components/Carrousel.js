import Swiper from "react-native-swiper";
import React from "react";
import { Image, StyleSheet } from "react-native";

const Carrousel = props => {
  const photos = props.photos;
  let arrayPhotos = [];
  //Create an array of <Image/> to be displayed in the Swiper
  for (let i = 0; i < photos.length; i++) {
    arrayPhotos.push(
      <Image key={i} style={styles.image} source={{ uri: photos[i] }} />
    );
  }

  return (
    <>
      <Swiper
        horizontal={true}
        showsButtons={true}
        showsPagination={false}
        autoplay={true}
      >
        {arrayPhotos}
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240
  }
});

export default Carrousel;
