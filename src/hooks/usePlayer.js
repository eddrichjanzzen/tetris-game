/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    nextTetro: randomTetromino().shape,
    collided: false,
  });

  const rotate = (matrix, direction) => {
    const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));

    if (direction > 0) return rotatedTetro.map((row) => row.reverse());

    return rotatedTetro.reverse();
  };

  const rotatePlayer = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => ({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: prev.nextTetro,
      nextTetro: randomTetromino().shape,
      collided: false,
    }));
  }, []);

  return [player, updatePlayerPos, resetPlayer, rotatePlayer];
};

export default usePlayer;
