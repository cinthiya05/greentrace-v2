import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert
} from '@mui/material';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const SubmitActivity = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: localStorage.getItem('user_id') || '',
    date: new Date().toISOString().slice(0, 10),
    travel_km: '',
    public_transit: '',
    electricity_kwh: '',
    gas_kg: '',
    meat_grams: '',
    dairy_grams: '',
    shopping_amount: '',
    notes: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const convertToNumeric = (data) => ({
    ...data,
    user_id: parseInt(data.user_id),
    travel_km: parseFloat(data.travel_km),
    public_transit: parseFloat(data.public_transit),
    electricity_kwh: parseFloat(data.electricity_kwh),
    gas_kg: parseFloat(data.gas_kg),
    meat_grams: parseFloat(data.meat_grams),
    dairy_grams: parseFloat(data.dairy_grams),
    shopping_amount: parseFloat(data.shopping_amount)
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  const formDataNumeric = convertToNumeric(formData);

  try {
    // 1. Submit activity
    const submitRes = await API.post('/submit_activity', formDataNumeric);

    const input_id = submitRes.data.input_id;
    if (!input_id) throw new Error("No input_id returned from API");

    // 2. Calculate footprint
    const footprintRes = await API.post('/calculate_footprint', {
      input_id,
      ...formDataNumeric
    });

    // 3. Pass input_id and user_id along with other input fields to Result page
    navigate('/result', {
      state: {
        result: footprintRes.data.result,
        input: {
          ...formDataNumeric,
          input_id: input_id,  // this must be included
        }
      }
    });
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || 'Submission failed');
  }
};


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper sx={{ p: 4, width: '100%', maxWidth: 600 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Submit Daily Activity
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField label="Travel (km)" name="travel_km" type="number" value={formData.travel_km} onChange={handleChange} required />
            <TextField label="Public Transit (km)" name="public_transit" type="number" value={formData.public_transit} onChange={handleChange} required />
            <TextField label="Electricity Usage (kWh)" name="electricity_kwh" type="number" value={formData.electricity_kwh} onChange={handleChange} required />
            <TextField label="Gas Usage (kg)" name="gas_kg" type="number" value={formData.gas_kg} onChange={handleChange} required />
            <TextField label="Meat Consumption (grams)" name="meat_grams" type="number" value={formData.meat_grams} onChange={handleChange} required />
            <TextField label="Dairy Consumption (grams)" name="dairy_grams" type="number" value={formData.dairy_grams} onChange={handleChange} required />
            <TextField label="Shopping Amount (₹)" name="shopping_amount" type="number" value={formData.shopping_amount} onChange={handleChange} required />
            <TextField label="Notes" name="notes" multiline rows={3} value={formData.notes} onChange={handleChange} />
            <Button variant="contained" color="primary" type="submit">
              Submit Activity
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SubmitActivity;
