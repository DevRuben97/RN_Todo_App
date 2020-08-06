import "react-native-gesture-handler";
import React, {Fragment} from "react";
import {StatusBar} from 'react-native'

import AppNavigator from "./src/components/Navigation/AppNavigator";

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content"/>
      <AppNavigator />
    </Fragment>
  );
}
