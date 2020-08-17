import React from "react";
import { View, TouchableHighlight } from "react-native";
import Menu, { MenuItem } from "react-native-material-menu";
import Icon from "react-native-vector-icons/FontAwesome5";

const OptionsMenu = ({ options }) => {
  let _menu = null;

  function show() {
    _menu.show();
  }
  function hide() {
    _menu.hide();
  }

  return (
    <View style={{ paddingRight: 10 }}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          <TouchableHighlight onPress={show}>
            <Icon name="ellipsis-v" size={16}></Icon>
          </TouchableHighlight>
        }
      >
        {options.map((item, index) => (
          <MenuItem
            onPress={() => {
              hide();
              item.action();
            }}
            disabled={item.disabled}
            key={index}
          >
            <Icon name={item.icon} size={16} /> {item.title}
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
};

export default OptionsMenu;
