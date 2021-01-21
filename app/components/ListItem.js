import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
function ListItem({image, title, subTitle,onPress,renderRightActions}) {
    return (
        <Swipeable
        renderRightActions={renderRightActions}
        
        > 
        <TouchableHighlight
        underlayColor={colors.light} 
        onPress={onPress}>
        <View style={styles.container}>
        <Image style={styles.image}
        source={image}/>
        <View>
        <AppText style= {styles.title}>{title}</AppText>
        <AppText style= {styles.subTitle}>{subTitle}</AppText>
        </View>
        </View>
        </TouchableHighlight>
        </Swipeable>
      
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 15,
    },
    image:{
        borderRadius: 35,
        height: 70,
        width: 70,
        borderRadius: 35,
        marginRight: 10

    },
    title:{
        fontWeight: "bold",


    },
    subTitle:{
        color: colors.medium

    }
    
    
})
export default ListItem;

 // In this case we want to set the flexdirection of the container to row, as we want to display the info horizontally