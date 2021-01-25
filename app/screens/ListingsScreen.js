import React from 'react';
import Screen from '../components/Screen';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import colors from '../config/colors';

const listings=[
    {
        id:1,
        title: 'One Piece',
        price: 100,
        image: require('../assets/book1.jpg')
    },
    {
        id:2,
        title: 'Harry Potter',
        price: 200,
        image: require('../assets/book2.jpg')
    },
    
];
function ListingsScreen(props) {
    return (
        <Screen style={styles.card}>
        <FlatList
        data={listings} 
        keyExtractor= {listing => listing.id.toString()}
        //Need to convert ID to string as Flatlist only takes in strings 
        renderItem={({item}) =>
        <Card
            
            title={item.title}
            subTitle={'£'+item.price}
            image={item.image}
        /> }
        />


        </Screen>
    );
}
const styles = StyleSheet.create({
    card:{
        padding:20,
        backgroundColor:colors.light
    }
    
})
export default ListingsScreen;