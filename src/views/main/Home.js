import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput } from "react-native";

import FAB from "react-native-fab";

import TodoList from "../../components/List/TodoList";
import AddTask from "../../components/AddTask";
import Input from '../../components/Input';

//--------HELPERS-------------------

import { generateIds } from "../../helpers/commonFunctions";

//----------DATA---------------------
import { getList, saveList } from "../../Data/Tasks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    width: "100%",
  },
  textInput: {
    padding: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "black",
    width: "90%",
  },
});

const Home = () => {
  const [filtersArray, setFiltersData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    async function fecth() {
      setLoading(true);
      const list = await getList();
      setFiltersData(list);
      setData(list);
      setLoading(false);
    }
    fecth();
  }, [reload]);

  async function addTask({ item, description, priority }, edit) {
    const array = [...filtersArray];

    if (!edit) {
      array.push({
        id: generateIds(),
        name: item,
        description: description,
        priority: priority,
        completed: false,
      });
    } else {
      array.forEach((editItem) => {
        if (editItem.id === edit) {
          editItem.name = item;
          editItem.description = description;
          editItem.priority = priority;
        }
      });
    }
    await saveList(array);
    setReload(!reload);
  }

  function search(input) {
    const array = [...filtersArray];
    if (input !== "") {
      const filtered = array.filter((s) =>
        s.name.toLowerCase().includes(input.toLowerCase())
      );
      setFiltersData(filtered);
    } else {
      setFiltersData(data);
    }
  }

  function detailsItem(taskId) {
    const selectedTask = filtersArray.filter((s) => s.id === taskId)[0];

    setSelectedTask(selectedTask);
    setOpenModal(true);
  }

  return (
    <View style={styles.container}>
      <View style={{width: "90%"}}>
        <Input
          placeHolder="Buscar por nombre"
          onChangeValue={(value) => search(value)}
        />
      </View>
      <TodoList
        items={filtersArray}
        setItems={(items) => {
          saveList(items);
          setReload(!reload);
        }}
        loading={isLoading}
        onSelectItem={(id) => detailsItem(id)}
      />
      <StatusBar style="auto" />
      <FAB
        buttonColor="#007ACC"
        iconTextColor="#FFFFFF"
        onClickAction={() => setOpenModal(true)}
      />
      <AddTask
        open={openModal}
        addTask={addTask}
        close={() => {
          setOpenModal(false);
          setSelectedTask(null);
        }}
        edit={selectedTask}
      />
    </View>
  );
};

export default Home;
