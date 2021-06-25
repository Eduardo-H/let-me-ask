import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import illustrationImg from '../../assets/images/illustration.svg';

import { 
  Container, 
  Hero, 
  Main, 
  Content,
  Form
} from '../../styles/home';
import { ThemeToggler } from '../../components/ThemeToggler';

type NewRoomProps = {
  theme: string;
  logo: string;
  toggleTheme: () => void;
}

export function NewRoom({ theme, logo, toggleTheme }: NewRoomProps) {
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();
  const { user } = useAuth();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
  
    if (newRoom.trim() === '')
      return;
    
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <img src={logo} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          
          <Form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </Form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>

          <div className="theme-toggle">
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          </div>
        </Content>
      </Main>
    </Container>
  ); 
}