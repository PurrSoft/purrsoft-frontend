import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Container,
  Grid,
  InputAdornment,
  Typography,
  CircularProgress
} from '@mui/material';
import { Search, Mic } from '@mui/icons-material';
import { CustomCard } from '../../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useGetAnimalsQuery, useAccountQuery } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { AddAnimalForm } from '../AddAnimalForm';
import defaultPhoto from '/defaultPhoto.jpeg';

export const ListaAnimalute = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetAnimalsQuery();
  const { data: user, isLoading: accountLoading } = useAccountQuery();
  
  const [open, setOpen] = useState(false);
  const [highestRole, setHighestRole] = useState('');

  useEffect(() => {
    if (user?.roles) {
      const roles = user.roles;
      if (roles.includes('Foster')) {
        setHighestRole('foster');
      }
      if (roles.includes('Admin')) {
        setHighestRole('other');
      }
      if (roles.includes('Manager')) {
        setHighestRole('other');
      }
      if (roles.includes('Volunteer')) {
        setHighestRole('other');
      }
    }
  }, [user, highestRole]);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredAnimals = 
    data?.records.filter(
      (animal) => 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Container>
      {/* Sticky Search Bar */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: theme.palette.background.default,
          zIndex: 9,
        }}
      >
        <Box sx={{ display: 'flex', my: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Cauta animalut"
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
          {highestRole === 'other' && 
            <Button 
              variant="contained"
              sx={{
                backgroundColor: theme.palette.accent?.lightGreen,
                color: theme.palette.accent?.white,
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: theme.palette.accent?.darkGreen,
                },
                ml: 2,
              }} 
              onClick={handleClickOpen}
            >
              Adauga animal
            </Button>
          }
        </Box>
      </Box>

      {/* Animal Cards */}
      {(isLoading || accountLoading) && <CircularProgress />}
        
      {(error) && <Typography>Eroare la incarcarea datelor</Typography>}

      <Box sx={{ ml: 2, mr: 1 }}>
        <Grid container spacing={6}>
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
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
                      src={animal.imageUrls && animal.imageUrls.length > 0 ? animal.imageUrls[0] : defaultPhoto}
                      style={{ width: '80%', height: 'auto', borderRadius: '8px' }}
                    />
                    {highestRole === "other" && 
                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          backgroundColor: theme.palette.accent?.tealGreen,
                        }}
                        onClick={() => {
                          navigate(`/management/animalute/${animal.id}`, { state: { animal } });
                        }}
                      >
                        Modifica
                      </Button>
                    }
                  </Box>
                </CustomCard>
              </Grid>
            ))
          ) : (
            !error &&
              <Typography
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  mt: 8,
                  color: theme.palette.text.primary,
                }}
              >
                Nu s-au gasit animalute.
              </Typography>
          )}
        </Grid>
      </Box>

      <AddAnimalForm open={open} onClose={handleClose} />
    </Container>
  );
};
