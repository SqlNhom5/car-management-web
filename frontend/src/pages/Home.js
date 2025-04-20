import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          Welcome to Vehicle Marketplace
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Find your perfect car or motorcycle from our extensive collection of vehicles.
          Browse through listings, compare prices, and connect with sellers directly.
        </Typography>
        <Button
          component={RouterLink}
          to="/vehicles"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Browse Vehicles
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://source.unsplash.com/random/800x600/?car"
              alt="Cars"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Cars
              </Typography>
              <Typography>
                Browse our selection of cars from various brands and models.
                Find the perfect car that matches your needs and budget.
              </Typography>
              <Button
                component={RouterLink}
                to="/vehicles?type=CAR"
                startIcon={<DirectionsCarIcon />}
                sx={{ mt: 2 }}
              >
                View Cars
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://source.unsplash.com/random/800x600/?motorcycle"
              alt="Motorcycles"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Motorcycles
              </Typography>
              <Typography>
                Discover our collection of motorcycles from top manufacturers.
                Find the perfect ride for your adventures.
              </Typography>
              <Button
                component={RouterLink}
                to="/vehicles?type=MOTORCYCLE"
                startIcon={<TwoWheelerIcon />}
                sx={{ mt: 2 }}
              >
                View Motorcycles
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 