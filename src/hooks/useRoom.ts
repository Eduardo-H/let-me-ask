import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, valeu]) => {
        return {
          id: key,
          content: valeu.content,
          author: valeu.author,
          isAnswered: valeu.isAnswered,
          isHighlighted: valeu.isHighlighted,
          likeCount: Object.values(valeu.likes ?? {}).length,
          likeId: Object.entries(valeu.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setAuthorId(databaseRoom.authorId);
      setIsLoading(false);
    });

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { questions, title, authorId, isLoading };
}