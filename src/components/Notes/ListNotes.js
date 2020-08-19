import React, { Fragment } from 'react';
import {FlatList,Text, StyleSheet, TouchableOpacity} from 'react-native'



const styles= StyleSheet.create({
    container:{
        width: "90%"
    },
    listConteiner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#007ACC",
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: "#007ACC",
        fontSize: 12,
        marginTop: 5
    },
    item: {
        marginTop: 5,
        padding: 5,
        color: "#FFF"
      }
})

const NotesList= ({data,onSelect,navigation})=> {



    function selectItem(item){

        const array= data.forEach(note => {
            if (note.id=== item.id){
                note.selected= true;
            }

            return note;
        });

        onSelect(array);
    }


    function renderItemList(item){

        return (
            <TouchableOpacity
            style={styles.listConteiner}
            key={item.id}
            onPress={()=> navigation.navigate('Registro de Notas', {
                edit: true,
                id: item.id
            })}
            onLongPress={()=> selectItem(item)}
            >
                <Text 
                style={styles.item}
                >
                    {item.description}
                </Text>
            </TouchableOpacity>
        )
    }


    return (
        <Fragment>
            <FlatList 
                style={styles.container}
                data={data}
                renderItem={({item})=> renderItemList(item)}
            />
        </Fragment>
    )
}


export default NotesList;