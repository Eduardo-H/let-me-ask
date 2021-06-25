import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { 
  Container, 
  Hero, 
  Main, 
  Content,
  Form
} from '../../styles/home';

import { CreateRoomButton, Separator } from './styles';

export function Home() {
  const [roomCode, setRoomCode] = useState('');

  const history = useHistory();
  const { user, signWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user)
      await signWithGoogle();

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '')
      return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('This room was closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <Container>
      <Hero>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e repostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </Hero>
      
      <Main>
        <Content>
          <img src={logoImg} alt="Letmeask" />
          <CreateRoomButton onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo Google" />
            Crie sua sala com o Google
          </CreateRoomButton>
          <Separator>ou entre em uma sala</Separator>
          <Form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </Form>
        </Content>
      </Main>
    </Container>
  ); 
}