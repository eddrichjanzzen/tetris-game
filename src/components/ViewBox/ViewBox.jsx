/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyledViewBox, StyledTetrominoGrid } from './ViewBox.styles';
import Cell from '../Cell/Cell';

const ViewBox = ({ nextTetro }) => (
  <StyledViewBox>
    <StyledTetrominoGrid
      nextTetro={nextTetro}
      width={nextTetro[0].length}
      height={nextTetro.length}
    >
      {nextTetro.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
    </StyledTetrominoGrid>
  </StyledViewBox>
);

export default ViewBox;
