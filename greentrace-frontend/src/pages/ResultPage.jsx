import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Button
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import API from '../api/api';

const ResultPage = () => {
  const { state } = useLocation();
  const result = state?.result;
  const input = state?.input;

  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);
    setError('');
    setSuggestion('');
    setShowSuggestionBox(true);

    try {
      const res = await API.post('/get_suggestions', {
        user_id: input.user_id,
        input_id: input.input_id ,
        summary: `User drove ${input.travel_km}km, used ${input.electricity_kwh}kWh of electricity, consumed ${input.meat_grams}g meat, and spent ₹${input.shopping_amount} on shopping.`,
        category: 'energy'
      });

      setSuggestion(res.data.suggestion);
    } catch (err) {
      setError('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  if (!result || !input) {
    return <Typography color="error">Invalid or missing data.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Your Carbon Footprint
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(result).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card>
              <CardContent>
                <Typography variant="h6">{key.toUpperCase()}</Typography>
                <Typography variant="h4" color="primary">
                  {value} kg
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={fetchSuggestion}
            sx={{ mt: 3, mb: 2 }}
          >
            GreenTrace Suggestions
          </Button>
        </Grid>

        {showSuggestionBox && (
          <Grid item xs={12}>
            <Card sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Suggestions to Reduce Your Carbon Footprint
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {loading ? (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress size={24} />
                  </Box>
                ) : error ? (
                  <Typography color="error">{error}</Typography>
                ) : (
                  <Typography variant="body2" whiteSpace="pre-line">
                    {suggestion}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ResultPage;
