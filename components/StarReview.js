import React from "react";

import { Ionicons } from "@expo/vector-icons";

const StarReview = props => {
  return (
    <>
      <Ionicons
        name="ios-star"
        size={22}
        color={props.ratingValue > 0 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={22}
        color={props.ratingValue > 1 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={22}
        color={props.ratingValue > 2 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={22}
        color={props.ratingValue > 3 ? "gold" : "grey"}
      />
      <Ionicons
        name="ios-star"
        size={22}
        color={props.ratingValue > 4 ? "gold" : "grey"}
      />
    </>
  );
};

export default StarReview;
