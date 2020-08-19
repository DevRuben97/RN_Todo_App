import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet,Text } from "react-native";
import NotesList from "../components/Notes/ListNotes";
import { useNavigation } from "@react-navigation/native";

import FAB from "react-native-fab";
import Input from "../components/Input";
import {orderArrayByDate} from '../helpers/commonFunctions'

//---------------------DATA-------------------------------
import { getNotesList } from "../Data/Notes";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    width: "100%",
  },
});

const Notes = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filterArray, setFilters] = useState([]);
  const [hasFilter, setHasFilter]= useState(false);
  const [selectionCount, setSelectionCount]= useState(0);

  useEffect(() => {
    if (navigation.isFocused() && !hasFilter) {
      fetch();
    }
  }, [navigation, filterArray]);

  useLayoutEffect(()=> {
      navigation.setOptions({
      headerRight: ()=> <Text>{selectionCount}</Text>
      })
  })

  async function fetch() {
    let list = await getNotesList();
    list= orderArrayByDate(list);
    setData(list);
    setFilters(list);
  }

  function search(input) {
    const array = [...data];
    if (input !== "") {
      const filtered = array.filter((s) =>
        s.description.toLowerCase().includes(input.toLowerCase())
      );
      setFilters(filtered);
      setHasFilter(true);
    } else {
      setFilters(data);
      setHasFilter(false);
    }
  }

  function selectItems(array){
    const selected= array.filter(s=> s.selected);
    setSelectionCount(selected);
}
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Input
          placeHolder="Buscar"
          onChangeValue={(value) => search(value)}
        />
      </View>
      <NotesList 
      data={filterArray}
       navigation={navigation}
       onSelect={(array)=> selectItems(array)}
       />
      <FAB
        buttonColor="#007ACC"
        iconTextColor="#FFFFFF"
        onClickAction={() => {
          navigation.navigate("Registro de Notas", {
            edit: false,
          });
        }}
      />
    </View>
  );
};

export default Notes;
