import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const ButtonTop = styled.div<{ props?: boolean }>`
  width: 100%;
  background-color: ${(e) => (e.props ? '#7F7F82' : '#000')};
  border: none;
  color: white;
  padding: 12px 24px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: ${(e) => (e.props ? 'not-allowed' : 'pointer')};
  text-align: center;
  /* @media screen and (max-width: '768px') {
    padding: 10px 15px;
    font-size: 14px;
    width: 100%;
  } */
`;

export const Loader = styled.span<{ props?: boolean }>`
  padding: 0 3px;
`;
