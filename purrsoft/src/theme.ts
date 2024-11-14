import { createTheme } from '@mui/material/styles';
import { TypeBackground } from '@mui/material';

// Define the additional palette types
declare module '@mui/material/styles' {
  interface Palette {
    accent?: {
      darkGreen: string;
      beige: string;
      green: string;
      lightGreen: string;
      lightBeige: string;
    };
    background: TypeBackground; // For Palette, background is TypeBackground
  }

  interface PaletteOptions {
    accent?: {
      darkGreen: string;
      beige: string;
      green: string;
      lightGreen: string;
      lightBeige: string;
      white: string;
    };
    background?: Partial<TypeBackground>; // For PaletteOptions, background is Partial<TypeBackground> | undefined
  }
}

// Define the theme
export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    accent: {
      lightGreen: '#86AC7A',
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
    fontFamily: 'Poppins, Arial, sans-serif', // Set default font family to Poppins

    // Set up h1 with Body Grotesque Large
    h1: {
      fontFamily: 'Body Grotesque Large, Arial, sans-serif', // Use Body Grotesque Large for h1
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#63806F', // Set dark green color for h1
    },

    // Other header and body styles
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 400,
      color: '#63806F', // Set dark green color for h3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#63806F', // Set dark green color for h3
    },
    h6: {
      fontSize: '0.75rem',
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

    // Set up body1 with Poppins and green color
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Poppins, Arial, sans-serif',
      color: '#617d54', // Set green color for body text
    },

    // Set up body2
    body2: {
      fontSize: '0.88rem',
      fontWeight: 400,
      fontFamily: 'Poppins, Arial, sans-serif',
      color: '#617d54',
    },

    // Other typography styles
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
