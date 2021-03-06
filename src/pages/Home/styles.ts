import styled from 'styled-components';

export const CreateRoomButton = styled.button`
  margin-top: 64px;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: ${props => props.theme.colors.red};
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Separator = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.divider};

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.divider};
    margin-right: 16px;
  }

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.divider};
    margin-left: 16px;
  }
`;