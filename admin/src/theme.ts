import { defaultTheme } from 'react-admin';

export const rvaTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: '#003DA5',
      light: '#3366C8',
      dark: '#002580',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFCE00',
      contrastText: '#1A1A1A',
    },
    error: {
      main: '#CE1126',
    },
    success: {
      main: '#009A44',
    },
    background: {
      default: '#F5F7FA',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h6: { fontWeight: 700 },
  },
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          '&.RaMenuItemLink-active': {
            backgroundColor: '#003DA5',
            color: '#ffffff',
            '& .MuiSvgIcon-root': { color: '#FFCE00' },
          },
        },
      },
    },
  },
};
