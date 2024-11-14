import { createTheme } from '@mui/material/styles';
import { TypeBackground } from '@mui/material';
declare module '@mui/material/styles' {
  interface Palette {
    accent?: {
      darkGreen: string;
      beige: string;
      green: string;
      lightBeige: string;
    };
    background: TypeBackground; // For Palette, background is TypeBackground
  }

  interface PaletteOptions {
    accent?: {
      darkGreen: string;
      beige: string;
      green: string;
      lightBeige: string;
      white: string;
    };
    background?: Partial<TypeBackground>; // For PaletteOptions, background is Partial<TypeBackground> | undefined
  }
}

export const appTheme = createTheme({
  palette: {
    accent: {
      green: '#617d54',
      darkGreen: '#63806F',
      beige: '#ECEADA',
      lightBeige: '#ebe7e0',
      white: '#fff',
    },
    background: {
      default: '#ebe7e0',
    },
  },
  typography: {
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.88rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.88rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.88rem',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 14,
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
            backgroundColor: '#ebe7e0',
            borderRadius: '16px',
            '&:hover fieldset': {
              borderColor: '#617d54',
            },
          },
        },
      },
    },
  },
});
