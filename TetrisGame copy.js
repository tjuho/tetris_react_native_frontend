import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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

  useEffect(() => {
    const handleKeyPress = event => {
      const actions = {
        KeyA: () => tetrisBoard.moveLeft(),
        KeyD: () => tetrisBoard.moveRight(),
        KeyS: () => tetrisBoard.moveDown(),
        KeyE: () => tetrisBoard.rotateRight(),
        KeyQ: () => tetrisBoard.rotateLeft(),
        Space: () => tetrisBoard.fallDown(),
      };

      if (actions[event.code]) {
        actions[event.code]();
        setBoardState(tetrisBoard.getState());
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [tetrisBoard]);

  useEffect(() => {
    const interval = setInterval(() => {
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
    return () => clearInterval(interval);
  }, [level, tetrisBoard, tetrisScore, tetrisShuffleBag]);

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

  useEffect(() => {
    if (gameOver) {
      setTetrisBoard(new TetrisBoard(width, height));
      setGameOver(false);
    }
  }, [gameOver]);

  return (
    <View style={styles.tetrisGame}>
      <TetrisCanvas boardState={boardState} width={width} height={height} />
      <Score score={score} level={level} />
      <Guide />
    </View>
  );
};

const styles = StyleSheet.create({
  tetrisGame: {
    alignItems: 'center',
  },
});

export default TetrisGame;
