import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper, Container, Card, CardContent } from '@mui/material';
import BgImage from '../assets/image.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: 'white',
        m: 0,
        p: 0,
        border: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            GreenTrace
          </Typography>
          <Typography variant="h5" gutterBottom>
            Learn how AI helps track and reduce your carbon footprint from daily activities.
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: '1rem' }}
            onClick={() => navigate('/register')}
          >
            Start Estimating
          </Button>
        </Box>

        {/* What You'll Learn */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            What You'll Learn
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              'Understand how your activities impact the environment.',
              'Analyze emissions from travel, electricity, food, and shopping.',
              'Use AI-based tools to get personalized sustainability insights.',
            ].map((text, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <CardContent>
                    <Typography variant="body1">{text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Modules */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            GreenTrace Modules
          </Typography>
          <Grid container spacing={3}>
            {[
              'Intro to Carbon Emissions and Sustainability',
              'Daily Activity Tracking for Individuals',
              'AI Emission Estimation Techniques',
              'Building Your Carbon Report',
              'Generating Personalized Suggestions',
              'Visualization & Progress Dashboard',
            ].map((title, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Typography variant="h6">
                    Module {i + 1}: {title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Impact Section */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Impact of GreenTrace
          </Typography>
          <Typography variant="body1" maxWidth="sm" mx="auto" mb={4}>
            With the power of AI, GreenTrace empowers individuals and organizations to make smarter, greener choices every day — reducing emissions and fostering a sustainable future.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { value: '10,000+', label: 'Daily Activity Records' },
              { value: '8 tons+', label: 'CO₂ Emissions Estimated' },
              { value: '30%', label: 'Avg. Emission Reduction per User' },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <CardContent>
                    <Typography variant="h4" fontWeight="bold">
                      {item.value}
                    </Typography>
                    <Typography>{item.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box textAlign="center" py={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Start Your Green Journey?
          </Typography>
          <Typography variant="body1" mb={3}>
            Get started now and join thousands reducing their footprint using AI insights.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#1B5E20', '&:hover': { backgroundColor: '#2E7D32' }, px: 4, py: 1.5 }}
            onClick={() => navigate('/register')}
          >
            Start Now
          </Button>
          <Typography mt={2}>
            Already have an account?{' '}
            <Typography
              component="span"
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Login
            </Typography>
          </Typography>
        </Box>
      </Container>

      {/* Footer */}
      <Box textAlign="center" py={3} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#ccc', border: 'none' }}>
        © 2025 GreenTrace. AI for a Greener Tomorrow 🌱
      </Box>
    </Box>
  );
};

export default LandingPage;
