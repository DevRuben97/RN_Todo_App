import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import NotesList from '../components/Notes/ListNotes';
import {useNavigation} from '@react-navigation/native'

import FAB from 'react-native-fab';


//---------------------DATA-------------------------------
import {getNotesList} from '../Data/Notes'


const styles= StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    width: "100%",
    }
})


const Notes= ()=> {


    const navigation = useNavigation();
    const [data, setData]= useState([]);
    const [filterArray, setFilters]= useState([]);
    const [reload, setReload]= useState(false);
    
    useEffect(()=> {
      const event=  navigation.addListener('focus', ()=> {
            async function fetch(){
                const list=  await getNotesList();
                setData(list);
                setFilters(list);
            }
            fetch();
        })

        return event;
    },[navigation])

    return (
        <View style={styles.container}>
            <NotesList 
             data={filterArray}
             navigation={navigation}
            />
            <FAB
                buttonColor="#007ACC"
                iconTextColor="#FFFFFF"
                onClickAction={()=> {
                    navigation.navigate('Registro de Notas',{
                        edit: false,
                    });
                }}
      />
        </View>
    )
}

export default Notes;