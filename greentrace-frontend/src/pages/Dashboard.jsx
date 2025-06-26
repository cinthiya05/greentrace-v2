import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { fetchAdminOverview } from '../api/api';

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
        <CircularProgress color="success" />
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

  const overviewColors = [
    'rgba(22, 101, 52, 0.15)',
    'rgba(29, 78, 216, 0.15)',
    'rgba(180, 83, 9, 0.15)',
    'rgba(126, 34, 206, 0.15)',
  ];

  const categoryColors = [
    'rgba(6, 182, 212, 0.15)',
    'rgba(132, 204, 22, 0.15)',
    'rgba(244, 63, 94, 0.15)',
    'rgba(234, 179, 8, 0.15)',
    'rgba(79, 70, 229, 0.15)',
    'rgba(236, 72, 153, 0.15)',
    'rgba(14, 165, 233, 0.15)',
  ];

  const categoryUnits = {
    electricity: 'kWh',
    food: 'kg',
    travel: 'km',
    shopping: 'items',
    water: 'liters',
    gas: 'm³',
    fuel: 'liters',
    clothing: 'items',
    plastic: 'kg',
    metal: 'kg',
    paper: 'kg',
    waste: 'kg',
    other: 'kg',
  };

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Larger Overview Cards */}
      <Grid container spacing={3}>
        {[
          {
            label: 'Average Emission',
            value: `${overview.average_emission} kg`,
            bg: overviewColors[0],
          },
          {
            label: 'Total Users',
            value: overview.total_users,
            bg: overviewColors[1],
          },
          {
            label: 'Total Activities',
            value: overview.total_activities,
            bg: overviewColors[2],
          },
          {
            label: 'Last Activity',
            value: new Date(overview.last_activity_date).toLocaleString(),
            bg: overviewColors[3],
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                background: item.bg,
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                color: '#000',
                boxShadow: 4,
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" gutterBottom fontSize="1.1rem">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" fontSize="1.8rem">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Section Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mt: 6,
          mb: 3,
          borderBottom: '2px solid #ccc',
          pb: 1,
        }}
      >
        Emissions by Category
      </Typography>

      {/* Normal-sized Category Cards */}
      <Grid container spacing={3}>
        {Object.entries(overview.emission_by_category).map(([category, value], index) => {
          const unit = categoryUnits[category.toLowerCase()] || 'kg';
          const bgColor = categoryColors[index % categoryColors.length];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: bgColor,
                  backdropFilter: 'blur(8px)',
                  borderRadius: 3,
                  color: '#000',
                  boxShadow: 4,
                  textAlign: 'center',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom fontSize="1rem">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {value} {unit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Dashboard;
