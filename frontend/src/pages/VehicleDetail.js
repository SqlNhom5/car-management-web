import React from 'react';
import { CardMedia } from '@mui/material';

const VehicleDetail = ({ vehicle }) => {
  return (
    <CardMedia
      component="img"
      height="400"
      image={vehicle.image_url || `https://source.unsplash.com/random/1200x800/?${vehicle.type.toLowerCase()}`}
      alt={vehicle.title}
      sx={{
        objectFit: 'cover',
        width: '100%',
        height: '400px'
      }}
    />
  );
};

export default VehicleDetail; 