import styled from 'styled-components';

export const Form = styled.form`
  textarea {
    width: 100%;
    border: 0;
    padding: 16px;
    border-radius: 8px;
    background: #fefefe;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    resize: vertical;
    min-height: 130px;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  > span {
    font-size: 14px;
    color: #737380;
    font-weight: 500;

    button {
      background: transparent;
      border: 0;
      color: #855AFD;
      text-decoration: underline;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;