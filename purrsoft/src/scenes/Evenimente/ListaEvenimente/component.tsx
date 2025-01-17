import { useState } from 'react';
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
import { CustomCard } from '../../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useGetEventsQuery } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { AdaugaEventForm } from '../AdaugaEventForm';
import dayjs from 'dayjs';

export const ListaEvenimente = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useGetEventsQuery({
    Skip: 0,
    Take: 1000,
  });
  const [open, setOpen] = useState(false);


  const theme = useTheme();
  const navigate = useNavigate();

  const typographyStyle = {
    backgroundColor: theme.palette.accent?.mutedGreen,
    color: theme.palette.accent?.white,
    borderRadius: 1,
    p: 1,
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const filteredEvents = data?.records.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (dateString: string): string => {
    return dateString ? dayjs(dateString).format('DD MMMM YYYY, HH:mm'): '';
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
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'left', my: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Cauta evenimente"
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
            Adauga eveniment
          </Button>
        </Box>
      </Box>

      {/* Event Cards */}
      {(isLoading) && <CircularProgress />}
  
      {(error) && <Typography>Eroare la incarcarea datelor</Typography>}

      <Box sx={{ ml: 2, mr: 1 }}>
        <Grid container spacing={6}>
          {filteredEvents?.map((event) => (
            <Grid item xs={12} key={event.id}>
              <CustomCard
                width="100%"
                height="100%"
                title={
                  <Typography 
                    variant="h4"
                    sx={{ color: theme.palette.accent?.white }}
                  >
                    {event.title}
                  </Typography>
                }
              >
                <Grid container>
                  <Grid container spacing={2}>              
                    <Grid item xs={4}>
                      <Typography 
                        variant="body1"
                        sx={typographyStyle}
                        mb={2}
                      >
                        <strong>Cand:</strong> {formatDate(event.date)}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={typographyStyle}
                      >
                        <strong>Unde:</strong> {event.location}
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography 
                        variant="body1"
                        sx={typographyStyle}
                      >
                        <strong>Descriere:</strong> {event.description}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid 
                    container 
                    spacing={1}
                    sx={{ 
                      mt: 2,
                      ml: 0,
                    }}
                  >
                    <Grid item xs={8}
                      sx={{
                        backgroundColor: theme.palette.accent?.mutedGreen,
                        borderRadius: 1,
                      }}
                    >
                      <Typography 
                        variant="body1"
                        sx={{ color: theme.palette.accent?.white }}
                      >
                        <strong>Voluntari inscrisi:</strong>
                      </Typography>
                      {event.attendingVolunteers?.map((volunteer, index) => (
                        <Typography 
                          key={index} 
                          variant="body1"
                          sx={{ color: theme.palette.accent?.white }}
                        >
                          {volunteer}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid 
                      item 
                      xs={4}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.accent?.lightGreen,
                        }}
                        onClick={() => {
                          console.log(event.id);
                          navigate(`/management/evenimente/${event.id}`, { state: { event } });
                        }}
                      >
                        Modifica
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
            ))}
          </Grid>
        </Box>
      <AdaugaEventForm open={open} onClose={handleClose} />
    </Container>
  );
}