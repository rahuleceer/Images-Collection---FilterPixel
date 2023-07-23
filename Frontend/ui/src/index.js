import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/Auth.context';
import { GoogleOAuthProvider } from '@react-oauth/google';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

root.render(
  <GoogleOAuthProvider clientId="12087758202-dulb8sav7kfh6k3qvojusngjt03pfjg2.apps.googleusercontent.com">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
          <Router>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Router>
      </MantineProvider>
  </GoogleOAuthProvider>
);
