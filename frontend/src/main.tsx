import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './theme/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme.ts';
import ToastNotification from './components/ToastNotification.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ToastNotification />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
