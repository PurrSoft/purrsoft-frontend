// components/DespreNoi.tsx
import { Box, Container, Grid, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useGetAnimalsQuery } from '../../store';
import { AnimalCard } from './AnimalCard';
import { SecondaryNavbar } from '../../features/SecondaryNavbar'; // Import SecondaryNavbar

// Styling for the header section with image background
const Header = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '400px', // Increased height
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'flex-start', // Align items at the bottom of the header
  color: '#fff',
  textAlign: 'center',
  marginBottom: '40px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay effect
  },
});

// Styling for the header title on the right side
const HeaderContent = styled(Typography)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  fontSize: '3rem',
  fontWeight: 'bold',
  color: theme.palette.accent.green,
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)', // Text shadow for emphasis
  letterSpacing: '2px',
  fontFamily: `'Roboto', sans-serif`,
  marginRight: '80px',
  marginTop: '15px',
  '&::after': {
    content: '""',
    display: 'block',
    width: '100%',
    height: '4px',
    backgroundColor: theme.palette.accent.green,
    marginTop: '8px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Text shadow for emphasis
  },
}));

// Styling for the navbar container, aligned to the top left
const NavbarContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(235, 231, 224, 0.9)', // Light beige background with slight transparency
  zIndex: 2,
  borderRadius: '0 0 8px 8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for separation
  width: '100%',
});

export const DespreNoi = () => {
  const { data: animals, isLoading, isError } = useGetAnimalsQuery();

  return (
    <>
      {/* Navbar overlay */}
      <NavbarContainer>
        <SecondaryNavbar /> {/* Display SecondaryNavbar on the left */}
      </NavbarContainer>

      {/* Header Section */}
      <Header style={{ backgroundImage: 'url(DespreNoiHeader.JPG)' }}>
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push the title to the right */}
        <HeaderContent variant="h2">Our Cats</HeaderContent> {/* Title on the right */}
      </Header>

      {/* Main Content Section */}
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
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
        <Grid
          container
          spacing={4}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          {animals?.records?.map((animal, index) => (
            <Grid item key={animal.id}>
              <AnimalCard
                id={animal.id}
                animalType={animal.animalType}
                name={animal.name}
                yearOfBirth={animal.yearOfBirth}
                gender={animal.gender}
                sterilized={animal.sterilized}
                imageUrl={animal.imageUrl}
                alternate={index % 2 === 1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default DespreNoi;
