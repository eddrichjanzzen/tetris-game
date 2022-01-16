import React, { useState, useEffect } from 'react';

import { StyledTetrisWrapper, StyledTetris } from './Tetris.styles';
import { createStage, createNextTetro, checkCollision } from '../../gameHelpers';

import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';
import ViewBox from '../ViewBox/ViewBox';
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';

import usePlayer from '../../hooks/usePlayer';
import useStage from '../../hooks/useStage';
import useInterval from '../../hooks/useInterval';
import useNextTetro from '../../hooks/useNextTetro';
import useGameStatus from '../../hooks/useGameStatus';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(true);

  const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [nextTetro, setNextTetro] = useNextTetro(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const levelSpeed = 1000 / (level + 1) + 200;

  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({
        x: direction,
        y: 0,
        collided: false,
      });
    }
  };

  const increaseLevel = () => {
    // increase level when player cleared 10 rows
    if (rows >= level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(levelSpeed);
    }
  };

  useEffect(() => {
    increaseLevel();
  }, [rows]);

  const startGame = () => {
    setStage(createStage());
    setNextTetro(createNextTetro());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setRows(0);
    setLevel(1);
    setGameOver(false);
    setGamePaused(false);
  };

  const hardDrop = () => {
    let pot = 0;
    while (!checkCollision(player, stage, { x: 0, y: pot })) {
      pot += 1;
    }
    updatePlayerPosition({ x: 0, y: pot - 1, collided: true });
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({
        x: 0,
        y: 1,
        collided: false,
      });
    } else if (player.pos.y < 1) {
      setGameOver(true);
      setDropTime(null);
    } else {
      updatePlayerPosition({
        x: 0,
        y: 0,
        collided: true,
      });
    }
  };

  const onKeyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(levelSpeed);
      } else if (keyCode === 32) {
        setDropTime(levelSpeed);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const togglePlayPause = () => {
    setGamePaused((previousState) => (!previousState));
  };

  const onMove = ({ keyCode }) => {
    if (!gameOver && !gamePaused) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        rotatePlayer(stage, 1);
      } else if (keyCode === 90) {
        rotatePlayer(stage, -1);
      } else if (keyCode === 32) {
        hardDrop();
      }
    }
  };

  useInterval(() => {
    if (!gamePaused) {
      drop();
    }
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={onMove}
      onKeyUp={onKeyUp}
    >
      <StyledTetris>
        <Stage
          stage={stage}
          isPaused={gamePaused}
        />
        <aside>
          <ViewBox
            nextTetro={nextTetro}
            tetromino={player.nextTetro}
          />
          {gameOver ? (
            <Display
              gameOver={gameOver}
              text="Game Over"
            />
          )
            : (
              <>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </>
            )}
          <StartButton callback={startGame} />
          <PlayPauseButton
            isPlaying={gamePaused}
            onClick={togglePlayPause}
          />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
