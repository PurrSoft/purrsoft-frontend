import { Grid, useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { SecondaryNavbar } from '../../features/SecondaryNavbar';

export const Home = () => {
  const theme = useTheme();
  const caption = `Uniți de iubirea față de pisici și conduși de motivația de a schimba lumea în bine pentru prietenii noștri felini, am căutat modalități prin care să putem deservi comunitatea, să instruim voluntari și să educăm populația în privința bunăstării și comportamentului pisicilor, conștienți fiind că trebuie să „Fii tu însuți schimbarea pe care vrei să o vezi în lume” — Mahatma Gandhi dar și de faptul că „Singur putem face atât de puțin; împreună putem face atât de multe” – Helen Keller.
Green Cats este o organizație non-guvernamentală, înființată în anul 2020, dedicată protecției animalelor, cu focus exclusiv pe pisici.`;
  const moto = ` „Împreună facem lumea un loc mai bun, pisică cu pisică!„`;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      {/* Absolute Positioned Film Images on the Left */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '10px', sm: '40px', md: '100px' }, // Responsive padding
          display: 'flex',
          flexDirection: 'column',
          top: { xs: '40%', sm: '60%' },
          gap: '20px',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '200px', sm: '300px', md: '400px' },
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="./main/film-cats/film-2.png"
            alt="Film Cat 2"
            sx={{
              position: 'absolute',
              width: { xs: '100px', sm: '200px', md: '400px' },
              height: 'auto',
              borderRadius: '8px',
              transform: 'rotate(-15deg)',
            }}
          />
          <Box
            component="img"
            src="./main/film-cats/film-1.png"
            alt="Film Cat 1"
            sx={{
              position: 'absolute',
              width: { xs: '200px', sm: '300px', md: '400px' },
              height: 'auto',
              borderRadius: '8px',
              transform: 'rotate(8deg)',
              top: { xs: '-80px', sm: '-150px', md: '-200px' },
              left: { xs: '80px', sm: '130px', md: '170px' },
            }}
          />
        </Box>
      </Box>

      {/* Navbar and Main Image Side-by-Side */}
      <Grid
        container
        flexDirection="row"
        sx={{
          height: '50%',
          justifyContent: 'space-between',
          margin: 0,
          padding: 0,
          zIndex: 2,
        }}
      >
        <Grid item xs={12} md={6} sx={{ padding: 0, zIndex: 3 }}>
          <SecondaryNavbar />
        </Grid>
        <Grid
          item
          xs={8}
          md={4.5}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          {/* Background Image */}
          <Box
            component="img"
            src="./main/main-cat.jpg"
            alt="Main Cat"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>

      {/* Text Overlay Positioned Separately */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10%', sm: '15%' }, // Adjust position as needed
          left: { xs: '5%', sm: '20%' }, // Responsive left alignment
          zIndex: 4,
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '4rem', md: '5rem', lg: '6rem' }, // Responsive font size
            fontWeight: 'bold',
            letterSpacing: 2,
          }}
        >
          MAKE A
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '5rem', md: '7rem' }, // Responsive font size
            fontWeight: 'bold',
            letterSpacing: 2,
            color: 'transparent',
            WebkitTextStroke: `3px ${theme.palette.accent?.green}`,
            position: 'relative',
            top: { xs: '-20px', sm: '-50px' }, // Responsive adjustment
            left: { xs: '0px', sm: '-10px' },
          }}
        >
          DIFFERENCE
        </Typography>

        {/* Moto Text */}
        <Typography
          variant="h4"
          sx={{
            fontStyle: 'italic',
            color: theme.palette.accent?.darkGreen,
            position: 'relative',
            top: { xs: '-20px', sm: '-50px' },
            left: { xs: '20px', sm: '40px' },
          }}
        >
          {moto}
        </Typography>
      </Box>

      {/* Main Content Below Image and Navbar */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '50%',
          padding: { xs: '10px', md: '20px' },
          zIndex: 3,
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {/* Longer Caption Text Container */}
          <Box
            sx={{
              maxWidth: { xs: '90%', sm: '70%', md: '60%', lg: '60%' },
              padding: '20px',
              borderRadius: '8px',
              position: 'relative',
              top: { xs: '-40px', sm: '-60px', md: '-90px', lg: '-120px' },
            }}
          >
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.8rem', lg: '2.3rem' },
                lineHeight: 1.5,
                color: theme.palette.accent?.green,
              }}
            >
              {caption}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
