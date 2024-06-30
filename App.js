import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import TetrisGame from './TetrisGame';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tetris</Text>
      <TetrisGame />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default App;
