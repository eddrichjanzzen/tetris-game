/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyledViewBox, StyledTetrominoGrid } from './ViewBox.styles';
import Cell from '../Cell/Cell';

const ViewBox = ({ grid }) => (
  <StyledViewBox>
    <StyledTetrominoGrid
      grid={grid}
      width={grid[0].length}
      height={grid.length}
    >
      {grid.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
    </StyledTetrominoGrid>
  </StyledViewBox>
);

export default ViewBox;
