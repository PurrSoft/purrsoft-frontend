import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { CustomCard } from '../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useGetRequestsQuery } from '../../store';

export const Cereri = () => {
  const { data, error, isLoading } = useGetRequestsQuery();

  const theme = useTheme();

return (
  <Container>
    {(isLoading) && <Box  sx={{ ml: 6, pt: 6 }}><CircularProgress /></Box>}

    {(error) && <Typography sx={{ ml: 6, pt: 6 }}>Eroare la incarcarea datelor</Typography>}

    <Box sx={{ ml: 6, mr: 8, pb: 4, pt: 6 }}>
      <Grid container spacing={4}>
          {data?.records.map((request) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={request.email}>
            <CustomCard
              width="100%"
              height="100%"
              align="flex-start"
              justify="flex-start"
            >
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 2,
                width: '100%',
                }}>
                <Typography
                  sx={{
                    backgroundColor: theme.palette.accent?.lightGreen,
                    borderRadius: '8px',
                    color: theme.palette.accent?.white,
                    fontSize: '16px',
                    padding: '8px',
                    width: '80%',
                    textAlign: 'left',
                    wordWrap: 'break-word',
                  }}
                >
                  Nume: {request.name}
                  </Typography>
                  <Typography
                  sx={{
                    backgroundColor: theme.palette.accent?.lightGreen,
                    borderRadius: '8px',
                    color: theme.palette.accent?.white,
                    fontSize: '16px',
                    padding: '8px',
                    width: '80%',
                    textAlign: 'left',
                    wordWrap: 'break-word',
                  }}
                >
                  Email: {request.email}
                    </Typography>
                  <Typography
                    sx={{
                        backgroundColor: theme.palette.accent?.lightGreen,
                        borderRadius: '8px',
                        color: theme.palette.accent?.white,
                        fontSize: '16px',
                        padding: '8px',
                        width: '80%',
                        minHeight: '100px',
                        overflowY: 'auto',
                        textAlign: 'left',
                        wordWrap: 'break-word',
                      }}
                  >
                    {request.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, width: '100%' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.accent?.tealGreen,
                        }}
                    >
                        Acționează
                    </Button>
                  </Box>
                </Box>
              </CustomCard>
            </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};