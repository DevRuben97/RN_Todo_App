import React, { Fragment } from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    marginBottom: 5,
    width: "100%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "black",
  },
});

const Input = ({ placeHolder, onChangeValue, value, multiline }) => {
  return (
    <Fragment>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        onChangeText={(value) => onChangeValue(value)}
        clearTextOnFocus
        clearButtonMode="unless-editing"
        inlineImageLeft=""
        value={value}
        multiline={multiline}
      />
    </Fragment>
  );
};

export default Input;
