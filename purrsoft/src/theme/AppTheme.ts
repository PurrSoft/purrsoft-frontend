import { createTheme } from '@mui/material/styles';

const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#4B7F52',
    },
    background: {
      default: '#F5F1EE',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '24px',
          padding: '12px',
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F8F7F6',
            borderRadius: '16px',
            '&:hover fieldset': {
              borderColor: '#4B7F52',
            },
          },
        },
      },
    },
  },
});

export default AppTheme;
