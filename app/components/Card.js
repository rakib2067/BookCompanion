import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

function Card({backgroundColor,description, title, subTitle,numberOfLines=1, image,onPress,renderRightActions }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.card, {backgroundColor}]}>
     {image && <Image style={styles.image} source={{uri: image}} />}
      <View style={styles.detailsContainer}>
      {description && <Text style={styles.description} numberOfLines={numberOfLines}>
          Description:
        </Text>}
        <Text style={styles.title} numberOfLines={numberOfLines}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  description:{
    marginBottom: 7,
    fontWeight: "bold",

  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
