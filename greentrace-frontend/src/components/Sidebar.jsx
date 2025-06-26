import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForestIcon from '@mui/icons-material/Forest';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import HistoryIcon from '@mui/icons-material/History';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const pages = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Submit Activity', icon: <ForestIcon />, path: '/submitactivity' },
    { text: 'Graph', icon: <InsertChartIcon />, path: '/graph' },
    { text: 'History', icon: <HistoryIcon />, path: '/history' },
    { text: 'GreenChat', icon: <ChatIcon />, path: '/greenchat' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#0f172a',
          color: '#fff',
        },
      }}
    >
      <Toolbar />
      <List>
        {pages.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon sx={{ color: '#a5f3fc' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
