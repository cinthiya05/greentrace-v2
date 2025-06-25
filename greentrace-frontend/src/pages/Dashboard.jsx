import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Divider,
  Toolbar,
  AppBar,
  CssBaseline,
  IconButton,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { fetchAdminOverview } from '../api/api';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAdminOverview();
        setOverview(res.data);
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GreenTrace Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: '240px' }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', backdropFilter: 'blur(5px)' }}>
              <CardContent>
                <Typography variant="h6">Average Emission</Typography>
                <Typography variant="h4" color="primary">
                  {overview.average_emission} kg
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', backdropFilter: 'blur(5px)' }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4" color="primary">
                  {overview.total_users}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)', backdropFilter: 'blur(5px)' }}>
              <CardContent>
                <Typography variant="h6">Total Activities</Typography>
                <Typography variant="h4" color="primary">
                  {overview.total_activities}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'rgba(156, 39, 176, 0.1)', backdropFilter: 'blur(5px)' }}>
              <CardContent>
                <Typography variant="h6">Last Activity Date</Typography>
                <Typography variant="body1">
                  {new Date(overview.last_activity_date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(5px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emission by Category
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(overview.emission_by_category).map(([category, value]) => (
                  <Box key={category} display="flex" justifyContent="space-between" mb={1}>
                    <Typography>{category}</Typography>
                    <Typography color="primary">{value} kg</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
