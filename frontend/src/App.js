import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VehicleList from './pages/VehicleList';
import VehicleDetail from './pages/VehicleDetail';
import AddVehicle from './pages/AddVehicle';
import { Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App; 