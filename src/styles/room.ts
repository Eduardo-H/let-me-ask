import styled from 'styled-components';

export const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.headerDivider};

  .content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
      max-height: 45px;
    }

    > div {
      display: flex;
      gap: 16px;
      align-items: center;

      button {
        height: 40px;
      }
    }
  }

  .logo-button {
    height: 40px;
    background: transparent;
    border: 0;
    cursor: pointer;

    img {
      height: 40px;
    }
  }

  @media (max-width: 768px) {
    .content {
      gap: 10px;

      > div {
        gap: 6px;
      }
    }
  }
`;

export const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 1080px) {
    padding: 0 20px;
  }
`;

export const RoomTitle = styled.div`
  margin: 32px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: ${props => props.theme.colors.text};
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    span {
      background: ${props => props.theme.colors.pink};
      border-radius: 9999px;
      padding: 8px 16px;
      color: #FFF;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .mode-button {
    height: 40px;
    padding: 0 18px;
    font-size: 14px;
  }

  .empty-questions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
  }

  @media (max-width: 768px) {
    display: block;

    h1 {
      font-size: 18px;
    }

    > div {
      margin-top: 10px;
      margin-left: 0px;

      span {
        font-size: 12px;
      }
    }

    .mode-button {
      height: 30px;
      padding: 0 14px;
      font-size: 12px;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  span {
    margin-left: 8px;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media (max-width: 500px) {
    span {
      max-width: 125px;
    }
  }
`;

export const QuestionList = styled.div`
  margin-top: 32px;
`;

export const EmptyQuestions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 32px;

  h3 {
    font-weight: 500;
    margin-top: 20px;
  }

  p {
    max-width: 400px;
    margin-top: 8px;
    text-align: center;
  }
`;