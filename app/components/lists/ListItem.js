import React from "react";
import { View, StyleSheet, TouchableHighlight, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Image from 'react-native-image-progress';
import Text from "../Text";
import colors from "../../config/colors";
import * as Progress from 'react-native-progress'
function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  backgroundColor=colors.white,
  borderRadius=0
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight style={borderRadius} underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container,{backgroundColor},{borderRadius}]}>
          {IconComponent}
          {image && <Image indicator={Progress.Pie} 
          indicatorProps={{
          size: 80,
           borderWidth: 0,
           color: 'rgba(150, 150, 150, 1)',
           unfilledColor: 'rgba(200, 200, 200, 0.2)'
          }}
          style={styles.image} 
          source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
