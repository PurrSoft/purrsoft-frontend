import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    LinearProgress,
  } from '@mui/material';
import { useGetAnimalsQuery } from '../../store';
  
export const DespreNoi = () => {
    const { data: animals, isLoading, isError } = useGetAnimalsQuery();
    console.log(animals);
    return (
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        {/* Header Section */}
        <Typography variant="h2" gutterBottom>
          Make a Difference
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Together we make the world a better place, one cat at a time!
        </Typography>
  
        {/* Loading/Error Handling */}
        {isLoading && <LinearProgress />}
        {isError && (
          <Typography color="error" variant="h6">
            Error loading animals. Please try again.
          </Typography>
        )}
  
        {/* Animal Cards Section */}
        <Grid container spacing={4}>
          {animals?.map((animal) => (
            <Grid item key={animal.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={animal.imageUrl}
                  alt={animal.name}
                />
                <CardContent>
                  <Typography variant="h6">{animal.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Animal Type: {animal.animalType}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year of Birth: {animal.yearOfBirth}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Gender: {animal.gander}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sterilized: {animal.sterilized ? 'Yes' : 'No'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  