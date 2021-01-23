import React, {useState}from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import ListDeleteAction from '../components/ListDeleteAction';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages= [
    {
        id:1,
        title:'T1',
        description:'D1',
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
    const [messages, setMessages]= useState(initialMessages);
    const [refresh, setRefreshing]= useState(false);
    const handleDelete= message =>{
        //delete the message from messages
        setMessages(messages.filter((m) => m.id !== message.id));

    };
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
                onPress={()=>console.log("message selected", item)}
                renderRightActions={()=>
                <ListDeleteAction onPress={()=>handleDelete(item)}/>}
            />}
            ItemSeparatorComponent={ListItemSeparator}
           
        />

        </Screen>
    );
}
const styles = StyleSheet.create({
    
    
})
export default MessagesScreen;

// Expo costants allow us to simplify our code, and omit the need of using Statusbar and Platform APIs.