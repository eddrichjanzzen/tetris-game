import styled from 'styled-components';

export const StyledViewBox = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border: 2px solid #808080;
  min-height: 200px;
  width: 100%;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
`;

export const StyledTetrominoGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(8vw / ${((props) => props.width)})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 2px;
  width: 100%;
  max-width: 8vw;
  background: white;
`;
