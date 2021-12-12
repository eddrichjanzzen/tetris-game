import React from 'react';
import StyledCell from './Cell.styles';
import { TETROMINOS } from '../../tetrominos';

const Cell = ({ type, allowTransparent = false }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} allowTransparent={allowTransparent} />
);

export default React.memo(Cell);
