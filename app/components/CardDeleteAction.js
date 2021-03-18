import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
function CardDeleteAction({onPress}) {
    return (
        <TouchableWithoutFeedback onPress= {onPress}>
       <View style={styles.container}>
           <MaterialCommunityIcons name="trash-can" 
            size={75}
            color={colors.white}/>
       </View>
       </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.danger,
        height:295,
        width:100,
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 15,

    }
})
export default CardDeleteAction;