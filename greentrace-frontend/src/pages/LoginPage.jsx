import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/login', formData); // uses http://127.0.0.1:5000/api/login via VITE_API_URL
      localStorage.setItem('user_id', res.data.user_id);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          GreenTrace Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/register')}>
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
