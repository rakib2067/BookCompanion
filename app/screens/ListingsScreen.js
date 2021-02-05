import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppTextInput from "../components/AppTextInput";
import { FormField } from "../components/forms";

const listings = [
  {
    id: 1,
    title: "One Piece",
    price: 100,
    image: require("../assets/book1.jpg"),
  },
  {
    id: 2,
    title: "Harry Poter",
    price: 1000,
    image: require("../assets/book2.jpg"),
  },
];

function ListingsScreen({navigation}) {
  return (
    <Screen style={styles.screen}>
    <AppTextInput icon="magnify" placeholder="Title/Author/ISBN" backgroundColor={"lightgrey"}/>    
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            backgroundColor={colors.light}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.white,
  },
  input:{
    backgroundColor:"red",
    flex:1
  }
});

export default ListingsScreen;
