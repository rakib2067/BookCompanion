import React from 'react';
import { StyleSheet,TouchableHighlight,View } from 'react-native';
import AppText from './Text';
import {MaterialCommunityIcons} from '@expo/vector-icons';
function ListIcon(props) {
    return (
        
        <TouchableHighlight
        underlayColor={colors.light} 
        onPress={onPress}>
        <View style={styles.container}>
        {IconComponent}
        <View style={styles.textContainer}>
        <AppText style= {styles.title} numberOfLines={1}>{title}</AppText>
        {subTitle &&<AppText style= {styles.subTitle}  numberOfLines={2}>{subTitle}</AppText>}
        </View>
        <MaterialCommunityIcons color={colors.medium}   name="chevron-right" size={25} />
        </View>
        </TouchableHighlight>

    );
}
const styles = StyleSheet.create({
    
})
export default ListIcon;