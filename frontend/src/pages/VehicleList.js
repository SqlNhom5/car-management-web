import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import axios from 'axios';

const VehicleList = () => {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const vehiclesPerPage = 9;

  useEffect(() => {
    fetchVehicles();
  }, [searchParams, sortBy]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:8080/api/vehicles';
      const type = searchParams.get('type');
      
      if (type) {
        url += `/type/${type}`;
      } else if (sortBy === 'latest') {
        url += '/latest';
      } else if (sortBy === 'price-asc') {
        url += '/sort/price-asc';
      } else if (sortBy === 'price-desc') {
        url += '/sort/price-desc';
      }

      const response = await axios.get(url);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/vehicles/search?keyword=${searchTerm}`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error searching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastVehicle = page * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search vehicles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {currentVehicles.map((vehicle) => (
          <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={vehicle.image_url || `https://source.unsplash.com/random/800x600/?${vehicle.type.toLowerCase()}`}
                alt={vehicle.title}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '200px'
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {vehicle.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${vehicle.price.toLocaleString()}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  href={`/vehicles/${vehicle.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(vehicles.length / vehiclesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default VehicleList; 