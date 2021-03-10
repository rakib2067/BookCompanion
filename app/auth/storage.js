import * as SecureStore from 'expo-secure-store';
const key ="authToken"
const storeToken= async authToken =>{
    try{
        await SecureStore.setItemAsync(key, authToken );
    }catch(e){
        console.log("error storing auth token", error);
    }
}

const getToken =() =>{
    const authToken- await SecureStore.getItemAsync(key);
}