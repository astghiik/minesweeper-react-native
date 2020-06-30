import React from "react";
import { View, StyleSheet } from 'react-native';
import GameArea from "./app/components/GameArea";
import StartGame from './app/components/StartGame';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { allReducers } from './app/reducers';


const store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <GameArea />
        <StartGame />
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center'
  },


});
