import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles/createPalette'{
    interface Palette {
        accent?: {
            darkGreen: string;
            beige: string;
        };
    }
    interface PaletteOptions {
        accent?: {
            darkGreen: string;
            beige: string;
        };
    }
}

export const appTheme = createTheme({
    palette: {
        accent: {
            darkGreen: '#63806F',
            beige: '#ECEADA',
        }
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
})