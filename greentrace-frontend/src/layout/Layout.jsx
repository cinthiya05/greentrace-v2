import { Box, Toolbar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f8fafc', minHeight: '100vh', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
