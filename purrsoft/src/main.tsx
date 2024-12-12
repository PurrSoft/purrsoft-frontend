import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';
import React from 'react';
import { App } from './App.tsx';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './theme.ts';
import { CssBaseline, GlobalStyles } from '@mui/material';

const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      "::-webkit-scrollbar": {
        width: "12px",
      },
      "::-webkit-scrollbar-track": {
        background: theme.palette.accent?.green,
        borderRadius: "6px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.accent?.darkGreen, 
        borderRadius: "6px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: theme.palette.accent?.mutedGreen,
      },

      /* Buttons */
      "::-webkit-scrollbar-button": {
        borderStyle: 'solid',
        height: '8px',
        width: '8px',
      },

      /* Up */
      "::-webkit-scrollbar-button:vertical:decrement": {
        borderWidth: '0 7px 14px 7px',
        borderColor: `transparent transparent ${theme.palette.accent?.mutedGreen} transparent`,
      },

      /* Down */
      "::-webkit-scrollbar-button:vertical:increment": {
        borderWidth: '14px 7px 0 7px',
        borderColor: `${theme.palette.accent?.mutedGreen} transparent transparent transparent`,
      },

      /* Left */
      "::-webkit-scrollbar-button:horizontal:decrement": {
        borderWidth: '7px 14px 7px 0',
        borderColor: `transparent ${theme.palette.accent?.mutedGreen} transparent transparent`,
      },

      /* Right */
      "::-webkit-scrollbar-button:horizontal:increment": {
        borderWidth: '7px 0 7px 14px',
        borderColor: `transparent transparent transparent ${theme.palette.accent?.mutedGreen}`,
      },
    })}
  />
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline>
          {globalStyles}
          <App />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
