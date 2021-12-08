import styled from 'styled-components';

const StyledCell = styled.div`
  width: auto;
  background: rgba(${(props) => props.color}, ${(props) => (props.type === 0 ? '0.15' : '0.65')});
  border: ${(props) => (props.type === 0 ? '0px solid' : '10px solid')};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 0.1);
  border-top-color: rgba(${(props) => props.color}, 0.1);
  border-left-color: rgba(${(props) => props.color}, 0.4);
`;

export default StyledCell;
