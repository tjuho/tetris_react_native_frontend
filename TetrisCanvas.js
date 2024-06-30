import React from 'react';
import {View, StyleSheet} from 'react-native';

const TetrisCanvas = ({boardState, width, height}) => {
  const cellSize = 20;

  const renderCell = (cellValue, rowIndex, colIndex) => {
    const letterColors = {
      '.': 'grey',
      T: 'orange',
      I: 'blue',
      O: 'cyan',
      S: 'green',
      Z: 'red',
      L: 'purple',
      M: 'yellow',
    };

    const backgroundColor = letterColors[cellValue];

    return (
      <View
        key={`${rowIndex}-${colIndex}`}
        style={[
          styles.cell,
          {backgroundColor, width: cellSize, height: cellSize},
        ]}
      />
    );
  };

  return (
    <View style={{flexDirection: 'column'}}>
      {boardState.map((row, rowIndex) => (
        <View key={rowIndex} style={{flexDirection: 'row'}}>
          {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default TetrisCanvas;
