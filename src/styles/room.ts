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
  align-items: center;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: ${props => props.theme.colors.text};
  }

  span {
    margin-left: 26px;
    background: ${props => props.theme.colors.pink};
    border-radius: 9999px;
    padding: 8px 16px;
    color: #FFF;
    font-weight: 500;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 18px;
    }

    span {
      margin-left: 12px;
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
  }
`;

export const QuestionList = styled.div`
  margin-top: 32px;
`;