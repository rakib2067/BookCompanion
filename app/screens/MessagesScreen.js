import React, {useState}from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import ListDeleteAction from '../components/ListDeleteAction';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages= [
    {
        id:1,
        title:'T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1T1',
        description:'How are youHow are youHow are youHow are youHow are youHow are youHow are youHow are youHow are youHow are youHow are you',
        image: require('../assets/me.jpg')
    },
    {
        id:2,
        title:'T2',
        description:'D2',
        image: require('../assets/me.jpg')
    },
]


function MessagesScreen(props) {

    return (
        <Screen >
        <FlatList 
            data={messages}
            keyExtractor={ message => message.id.toString()}
            renderItem={({item}) => 
            <ListItem 
                title={item.title}
                subTitle={item.description}
                image={item.image}
                numberOfLines={number? number: 2}
                onPress={()=>setNumber(10)}
                renderRightActions={()=>
                <ListDeleteAction onPress={()=>handleDelete(item)}/>}
            />}
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={() =>{
                setMessages([
                {
                id:2,
                title:'T2',
                description:'D2',
                image: require('../assets/me.jpg')
                }
                ])
            }}
           
        />

        </Screen>
    );
}
const styles = StyleSheet.create({
    
    
})
export default MessagesScreen;

// Expo costants allow us to simplify our code, and omit the need of using Statusbar and Platform APIs.