import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider
} from '@mui/material';
import API from '../api/api';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user_id = localStorage.getItem('user_id'); // Assumes user_id is stored

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/get_history/${user_id}`);
        setHistory(res.data.history || []);
      } catch (err) {
        setError('Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user_id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Carbon Footprint History
      </Typography>

      <Grid container spacing={3}>
        {history.map((entry, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  Date: {entry.date}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Notes: {entry.notes || 'N/A'}
                </Typography>
                <Divider sx={{ my: 1 }} />

                {entry.result?.total_emission !== null ? (
                  <>
                    <Typography>Total Emission: {entry.result.total_emission} kg</Typography>
                    <Typography>Electricity: {entry.result.electricity_emission} kg</Typography>
                    <Typography>Travel: {entry.result.travel_emission} kg</Typography>
                    <Typography>Food: {entry.result.food_emission} kg</Typography>
                    <Typography>Shopping: {entry.result.shopping_emission} kg</Typography>
                  </>
                ) : (
                  <Typography color="textSecondary">Calculation pending</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HistoryPage;
