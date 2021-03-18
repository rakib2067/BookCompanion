import React from 'react';
import { View, StyleSheet, Image,TouchableHighlight, } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {MaterialCommunityIcons} from '@expo/vector-icons';
function ListItem({image, title,IconComponent, subTitle,onPress,numberOfLines=3,renderRightActions,chevron=true}) {
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
        <AppText style= {styles.title} numberOfLines={1}>{title}</AppText>
        {subTitle &&<AppText style= {styles.subTitle}  numberOfLines={numberOfLines}>{subTitle}</AppText>}
        </View>
        {chevron &&<MaterialCommunityIcons color={colors.medium}   name="chevron-right" size={25} />}
        </View>
        </TouchableHighlight>
        </Swipeable>
      
    );
}
const styles = StyleSheet.create({
    container:{
        alignItems: "center",
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
        justifyContent: "center",
        flex:1

    },
    subTitle:{
        color: colors.medium

    }
    
    
})
export default ListItem;

 // In this case we want to set the flexdirection of the container to row, as we want to display the info horizontally