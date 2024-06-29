import React, { useState } from 'react';
import {
    Paper, Typography, Grid, TextField, Button, MenuItem, Box, Container, Select, InputLabel, FormControl
  } from '@mui/material';

const Add = () => {
  const [productName, setProductName] = useState('');
  const [batteryHealth, setBatteryHealth] = useState('');
  const [storage, setStorage] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState([]);
  const [image, setImage] = useState(null);

  const storageOptions = [
    '64GB',
    '128GB',
    '256GB',
    '512GB',
    '1TB'
  ];

  const locationOptions = [
    'perinthalmanna',
    'Cherupulasseri',
    'Ottapalam'
  ];


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    console.log({
      productName,
      batteryHealth,
      storage,
      year,
      image
    });
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f4f8' }}>
          <Container className='mt-5'>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={10} md={8}>
                <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#ffffff' }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'rgb(24, 24, 96)' }}>
                    Add Product
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Model Name"
                          fullWidth
                          required
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#3f51b5' } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Battery Health"
                          fullWidth
                          required
                          value={batteryHealth}
                          onChange={(e) => setBatteryHealth(e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#3f51b5' } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Storage"
                          fullWidth
                          required
                          value={storage}
                          onChange={(e) => setStorage(e.target.value)}
                        >
                          {storageOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Year"
                          type="number"
                          fullWidth
                          required
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#3f51b5' } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Color"
                          fullWidth
                          required
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#3f51b5' } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="location-label">Location</InputLabel>
                          <Select
                            labelId="location-label"
                            multiple
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          >
                            {locationOptions.map((option) => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>
                          Choose Image
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input onChange={handleFileSelect} type="file" style={{ display: 'none' }} id="imageInput" />
                          <Button 
                            variant="contained" 
                            component="span" 
                            onClick={() => document.getElementById('imageInput').click()}
                            sx={{ backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1976d2' } }}
                          >
                            Browse
                          </Button>
                          {image && <Typography variant="body1" sx={{ marginLeft: 2 }}>{image.name}</Typography>}
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Button
                              variant="outlined"
                              fullWidth
                              sx={{ mt: 2, color: '#3f51b5', borderColor: '#3f51b5' }}
                              onClick={() => console.log('Cancelled')}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              type="submit"
                              variant="contained"
                              fullWidth
                              sx={{ mt: 2, backgroundColor: "#3f51b5", '&:hover': { backgroundColor: '#303f9f' } }}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Add;
