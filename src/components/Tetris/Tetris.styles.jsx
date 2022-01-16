import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  margin: 0 auto;
  width: 100%;
  aside {
    width: 100%;
    max-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 1.2em;
    padding: 0 20px;
  }
`;
