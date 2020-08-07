import React, { useState, useEffect } from "react";

import {
  View,
  Modal,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  content: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#007ACC",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
  },
  button: {
    marginTop: 5,
    width: "50%",
  },
  cancelButton: {
    marginTop: 5,
    width: "50%",
    backgroundColor: "red",
  },
  textInput: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#007ACC",
    width: "100%",
  },
  btnContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
  },
  block: {
    marginTop: 10,
    width: "100%",
  },
  picker: {
    width: "100%",
    height: 50,
  },
});

const AddTask = ({ open, addTask, close, edit }) => {
  const [name, setName] = useState("");
  const [descripción, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    if (edit) {
      editValues();
    }
  }, [edit]);

  function editValues() {
    const { name, description, priority } = edit;
    setName(name);
    setDescription(description);
    setPriority(priority);
  }

  function clearInputs() {
    setName("");
    setDescription("");
    setPriority(0);
  }

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={() => close()}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>{edit ? "Editar Tarea" : "Agregar Nueva Tarea"}</Text>
          <View style={styles.block}>
            <Text>Nombre:</Text>
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.block}>
            <Text>Descripción:</Text>
            <TextInput
              value={descripción}
              onChangeText={(value) => setDescription(value)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.block}>
            <Text>Prioridad</Text>
            <Picker
              style={styles.picker}
              selectedValue={priority}
              onValueChange={(value) => setPriority(value)}
              mode="dropdown"
            >
              <Picker.Item label="Alta" value={1} />
              <Picker.Item label="Baja" value={0} />
            </Picker>
          </View>
          <View style={styles.btnContainer}>
            <Button
              onPress={() => {
                close();
                clearInputs();
              }}
              title={"Cancelar"}
              style={styles.cancelButton}
            />

            <Button
              onPress={() => {
                addTask(
                  {
                    item: name,
                    description: descripción,
                    priority: priority,
                  },
                  edit ? edit.id : null
                );
                close();
                clearInputs();
              }}
              title={edit ? "Editar Tarea" : "Agregar Tarea"}
              style={styles.button}
              disabled={name === ""}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTask;
