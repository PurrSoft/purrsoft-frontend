import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
