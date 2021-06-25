import styled from 'styled-components';

export const Container = styled.div`
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + .question {
    margin-top: 8px;
  }

  &.highlighted {
    background: #f4f0ff;
    border: 1px solid #835afd;

    footer .user-info span {
      color: #262629;
    }
  }

  &.answered {
    background: #dbdbdb;
  }

  p {
    color: #29292e;
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
      color: #737380;
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
      color: #737380;
      gap: 8px;        

      &.liked {
        color: #835afd;

        svg path {
          stroke: #835afd;
        }
      }
    }

    &:hover {
      filter: brightness(0.8);
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