import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/useAuth';
import { AdminRoom } from './pages/AdminRoom';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import './services/firebase';

import lightLogoImg from './assets/images/light_logo.svg';
import darkLogoImg from './assets/images/dark_logo.svg';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from './styles/global';

function App() {
  const [theme, setTheme] = useState(light);
  const [logo, setLogo] = useState(darkLogoImg);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('@letmeask:theme');

    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    } else {
      setTheme(light);
      setLogo(darkLogoImg);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@letmeask:theme', JSON.stringify(theme));
    setLogo(theme.title === 'light' ? darkLogoImg : lightLogoImg);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light);
  }
  
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route 
              path="/" 
              exact 
              component={() =>  <Home theme={theme.title} toggleTheme={toggleTheme} logo={logo} />}
            />
            <Route 
              path="/rooms/new" 
              component={() => <NewRoom theme={theme.title} toggleTheme={toggleTheme} logo={logo} />} 
            />
            <Route 
              path="/rooms/:id" 
              component={() => <Room theme={theme.title} toggleTheme={toggleTheme} logo={logo} />} 
            />

            <Route 
              path="/admin/rooms/:id" 
              component={() => <AdminRoom theme={theme.title} toggleTheme={toggleTheme} logo={logo} />}
            />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
