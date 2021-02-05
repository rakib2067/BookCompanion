import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import defaultStyles from '../config/styles';
function AppTextInput({backgroundColor=defaultStyles.colors.light,icon, width="100%",...otherProps}) {
    return (
        <View style={[styles.container, {backgroundColor},{width}]}>
        {icon &&<MaterialCommunityIcons
        name={icon}
        size={20} color={defaultStyles.colors.medium}
        style={styles.icon}
        />}
        <TextInput 
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text} {...otherProps} />
        </View> 
    );
}
const styles = StyleSheet.create({
    container:{

        borderRadius:25,
        flexDirection: "row",
      
        padding: 15,
        marginVertical: 10
    },
    icon:{
        marginRight: 10,
        marginTop: 3,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default AppTextInput;
