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

const NotesList= ({data,navigation})=> {


    function renderItemList(item){

        return (
            <TouchableOpacity
            style={styles.listConteiner}
            key={item.id}
            onLongPress={()=> navigation.navigate('Registro de Notas', {
                edit: true,
                id: item.id
            })}
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