import { ReactNode } from 'react';
import cx from 'classnames';

import {
  Container,
  Footer
} from './styles';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isAnswered?: boolean;
  isHighlighted?: boolean;
  children?: ReactNode;
}

export function Question({ 
  content, 
  author,
  isAnswered = false,
  isHighlighted = false,
  children
}: QuestionProps) {
  return (
    <Container 
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{ content }</p>
      <Footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{ author.name }</span>
        </div>

        <div className="admin-functions">{ children }</div>
      </Footer>
    </Container>
  );
}