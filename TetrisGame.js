import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import TetrisCanvas from './TetrisCanvas';
import Score from './Score';
import Guide from './Guide';
import {Board as TetrisBoard} from './backend/Board.mjs';
import {Score as TetrisScore} from './backend/Score.mjs';
import {MyShuffleBag} from './backend/MyShuffleBag.mjs';
import {Tetromino} from './backend/Tetromino.mjs';

const TetrisGame = () => {
  const width = 10;
  const height = 20;
  const [tetrisBoard, setTetrisBoard] = useState(
    new TetrisBoard(width, height),
  );
  const [tetrisShuffleBag, setTetrisShuffleBag] = useState(null);
  const [tetrisScore, setTetrisScore] = useState(new TetrisScore());
  const [boardState, setBoardState] = useState(tetrisBoard.getState());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game loop for dropping tetrominos and updating game state
  useEffect(() => {
    const gameInterval = setInterval(() => {
      if (tetrisBoard.hasFalling()) {
        tetrisBoard.tick();
        if (!tetrisBoard.hasFalling()) {
          tetrisBoard.drop(tetrisShuffleBag.getRandomObject());
        }
      } else {
        tetrisBoard.drop(tetrisShuffleBag.getRandomObject());
      }
      setBoardState(tetrisBoard.getState());
      setScore(tetrisScore.score);
      setLevel(tetrisScore.level);
    }, 2000 / (level + 1));

    return () => clearInterval(gameInterval);
  }, [level, tetrisBoard, tetrisScore, tetrisShuffleBag]);

  // Observers for game over and score updates
  useEffect(() => {
    const gameOverObserver = {
      update: isOver => setGameOver(isOver),
    };
    tetrisBoard.addGameOverObserver(gameOverObserver);

    const tempScore = new TetrisScore();
    tetrisBoard.addRowObserver(tempScore);
    setTetrisScore(tempScore);

    const tetrominoes = [
      Tetromino.T_SHAPE,
      Tetromino.I_SHAPE,
      Tetromino.O_SHAPE,
      Tetromino.S_SHAPE,
      Tetromino.Z_SHAPE,
      Tetromino.L_SHAPE,
      Tetromino.M_SHAPE,
    ].flatMap(shape => Array(10).fill(shape));

    setTetrisShuffleBag(new MyShuffleBag(tetrominoes));

    return () => {
      tetrisBoard.removeGameOverObservers();
      tetrisBoard.removeRowObservers();
    };
  }, [tetrisBoard]);

  // Reset the game when game over
  useEffect(() => {
    if (gameOver) {
      setTetrisBoard(new TetrisBoard(width, height));
      setGameOver(false);
    }
  }, [gameOver]);

  // Button press handlers
  const handleMoveLeft = () => {
    tetrisBoard.moveLeft();
    setBoardState(tetrisBoard.getState());
  };

  const handleMoveRight = () => {
    tetrisBoard.moveRight();
    setBoardState(tetrisBoard.getState());
  };

  const handleMoveDown = () => {
    tetrisBoard.moveDown();
    setBoardState(tetrisBoard.getState());
  };

  const handleRotateRight = () => {
    tetrisBoard.rotateRight();
    setBoardState(tetrisBoard.getState());
  };

  const handleRotateLeft = () => {
    tetrisBoard.rotateLeft();
    setBoardState(tetrisBoard.getState());
  };

  const handleFallDown = () => {
    tetrisBoard.fallDown();
    setBoardState(tetrisBoard.getState());
  };

  return (
    <View style={styles.tetrisGame}>
      <TetrisCanvas boardState={boardState} width={width} height={height} />
      <Score score={score} level={level} />
      <Guide />

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMoveLeft}>
          <Text>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMoveRight}>
          <Text>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMoveDown}>
          <Text>Down</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRotateRight}>
          <Text>Rotate Right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRotateLeft}>
          <Text>Rotate Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFallDown}>
          <Text>Fall Down</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tetrisGame: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default TetrisGame;
