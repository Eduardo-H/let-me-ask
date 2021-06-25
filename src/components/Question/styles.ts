import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + .question {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${transparentize(0.9, '#835AFD')};
    border: 1px solid ${props => props.theme.colors.purple};

    footer .user-info span {
      color: ${props => props.theme.colors.textSecondary};
    }
  }

  &.answered {
    background: ${transparentize(0.9, '#57F279')};
    border: 1px solid ${props => props.theme.colors.green};
  }

  p {
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;

  > div {
    display: flex;
    gap: 16px;
  }

  .user-info {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      color: ${props => props.theme.colors.textSecondary};
      font-size: 14px;
    }
  }
  
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    transition: 0.2s;

    &.like-button {
      display: flex;
      align-items: flex-end;
      color: ${props => props.theme.colors.textSecondary};
      gap: 8px;    
      
      svg path {
        stroke: ${props => props.theme.colors.textSecondary};
      }

      &.liked {
        color: ${props => props.theme.colors.purple};

        svg path {
          stroke: ${props => props.theme.colors.purple};
        }
      }
    }

    &:hover {
      filter: brightness(0.8);
    }
  }

  .admin-functions button svg {
    path, circle {
      stroke: ${props => props.theme.colors.textSecondary};
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;

    > div {
      gap: 10px;
    }

    .user-info img {
      width: 28px;
      height: 28px;
    }

    button svg,
    .admin-functions button img {
      width: 20px;
      height: 20px;
    }
  }
`;