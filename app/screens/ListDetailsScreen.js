import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
function ListDetailsScreen(props) {
    return (
        <View>
            <Image 
            style={styles.image}
            source={require('../assets/book1.jpg')} />
            <View style={styles.detailsContainer}>
            <AppText style= {styles.title}>One Piece</AppText>
            <AppText style={styles.author}>Shonen Jump</AppText>
            <View style={styles.listItem}>
            <ListItem
                image={require("../assets/Oda.jpg")}
                title="Eichiro Oda"
                subTitle="1000 listings"
             />
             </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 300,

    },
    detailsContainer:{
        padding: 20, 
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    author:{
        color: colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5
        
    },
    listItem:{
        marginVertical: 30
    }
    
})
export default ListDetailsScreen;