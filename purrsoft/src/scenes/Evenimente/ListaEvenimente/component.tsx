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
  // CircularProgress,
} from '@mui/material';
import { Search, Mic } from '@mui/icons-material';
import { CustomCard } from '../../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
// import { useGetEventsQuery } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { Eveniment } from '../../../store/api/events/slice';

const mockEvents: Eveniment[] = [
  {
    id: "1",
    title: "Animal Shelter Cleanup",
    subtitle: "A day to make the shelter clean and cozy",
    where: "123 Green Road, Cityville",
    when: "2025-01-20T10:00:00Z", // ISO format from C# backend
    description: "Join us in cleaning up the animal shelter to provide a better environment for the animals.",
    volunteers: ["John Doe", "Jane Smith", "Emily Davis"],
  },
  {
    id: "2",
    title: "Adoption Day Event",
    subtitle: "Find loving homes for rescued animals",
    where: "Community Park, Center Square",
    when: "2025-02-15T09:00:00Z",
    description: "Help us find loving homes for our rescued animals at this adoption event.",
    volunteers: ["Alice Brown", "Michael Johnson"],
  },
  {
    id: "3",
    title: "Fundraising Marathon",
    subtitle: "Run for a cause",
    where: "Central High School Track",
    when: "2025-03-10T08:30:00Z",
    description: "Participate in our marathon to raise funds for animal medical care.",
    volunteers: ["Chris Martin", "Sophia Taylor", "Liam Wilson"],
  },
];

export const ListaEvenimente = () => {
  const [searchTerm, setSearchTerm] = useState('');
//   const { data, error, isLoading } = useGetAnimalsQuery();

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

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </Box>
      </Box>

      {/* Event Cards */}
      {/* {(isLoading) && <CircularProgress />}
  
      {(error) && <Typography>Eroare la incarcarea datelor</Typography>} */}

      <Box sx={{ ml: 2, mr: 1 }}>
        <Grid container spacing={6}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} key={event.id}>
              <CustomCard
                width="100%"
                height="100%"
                align="flex-start"
                justify="space-between"
                title={
                  <Typography 
                    variant="h4"
                    sx={{ color: theme.palette.accent?.white }}
                  >
                    {event.title}
                  </Typography>
                }
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>              
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'space-between' }}>
                      <Typography 
                        variant="body1"
                        sx={typographyStyle}
                      >
                        <strong>Cand:</strong> {formatDate(event.when)}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={typographyStyle}
                      >
                        <strong>Unde:</strong> {event.where}
                      </Typography>
                    </Box>

                    <Typography 
                      variant="body1"
                      sx={{ ...typographyStyle, flex: 1 }}
                    >
                      <strong>Descriere:</strong> {event.description}
                    </Typography>

                  </Box>

                  <Box 
                    sx={{ 
                      mt: 2,
                      display: 'flex',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: theme.palette.accent?.mutedGreen,
                        borderRadius: 1,
                        flex: 2,
                        p: 1,
                      }}
                    >
                      <Typography 
                        variant="body1"
                        sx={{ color: theme.palette.accent?.white }}
                      >
                        <strong>Voluntari inscrisi:</strong>
                      </Typography>
                      {event.volunteers.map((volunteer, index) => (
                        <Typography 
                          key={index} 
                          variant="body1"
                          sx={{ color: theme.palette.accent?.white }}
                        >
                          {volunteer}
                        </Typography>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
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
                    </Box>
                  </Box>
                </Box>
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      </Box>


    </Container>
  );
}