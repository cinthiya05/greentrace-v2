import { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { fetchGraphData } from '../api/api';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const GraphPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('user_id') || 1;

    fetchGraphData(userId)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError('Failed to load graph data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (error) return <Box p={4}><Alert severity="error">{error}</Alert></Box>;
  if (!data) return null;

  // Pie data
  const categoryData = Object.entries(data.category_summary).map(([key, value]) => ({
    name: key,
    value
  }));

  // Line chart data
  const trendData = data.trend.dates.map((date, idx) => ({
    date,
    total: data.trend.totals[idx]
  }));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Carbon Emission Overview</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Category Wise Emissions</Typography>
            <PieChart width={400} height={300}>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Emission Trend Over Time</Typography>
            <LineChart width={500} height={300} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphPage;
