import {
  AppBar,
  Box,
  Button,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import { OtherHousesOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAccountQuery, useLogoutMutation } from '../../store';
import { Outlet, useNavigate } from 'react-router-dom';
import { CustomCard } from '../../components/CustomCard';

export const AccountOverview = () => {
  const theme = useTheme();
  const { data: accountData, isLoading, isError } = useAccountQuery();
  const [logout] = useLogoutMutation();

  const username = isLoading
    ? 'Loading...'
    : isError
      ? 'Error loading username'
      : accountData?.displayName || 'Unknown User';

  const navigate = useNavigate();
  function handleLogout() {
    logout().then(() => navigate('/'));
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: theme.palette.accent?.green,
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Box display="flex" alignItems="center" px={3}>
          <img src="/green-cats-logo.png" alt="logo" height={64} />
          <Box flexGrow={1} />
          <IconButton
            size="large"
            edge="end"
            sx={{ color: theme.palette.accent?.lightGreen }}
          >
            <OtherHousesOutlined />
          </IconButton>
        </Box>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          padding: { xs: 2, sm: 4 },
          gap: { xs: 6, sm: 8 },
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Sidebar */}
        <CustomCard
          width={{ xs: '100%', sm: '90%', md: '350px', lg: '400px' }}
          height="100%"
          title={username}
          align="center"
          justify="space-between"
        >
          <Grid
            container
            spacing={3}
            direction="column"
            sx={{
              width: '100%',
              height: '100%',
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  backgroundColor: theme.palette.accent?.mutedGreen,
                }}
                onClick={() => navigate('/account-overview/contul-meu')}
              >
                <Typography variant="h6" color="black">
                  Contul Meu
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  backgroundColor: theme.palette.accent?.mutedGreen,
                  color: theme.palette.secondary.contrastText,
                }}
                onClick={() => navigate('/account-overview/rolurile-mele')}
              >
                <Typography variant="h6" color="black">
                  Rolurile Mele
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  backgroundColor: theme.palette.accent?.mutedGreen,
                  color: theme.palette.secondary.contrastText,
                }}
                onClick={() => navigate('/account-overview/schimba-parola')}
              >
                <Typography variant="h6" color="black">
                  Schimba Parola
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mb: 3,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  backgroundColor: theme.palette.accent?.mutedGreen,
                  color: theme.palette.secondary.contrastText,
                }}
                onClick={() => navigate('/account-overview/aplica-rol')}
              >
                <Typography variant="h6" color="black">
                  Aplica Rol
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.accent?.darkGreen,
                  color: theme.palette.secondary.contrastText,
                }}
                onClick={handleLogout} // Replace with logout logic
              >
                <Typography variant="h6" color="black">
                  Logout
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CustomCard>

        {/* Dynamic Content Area */}
        <Box
          sx={{
            flexGrow: 1, // Allow content to grow
            backgroundColor: theme.palette.accent?.softSageGreen,
            borderRadius: 2,
            boxShadow: 1,
            padding: { xs: 4, sm: 4 },
            width: {
              xs: '100%',
              sm: '90%',
              md: 'calc(100% - 350px)',
              lg: 'calc(100% - 400px)',
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
