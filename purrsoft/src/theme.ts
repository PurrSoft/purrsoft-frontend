import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles/createPalette'{
    interface Palette {
        accent?: {
            green: string;
        };
    }
    interface PaletteOptions {
        accent?: {
            green: string;
        };
    }
}

export const appTheme = createTheme({
    palette: {
        accent: {
            green: '#FFA42C',
        }
    }
})