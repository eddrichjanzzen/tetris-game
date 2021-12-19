import styled from 'styled-components';

const StyledPlayPauseButton = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: 2px solid #808080;
  min-height: 30px;
  padding: 1em;
  width: 100%;
  color: ${(props) => (props.gameOver ? 'red' : '#999')};
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
`;

export default StyledPlayPauseButton;
