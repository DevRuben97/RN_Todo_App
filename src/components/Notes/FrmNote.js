import React, { useState, useEffect, useLayoutEffect } from "react";
import { View } from "react-native";
import { TextInput, StyleSheet, Share, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import Input from '../Input';

import OptionsMenu from "../OptionsMenu";
import wordsCount from "words-count";
//--------------------HELPERS---------------------------
import { generateIds, getDate } from "../../helpers/commonFunctions";

//------------------------DATA----------------------------
import { addNewItem, deleteItem, updateItem, getItem } from "../../Data/Notes";
import { confirmAlert } from "../../helpers/alerts";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "black",
  },
});

const FrmNote = () => {
  //Navigation:
  const navigation = useNavigation();
  const routes = useRoute();
  //Routes params:
  const edit = routes.params.edit;
  const id = routes.params.id;

  //States:
  const [details, setDetails] = useState("");
  const [itemDate, setItemDate] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: edit ? "Editar Nota" : "Registro de Nota",
      headerRight: () => {
        return (
          <OptionsMenu
            options={[
              {
                title: "Guardar Cambios",
                action: save,
                icon: "check",
              },
              {
                title: "Eliminar",
                action: deleteNote,
                icon: "trash-alt",
                disabled: !edit,
              },
              {
                title: "Compartir",
                action: share,
                icon: "share",
                disabled: details === "",
              },
            ]}
          />
        );
      },
    });
  });

  useEffect(() => {
    async function fetch() {
      if (edit) {
        const item = await getItem(id);
        setDetails(item.description);
        setItemDate(item.date ? item.date : getDate());
      } else {
        setItemDate(getDate());
      }
    }
    fetch();
  }, []);

  function save() {
    if (details !== "") {
      if (!edit) {
        addNewItem({
          id: generateIds(),
          description: details,
          date: getDate(),
        });
      } else {
        updateItem({
          id: id,
          description: details,
          date: getDate(),
        });
      }

      navigation.goBack();
    }
  }

  async function deleteNote() {
    const ok = await confirmAlert(
      "Eliminar Nota",
      "¿Estas seguro de eliminar esta nota?"
    );

    if (ok) {
      await deleteItem(id);
      navigation.goBack();
    }
  }

  async function share() {
    Share.share({
      message: details,
      title: "Compartir",
    });
  }

  return (
    <View style={styles.container}>
      <Text>{`${itemDate} | ${wordsCount(details)} Palabras`}</Text>
      <Input
        multiline
        onChangeValue={(value) => setDetails(value)}
        value={details}
      />
    </View>
  );
};

export default FrmNote;
