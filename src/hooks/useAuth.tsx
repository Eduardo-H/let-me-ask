import { useEffect } from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
  signWithGoogle: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>();

  async function signWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}