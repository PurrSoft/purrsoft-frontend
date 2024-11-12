import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';
import React from 'react';
import { App } from './App.tsx';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './theme.ts';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
