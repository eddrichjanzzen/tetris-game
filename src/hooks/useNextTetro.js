import { useState, useEffect } from 'react';
import { createNextTetro } from '../gameHelpers';

const useNextTetro = (player, resetPlayer) => {
  const [nextTetro, setNextTetro] = useState(createNextTetro());

  useEffect(() => {
    const updateNextTetro = (prevTetro) => {
      const newNextTetro = prevTetro.map((row) => row.map(() => 0));

      // Then draw the tetromino
      player.nextTetro.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newNextTetro[y][x] = value;
          }
        });
      });

      return newNextTetro;
    };

    setNextTetro((prev) => updateNextTetro(prev));
  }, [player, resetPlayer]);

  return [nextTetro, setNextTetro];
};

export default useNextTetro;
