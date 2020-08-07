import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View
} from "react-native";

import FAB from "react-native-fab";

import TodoList from "../../components/List/TodoList";
import AddTask from "../../components/AddTask";

//----------DATA---------------------
import {getList, saveList} from '../../Data/Tasks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderBottomColor: "black",
    width: "50%",
  },
});

const Home = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedTask, setSelectedTask]= useState(null);

  function generateIds() {
    return Math.random() * 1000000;
  }

 async function addTask({ item, description, priority }, edit) {
    const array = [...data];

    if (!edit){
      array.push({
        id: generateIds(),
        name: item,
        description: description,
        priority: priority,
        completed: false,
      });
    }
    else{
      array.forEach(editItem=> {
        if (editItem.id=== edit){
          editItem.name= item;
          editItem.description= description;
          editItem.priority= priority;
        }
      })
    }
    await saveList(array);
    setReload(!reload);
  }

  function detailsItem(taskId){

    const selectedTask= data.filter(s=> s.id=== taskId)[0];

    setSelectedTask(selectedTask);
    setOpenModal(true);
}

  useEffect(() => {
    async function fecth() {
      setLoading(true);
      const list= await getList();
      setdata(list);
      setLoading(false);
    }
    fecth();
  }, [reload]);

  return (
    <View style={styles.container}>
      <TodoList 
      items={data} 
      setItems={(items)=> {
        saveList(items);
        setReload(!reload);
      }} 
      loading={isLoading}
      onSelectItem={(id)=> detailsItem(id)}
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
