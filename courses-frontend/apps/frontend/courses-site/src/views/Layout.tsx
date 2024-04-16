import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MenuComponent from '../components/menu/menu.component';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      dark: '#fff',
      light: '#000'
    },
    mode: 'dark'
  }
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <MenuComponent />
        <Box
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            padding: '5px 5px 0 5px'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
