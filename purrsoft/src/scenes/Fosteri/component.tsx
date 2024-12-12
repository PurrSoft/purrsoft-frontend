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
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import { Search, Mic } from '@mui/icons-material';
import { CustomCard } from '../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useGetFostersQuery } from '../../store';

export const Fosteri = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetFostersQuery();

  const theme = useTheme();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredFosters = 
    data?.records.filter(
        (foster) => 
            (foster.firstName.toLowerCase() + ' ' +
            foster.lastName.toLowerCase()).includes(searchTerm)
    ) || [];

  const statusMap: { [key: string]: string } = {
    "Active": "Activ",           
    "Available": "Disponibil",  
    "Inactive": "Inactiv",     
    "OnHold": "Suspendat"    
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
          placeholder="Caută fosteri"
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

    {/* Foster Cards */}
    {(isLoading) && <CircularProgress />}

    {(error) && <Typography>Eroare la incarcarea datelor</Typography>}

    <Box sx={{ ml: 2, mr: 1, pb: 4 }}>
      <Grid container spacing={4}>
        {filteredFosters.length > 0 ? (
          filteredFosters.map((foster) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={foster.userId}>
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
                  Nume: {foster.firstName} {foster.lastName}
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
                    sx={{
                        backgroundColor: theme.palette.accent?.lightGreen,
                        borderRadius: '8px',
                        color: theme.palette.accent?.white,
                        fontSize: '18px',
                        }}>
                        {foster.email.split('@')[0]}
                    </Typography>
                    <Typography sx={{
                      backgroundColor: theme.palette.accent?.lightGreen,
                      borderRadius: '8px',
                      mb: 1,
                      color: theme.palette.accent?.white,
                      fontSize: '18px',
                      }}>
                        @{foster.email.split('@')[1]}
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
                      Status: {statusMap[foster.status]}
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
                      Locație: {foster.location}
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
                Nu s-au găsit fosteri.
            </Typography>
        )}
        </Grid>
      </Box>
    </Container>
  );
};