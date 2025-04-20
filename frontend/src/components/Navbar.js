import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DirectionsCarIcon sx={{ mr: 1 }} />
            <TwoWheelerIcon sx={{ mr: 1 }} />
            Vehicle Marketplace
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/vehicles"
            >
              Browse Vehicles
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/add-vehicle"
            >
              Sell Vehicle
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 