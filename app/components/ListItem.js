import React from 'react';
import { View, StyleSheet, Image, ImageComponent,TouchableHighlight, } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
function ListItem({image, title,IconComponent, subTitle,onPress,renderRightActions}) {
    return (
        <Swipeable
        renderRightActions={renderRightActions}
        > 
        
        <TouchableHighlight
        underlayColor={colors.light} 
        onPress={onPress}>
        <View style={styles.container}>
        {IconComponent}
        {image &&<Image style={styles.image}
        source={image}/>}
        <View style={styles.textContainer}>
        <AppText style= {styles.title}>{title}</AppText>
        {subTitle &&<AppText style= {styles.subTitle}>{subTitle}</AppText>}
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
        backgroundColor: colors.white
    },
    image:{
        borderRadius: 35,
        height: 70,
        width: 70,
        borderRadius: 35,
        

    },
    title:{
        fontWeight: "bold",


    },
    textContainer:{
        marginLeft: 10,
        justifyContent: "center"

    },
    subTitle:{
        color: colors.medium

    }
    
    
})
export default ListItem;

 // In this case we want to set the flexdirection of the container to row, as we want to display the info horizontally