import React from "react";
import { View, Image, StyleSheet } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";

function CurrentDetailsScreen(props) {
    return (
    <View>
      {/* <Image style={styles.image} source={{uri: item.volumeInfo.imageLinks.thumbnail}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text style={styles.price}>{item.volumeInfo.authors}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/me.jpg")}
            title="Rakib Ali"
            subTitle="5 Listings"
          />
        </View>
      </View> */}
    </View>
  );
}

export default CurrentDetailsScreen;