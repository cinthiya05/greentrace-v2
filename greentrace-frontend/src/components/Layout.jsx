import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Space for AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
