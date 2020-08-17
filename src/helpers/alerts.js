import {Alert} from 'react-native';



export async function confirmAlert(title, message){

    return new Promise((resolve)=> {

        Alert.alert(title, message, [{
            text: 'Cancelar',
            style: 'cancel',
            onPress: ()=> resolve(false)
        }, 
        {
            text: 'Continuar',
            style: 'default',
            onPress: ()=> resolve(true)
        }])
    })
}


export async function alertMessage(title, message){
    return new Promise((resolve)=> {

        Alert.alert(title, message, [
        {
            text: 'Aceptar',
            style: 'default',
            onPress: ()=> resolve(true)
        }])
    })
}