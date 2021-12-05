import React, { useState } from 'react';

import { StyledTetrisWrapper, StyledTetris } from './Tetris.styles';
import { createStage, checkCollision } from '../../gameHelpers';

import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

import usePlayer from '../../hooks/usePlayer';
import useStage from '../../hooks/useStage';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({
        x: direction,
        y: 0,
        collided: false,
      });
    }
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({
        x: 0,
        y: 1,
        collided: false,
      });
    } else {
      if (player.pos.y < 1) {
        console.log('GAME OVER');
        setGameOver(true);
        setDropTime(null);
      }

      updatePlayerPosition({
        x: 0,
        y: 0,
        collided: true,
      });
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const onMove = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => onMove(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display
              gameOver={gameOver}
              text="Game Over"
            />
          )
            : (
              <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
              </div>
            )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
