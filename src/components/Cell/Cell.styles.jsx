import styled from 'styled-components';

const StyledCell = styled.div`
  width: auto;
  background: rgba(${(props) => props.color}, ${(props) => (props.type === 0 ? '0.1' : '0.7')});
  border: ${(props) => (props.type === 0 ? '0px solid' : '10px solid')};
  border-color: rgba(${(props) => props.color});
`;

export default StyledCell;
