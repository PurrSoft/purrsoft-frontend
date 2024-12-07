import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Container,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search, Mic } from '@mui/icons-material';
import { CustomCard } from '../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useGetAnimalsQuery } from '../../store';

export const Animalute = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetAnimalsQuery();

  const theme = useTheme();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching animals!</div>;
  }

  return (
    <Container>
      {/* Sticky Search Bar */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: theme.palette.background.default,
          zIndex: 9,
          py: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'left', my: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search animals"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '50px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Mic />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Animal Cards */}
      <Box sx={{ ml: 2, mr: 1 }}>
        <Grid container spacing={6}>
          {data?.records.map((animal) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={animal.id}>
              <CustomCard
                width="100%"
                height="100%"
                align="center"
                justify="center"
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      backgroundColor: theme.palette.accent?.lightGreen,
                      borderRadius: '8px',
                      mb: 1,
                      color: theme.palette.accent?.white,
                      fontSize: '20px',
                    }}
                  >
                    Nume: {animal.name}
                  </Typography>
                  <img
                    src={`https://via.placeholder.com/150?text=${animal.name}`}
                    alt={animal.name}
                    style={{ width: '80%', height: 'auto', borderRadius: '8px' }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: theme.palette.accent?.tealGreen,
                    }}
                  >
                    Modifica
                  </Button>
                </Box>
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
