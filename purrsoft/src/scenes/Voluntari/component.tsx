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
  CircularProgress,
} from '@mui/material';
import { Search, Mic } from '@mui/icons-material';
import { CustomCard } from '../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useGetVolunteersQuery } from '../../store';

export const Voluntari = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetVolunteersQuery();

  const theme = useTheme();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredVolunteers = 
    data?.records.filter(
        (volunteer) => 
            (volunteer.firstName.toLowerCase() + ' ' +
            volunteer.lastName.toLowerCase()).includes(searchTerm)
    ) || [];

  const statusMap: { [key: string]: string } = {
    "Active": "Activ",           
    "OnLeave": "În concediu",  
    "Disabled": "Dezactivat", 
  };

  const tierMap: { [key: string]: string } = {
    "Trial": "În probă",           
    "FullTime": "Full Time",
  };

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
            placeholder="Caută voluntari"
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

      {/* Volunteer Cards */}
      {(isLoading) && <CircularProgress />}

      {(error) && <Typography>Eroare la încărcarea datelor.</Typography>}

      <Box sx={{ ml: 2, mr: 1, pb: 4 }}>
        <Grid container spacing={4}>
          {filteredVolunteers.length > 0 ? (
            filteredVolunteers.map((volunteer) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={volunteer.userId}>
              <CustomCard
                width="100%"
                height="100%"
                align="center"
                justify="center"
              >
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography
                    sx={{
                      backgroundColor: theme.palette.accent?.lightGreen,
                      borderRadius: '8px',
                      mb: 1,
                      color: theme.palette.accent?.white,
                      fontSize: '18px',
                      padding: '6px',
                    }}
                  >
                    Nume: {volunteer.firstName} {volunteer.lastName}
                  </Typography>
                  <Typography
                  sx={{
                    backgroundColor: theme.palette.accent?.lightGreen,
                    borderRadius: '8px',
                    mb: 1,
                    color: theme.palette.accent?.white,
                    fontSize: '18px',
                    padding: '6px',
                  }}
                >
                  Email: 
                  <Typography 
                    component={'span'}
                    sx={{
                        display: 'block',
                        backgroundColor: theme.palette.accent?.lightGreen,
                        borderRadius: '8px',
                        color: theme.palette.accent?.white,
                        fontSize: '18px',
                        }}>
                        {volunteer.email.split('@')[0]}
                    </Typography>
                    <Typography 
                      component={'span'}
                      sx={{
                      display: 'inline-block',
                      backgroundColor: theme.palette.accent?.lightGreen,
                      borderRadius: '8px',
                      mb: 1,
                      color: theme.palette.accent?.white,
                      fontSize: '18px',
                      }}>
                        @{volunteer.email.split('@')[1]}
                    </Typography>
                    </Typography>
                  <Typography
                      sx={{
                      backgroundColor: theme.palette.accent?.lightGreen,
                      borderRadius: '8px',
                      mb: 1,
                      color: theme.palette.accent?.white,
                      fontSize: '18px',
                      padding: '6px',
                      }}
                  >
                      Status: {statusMap[volunteer.status]}
                  </Typography>
                  <Typography
                      sx={{
                      backgroundColor: theme.palette.accent?.lightGreen,
                      borderRadius: '8px',
                      mb: 1,
                      color: theme.palette.accent?.white,
                      fontSize: '18px',
                      padding: '6px',
                      }}
                  >
                      Tier: {tierMap[volunteer.tier]}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 1,
                            backgroundColor: theme.palette.accent?.tealGreen,
                        }}
                    >
                        Modifică
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 1,
                            backgroundColor: theme.palette.accent?.tealGreen,
                        }}
                    >
                        Program
                    </Button>
                  </Box>
                </Box>
              </CustomCard>
            </Grid>
            ))
        ) : (
            <Typography
                sx={{
                    textAlign: 'center',
                    width: '100%',
                    mt: 4,
                    color: theme.palette.text.primary,
                }}
            >
                Nu s-au găsit voluntari.
            </Typography>
        )}
        </Grid>
      </Box>
    </Container>
  );
};