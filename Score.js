import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Score = ({score, level}) => {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>Level: {level}</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Score;
