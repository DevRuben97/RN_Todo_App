import React, { Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ActivityIndicator,
  Alert
} from "react-native";
import CheckBox from 'react-native-check-box'

import deleteImage from "../../assets/img/trash.png";

const itemStyle = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    marginTop: 5,
    padding: 5,
    alignItems: "center",
  },
  itemDone: {
    borderColor: "blue",
  },
  Contentcontainer: {
    width: "80%",
    display: "flex",
  },
  container: {
    width: "100%",
  },
  sectionHeader: {
    backgroundColor: "#007ACC",
    padding: 10,
    color: "#FFF",
    flex:1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  emptyImage: {
    height: 50,
    width: 50,
  },
  deleteIcon: {
    height: 20,
    width: 20,
  },
  addIcon: {
    height: 20,
    width: 20,
  },
  loading: {
    flex:1
  }
});

const TodoList = ({ items, setItems, loading, onSelectItem }) => {
  function changeState(taskid, actualState) {
    const array = [...items];

    array.forEach((item) => {
      if (item.id === taskid) {
        item.completed = !actualState;
      }
    });
    setItems(array);
  }

  function deleteItem(taskid, name) {

    Alert.alert('¿Estas seguro de eliminar esta tarea?',name, [{
      text:'Cancelar',
      style: 'cancel'
    },{
      text: 'Aceptar',
      style: 'default',
      onPress: ()=> {
        let array = [...items];

        array = array.filter((s) => s.id !== taskid)

        setItems(array);
      }
    }])
  }



  function renderItem(item) {
    return (
      <TouchableOpacity
        style={itemStyle.listContainer}
        key={item.id}
        onLongPress={() => onSelectItem(item.id)}
      >
        <CheckBox
        checkedCheckBoxColor="#007ACC"
        isChecked={item.completed}
        onClick={()=> changeState(item.id, item.completed)}
        />
        <Text
          key={item.id}
          style={[itemStyle.item, item.completed && itemStyle.itemDone]}
        >
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => deleteItem(item.id, item.description)}>
          <Image source={deleteImage} style={itemStyle.deleteIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  }

  function remderEmpty() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/img/empty-icon.png")}
          style={itemStyle.emptyImage}
        />
        <Text>Lista Vacia</Text>
      </View>
    );
  }

  function renderSectionHeader({ section }) {
    return (
      <View style={itemStyle.sectionHeader}>
        <Text>
          {section.title} {`(${section.data.length})`}
        </Text>
      </View>
    );
  }

  return (
    <Fragment>
      {loading ? (
        <ActivityIndicator size="large" color="#007ACC" style={itemStyle.loading}/>
      ) : (
        <SectionList
          style={itemStyle.container}
          sections={
            items && items.length
              ? [
                  {
                    title: "Por Hacer",
                    data: items.sort((a,b)=> a.prioriy> b.prioriy).filter((s) => !s.completed),
                  },
                  {
                    title: "Completadas",
                    data: items.sort((a,b)=> a.prioriy> b.prioriy).filter((s) => s.completed),
                  },
                ]
              : []
          }
          renderItem={({ item }) => renderItem(item)}
          renderSectionHeader={renderSectionHeader}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={remderEmpty}
          stickySectionHeadersEnabled={true}
        ></SectionList>
      )}
    </Fragment>
  );
};

export default TodoList;