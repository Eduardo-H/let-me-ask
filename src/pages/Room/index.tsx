import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import { useRoom } from '../../hooks/useRoom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { ThemeToggler } from '../../components/ThemeToggler';
import { database } from '../../services/firebase';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import emptyQuestionsImg from '../../assets/images/empty-questions.svg';

import {
  Header,
  Main,
  RoomTitle,
  QuestionList,
  UserInfo,
  EmptyQuestions,
  Loading
} from '../../styles/room';

import { Form, FormFooter } from './styles';

type RoomParams = {
  id: string;
}

type RoomProps = {
  theme: string;
  logo: string;
  toggleTheme: () => void;
}

export function Room({ theme, logo, toggleTheme }: RoomProps) {
  const [newQuestion, setNewQuestion] = useState('');
  
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const history = useHistory();

  const { user, signWithGoogle } = useAuth();
  const { title, questions, authorId, isLoading } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '')
      return;

    if (!user) {
      throw new Error('You need to be logged in to send a question');
    }
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      });
    }
  }

  async function handleSignInWithGoogle() {
    await signWithGoogle();
  }

  function handleGoToHome() {
    history.push('/');
  }

  function handleGoToAdminMode() {
    history.push(`/admin/rooms/${roomId}`)
  }

  return (
    <div>
      <Header>
        <div className="content">
          <button 
            type="button" 
            onClick={handleGoToHome}
            className="logo-button"
          >
            <img src={logo} alt="Letmeask" />
          </button>

          <div>
            <RoomCode code={roomId} />
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          </div>          
        </div>
      </Header>

      <Main>
        <RoomTitle>
          <h1>Sala {title}</h1>
          
          <div>
            { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }

            {
              user?.id === authorId && (
                <Button 
                  onClick={handleGoToAdminMode}
                  className="mode-button"
                >
                  Modo admin
                </Button>
              )
            }
          </div>
        </RoomTitle>

        <Form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que voc?? quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <FormFooter>
            {
              user ? (
                <UserInfo>
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </UserInfo>
              ) : (
                <span>
                  Para enviar uma pergunta, 
                  <button 
                    onClick={handleSignInWithGoogle}
                  >
                    fa??a seu login.
                  </button>
                </span>
              )
            }
            <Button
              type="submit"
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </FormFooter>
        </Form>

        {
          isLoading 
          ? (
            <Loading>
              <AiOutlineLoading3Quarters />
              <p>Carregando...</p>
            </Loading>
          )
          : questions.length > 0 ? (
            <QuestionList>
              {
                questions.map(question => (
                  <Question 
                    key={question.id}
                    content={question.content} 
                    author={question.author} 
                    isAnswered={question.isAnswered} 
                    isHighlighted={question.isHighlighted}
                  >
                    {
                      !question.isAnswered && (
                        <button
                          className={`like-button ${question.likeId ? 'liked' : ''}`}
                          type="button"
                          aria-label="Marcar como gostei"
                          onClick={() => handleLikeQuestion(question.id, question.likeId)}
                        >
                          { question.likeCount > 0 && <span>{question.likeCount}</span> }
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )
                    }
                  </Question>
                ))
              }
            </QuestionList>
          ) : (
            <EmptyQuestions>
              <img 
                src={emptyQuestionsImg} 
                alt="Ilustra????o de tr??s bal??es de fala, representando que n??o existem perguntas na sala"
              />
              <h3>Nenhuma pergunta por aqui...</h3>
              <p>
                { 
                  user 
                  ? 'Vamos l??, agite as coisas, seja o primeiro a fazer uma pergunta!' 
                  : 'Fa??a o seu login e seja a primeira pessoa a fazer uma pergunta!'
                }
              </p>
            </EmptyQuestions>
          )
        }
      </Main>
    </div>
  );
}