import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";

import FAB from 'react-native-fab';
 
import TodoList from "../../components/List/TodoList";
import AddTask from '../../components/AddTask';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  textInput: {
    borderWidth: 1,
    borderBottomColor: "black",
    width: "50%",
  },
});

const Home = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading]= useState(false);
  const [openModal, setOpenModal]= useState(false);
  const [reload, setReload]= useState(false);

  function generateIds() {
    return Math.random() * 1000000;
  }

  function addTask({item, description, priority}) {
    const array = [...data];

    array.push({
      id: generateIds(),
      name: item,
      description: description,
      priority: priority,
      completed: false,
    });
    setdata(array);
  }

  useEffect(() => {
    function fecth() {
      setLoading(true)
      setTimeout(() => {
        setdata([
          {
            id: generateIds(),
            name: 'Primera tarea',
            description: "Descripción de la tarea",
            priority: 0,
            completed: false,
          },
          {
            id: generateIds(),
            name: 'Primera tarea',
            description: "Descripción de la tarea",
            priority: 0,
            completed: false,
          },
          {
            id: generateIds(),
            name: 'Primera tarea',
            description: "Descripción de la tarea",
            priority: 0,
            completed: false,
          },
          {
            id: generateIds(),
            name: 'Primera tarea',
            description: "Descripción de la tarea",
            priority: 0,
            completed: false,
          },
          {
            id: generateIds(),
            name: 'Primera tarea',
            description: "Descripción de la tarea",
            priority: 0,
            completed: false,
          }
        ]);
        setLoading(false);
      }, 3000);
    }
    fecth();
  }, [reload]);

  return (
    <SafeAreaView style={styles.container}>
      <TodoList 
      items={data} 
      setItems={setdata} 
      loading={isLoading}
      />
      <StatusBar style="auto" />
      <FAB 
      buttonColor="#007ACC"
      iconTextColor="#FFFFFF"
      onClickAction={()=> setOpenModal(true)}
      />
      <AddTask
      open={openModal}
      addTask={addTask}
      close={()=> {
        setOpenModal(false)
      }}
      />
    </SafeAreaView>
  );
};

export default Home;
