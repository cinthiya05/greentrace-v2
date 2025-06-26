import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountCircle,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useThemeMode } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  const [user, setUser] = useState({ id: '', name: '' });

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');
    setUser({ id: userId || 'N/A', name: userName || 'N/A' });
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear stored credentials
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GreenTrace Admin
        </Typography>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Profile Dropdown */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton onClick={handleMenuOpen} color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 200,
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Typography variant="body2">User ID: {user.id}</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant="body2">Name: {user.name}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
