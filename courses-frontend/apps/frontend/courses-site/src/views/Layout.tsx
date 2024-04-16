import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

export default function Layout() {
  return (
    <div>
      <CssBaseline />
      Menu
      <Outlet />
    </div>
  );
}
