import { Box, Grid, Typography, useTheme } from '@mui/material';
import { SecondaryNavbar } from '../../features/SecondaryNavbar';

export const DespreNoiNou = () => {
  const membrii = [
    {
      nume: 'Robin',
      poza: './animalImages/robin/angry_robin.jpg',
      descriere: 'Ca si papagal doresc justitie pentru pisici!',
    },
    {
      nume: 'Robina',
      poza: './animalImages/robin/curious_robin.jpg',
      descriere: 'Curios cum am ajuns aici? Intra la noi pe site!',
    },
    {
      nume: 'Robi',
      poza: './animalImages/robin/flirty_robi.jpg',
      descriere: 'Dedicati-va timpul sa aveti grija de animale!',
    },
  ];
  const theme = useTheme();
  return (
    <Grid container width="100%">
      <Grid
        item
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
        <Grid item sx={{ padding: 0, zIndex: 3 }}>
          <SecondaryNavbar width="100%" gapBetween={true} />
        </Grid>
        <Box
          sx={{
            position: 'absolute',
            top: '2%', // Adjust position as needed
            left: { xs: '14%', sm: '14%', md: '14%', lg: '12%', xl: '20%' }, // Responsive left alignment
            zIndex: 4,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '2rem',
                sm: '4rem',
                md: '3rem',
                lg: '6rem',
                xl: '7rem',
              }, // Responsive font size
              fontWeight: 'bold',
              letterSpacing: 2,
              color: theme.palette.accent?.darkGreen,
            }}
          >
            ECHIPA
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '2rem',
                sm: '4rem',
                md: '4rem',
                lg: '6rem',
                xl: '7rem',
              }, // Responsive font size
              fontWeight: 'italic',
              letterSpacing: 2,
              color: 'transparent',
              WebkitTextStroke: `3px ${theme.palette.accent?.darkGreen}`,
              position: 'relative',
              top: '0px', // Responsive adjustment
              left: { xs: '0px', sm: '-10px' },
            }}
          >
            NOASTRA
          </Typography>
        </Box>

        {/* Content Section */}
        <Grid
          container
          maxWidth="xl"
          sx={{
            width: '100%',
            marginTop: '20px',
            padding: '20px',
          }}
        >
          <Grid item container spacing={1} paddingBottom={10} paddingTop={15}>
            {/* "Cine Suntem" Section */}
            <Grid item container xs={12}>
              <Grid
                item
                sx={{
                  backgroundColor: theme.palette.accent?.green,
                  padding: '10px',
                  borderRadius: '14px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Typography variant="h5" color={theme.palette.accent?.beige}>
                  Cine suntem astăzi?
                </Typography>
              </Grid>
              <Grid item padding={4}>
                <Typography variant="h5" sx={{ marginTop: '10px' }}>
                  Green Cats este o organizație non-guvernamentală, înființată
                  în anul 2020, dedicată protecției animalelor, cu focus
                  exclusiv pe protecția pisicilor. Pe tot parcursul anului
                  asigurăm sterilizări gratuite sau la preț redus în
                  Cluj-Napoca, Florești, Aiton și Turda – prin intermediul
                  cabinetelor partenere – pentru că înțelegem că singura metodă
                  de prevenție a abandonului și de scădere a numărului
                  copleșitor de pisici din stradă, este sterilizarea! etc
                </Typography>
              </Grid>
            </Grid>

            {/* Membrii Section */}
            <Grid item container gap={10}>
              <Grid item container flexDirection={'column'} gap={2}>
                <Grid item>
                  <Typography
                    variant="h2"
                    sx={{
                      textAlign: 'center',
                      marginBottom: '20px',
                      color: theme.palette.accent?.green,
                    }}
                  >
                    Membrii coordonatori
                  </Typography>
                </Grid>
                <Grid
                  container
                  spacing={4}
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                  flexWrap={'nowrap'}
                >
                  {membrii.map((membru, index) => (
                    <Grid
                      item
                      container
                      alignItems={'center'}
                      justifyContent={'center'}
                      alignSelf={'center'}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      key={index}
                      sx={{
                        position: 'relative', // Parent container must be relative
                        borderRadius: '15px',
                        width: '100%', // Ensure grid takes full width
                        overflow: 'hidden', // Ensure content doesn't overflow
                      }}
                    >
                      {/* Image */}
                      <Grid
                        item
                        sx={{
                          backgroundColor: theme.palette.accent?.beige,
                          borderRadius: '15px',
                          overflow: 'hidden',
                          border: '10px solid',
                          borderColor: theme.palette.accent?.darkGreen,
                        }}
                      >
                        <img
                          src={membru.poza}
                          alt={membru.nume}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            aspectRatio: '1/1', // Square aspect ratio
                            display: 'block',
                          }}
                        />
                      </Grid>

                      {/* Overlay Info */}
                      <Grid
                        item
                        sx={{
                          position: 'absolute', // Position overlay absolutely
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)', // Center horizontally
                          backgroundColor: theme.palette.accent?.darkGreen, // Semi-transparent green background
                          color: 'white',
                          padding: '10px',
                          textAlign: 'center',
                          borderRadius: '15px', // Round the bottom corners
                          zIndex: 1, // Ensure overlay is above image
                          width: '80%', // Adjust width as needed
                        }}
                      >
                        <Typography
                          variant="body2"
                          color={theme.palette.accent?.beige}
                          sx={{
                            fontWeight: 'bold',
                            marginBottom: '5px',
                          }}
                        >
                          {membru.nume}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={theme.palette.accent?.beige}
                        >
                          {membru.descriere}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                marginTop: '300px',
                gap: '20px',
              }}
            >
              {/* Image Section */}
              <Grid
                item
                xs={12}
                md={6}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <img
                  src="./DespreNoiHeader.JPG"
                  alt="Despre Noi"
                  style={{
                    width: '100%',
                    maxWidth: '600px', // Restrict the maximum width of the image
                    height: 'auto',
                    borderRadius: '15px',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', // Shadow for the image
                  }}
                />
              </Grid>

              {/* Text Section */}
              <Grid
                item
                container
                xs={8}
                md={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                  textAlign: 'left',
                  width: '100%',
                  padding: '10px',
                }}
              >
                <Grid item container flexDirection={'column'} gap={2}>
                  <Grid item>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        fontSize: '1.1rem',
                        marginBottom: '10px',
                      }}
                    >
                      Considerăm că diversitatea este forța noastră. În echipa
                      voluntarilor se află de la studenți, la corporatiști,
                      juriști sau chiar medici.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        fontSize: '1.1rem',
                        marginBottom: '10px',
                      }}
                    >
                      Voluntarii Green, fiecare cu povestea și profesia sa, sunt
                      uniți de respectul față de ființele vii, dorința de a
                      schimba lucrurile în mai bine și dragostea față de pisici.
                      Sunt oameni care dau dovadă de curaj, integritate și simț
                      al răspunderii, care înțeleg că schimbarea pornește de la
                      propria persoană.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.6,
                        fontSize: '1.1rem',
                        marginBottom: '10px',
                      }}
                    >
                      Green Cats este mai mult decât o asociație; este o rețea
                      de susținere și un grup de prieteni dedicați. Suntem
                      determinați să educăm societatea la nivel național în
                      legătură cu bunăstarea pisicilor și sterilizarea lor,
                      acestea fiind singurele lucruri cu impact pozitiv în
                      reducerea abandonului pe termen mediu și lung.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
