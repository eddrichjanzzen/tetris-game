import styled from 'styled-components';

const isTransparent = (props) => (props.allowTransparent ? 0 : '0.1');
const cellOpacity = (props) => (props.type === 0 ? (isTransparent) : '0.7');

const StyledCell = styled.div`
  width: auto;
  background: rgba(${(props) => props.color}, ${cellOpacity});
  border: ${(props) => (props.type === 0 ? '0px solid' : '0.6vw solid')};
  border-color: rgba(${(props) => props.color});
`;

export default StyledCell;
