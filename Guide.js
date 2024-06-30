import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Guide = () => {
  return (
    <View style={styles.guide}>
      <Text>Use A, D, S, E, Q</Text>
      <Text>Space to drop down</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  guide: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Guide;
