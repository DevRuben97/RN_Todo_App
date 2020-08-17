import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native'
import {TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
//--------------------HELPERS---------------------------
import {generateIds} from '../../helpers/commonFunctions';

//------------------------DATA----------------------------
import {addNewItem} from '../../Data/Notes'

const styles= StyleSheet.create({
    container: {
        paddingTop: 5,
        backgroundColor: "#fff",
        flex: 1, 
        alignItems: 'center'
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "black"
    }
})

const FrmNote= ()=> {


    const navigation= useNavigation();

    const [details, setDetails]= useState('');

    function save(){
        if (details!== ''){
            addNewItem({
                id: generateIds(),
                description: details
            });
            navigation.goBack();
        }
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: ()=> {             
                return (
                    <TouchableOpacity style={{paddingRight: 5}} onPress={save}>
                        <Icon name="check" size={18}/>
                    </TouchableOpacity>
                )
            }
        })
    })

    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.textInput}
            multiline
            onChangeText={(value)=> setDetails(value)}
            value={details}
            />
        </View>
    )
}

export default FrmNote;