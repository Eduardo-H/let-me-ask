import styled from 'styled-components';

export const Container = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  color: ${props => props.theme.colors.text};

  background: ${props => props.theme.title === 'light' ? '#fff' : '#29292E'};
  border: 1px solid ${props => props.theme.colors.purple};
  cursor: pointer;

  display: flex;
  
  div {
    background: ${props => props.theme.colors.purple};
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 240px;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    div {
      img {
        width: 15px;
      }
    }

    span {
      display: none;
    }
  }
`;