import { useState, useEffect } from 'react';
import { Tabs, Tab, AppBar, Grid, IconButton } from '@mui/material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HouseIcon from '@mui/icons-material/House';

//types
type RouteLabel = 'Home' | 'Program' | 'Animalute' | 'Evenimente';

type RouteObject = {
  label: RouteLabel;
  value: string;
  url: string;
};

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const theme = useTheme();
  // so the component renders the correct tab when the user navigates to /managment
  useEffect(() => {
    if (location.pathname === '/managment') {
      navigate('/managment/program', { replace: true });
    } else {
      setActiveTab(location.pathname);
    }
  }, [location.pathname, navigate]);

  //routes

  const routes: RouteObject[] = [
    {
      label: 'Program',
      value: '/managment/program',
      url: '/managment/program',
    },
    {
      label: 'Animalute',
      value: '/managment/animalute',
      url: '/managment/animalute',
    },
    {
      label: 'Evenimente',
      value: '/managment/evenimente',
      url: '/managment/evenimente',
    },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.accent?.darkGreen,
        height: '80px',
        borderShadow: '0 0px px 0',
        overflow: 'hidden',
        paddingLeft: '400px',
        alignItems: 'left',
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          height: '100%',
          padding: '0 16px',
          flexWrap: 'nowrap',
        }}
      >
        {/* Centered Tabs Section */}
        <Grid item xs>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              width: '100%',
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              },
            }}
          >
            {routes.map((route) => (
              <Tab
                key={route.label}
                label={route.label}
                value={route.value}
                component={Link}
                to={route.url}
                disableRipple
                sx={{
                  textTransform: 'none',
                  color: theme.palette.accent?.darkGreen,
                  backgroundColor:
                    activeTab === route.value
                      ? theme.palette.accent?.lightBeige
                      : theme.palette.accent?.lightBeige,
                  borderRadius: '16px',
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.button.fontWeight,
                  minHeight: '38px',
                  padding: '12px 24px',
                  margin: '0 8px',
                  transition:
                    'margin-bottom 0.3s ease, padding-bottom 0.3s ease, background-color 0.3s ease', // Transition for smooth animation
                  marginTop: activeTab === route.value ? '44px' : '0px',
                  marginBottom: activeTab === route.value ? '0px' : '0',

                  '&:hover': {
                    backgroundColor: theme.palette.accent?.beige,
                    color: theme.palette.accent?.green,
                  },

                  // Active tab styling (applies only when this tab is selected)
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.accent?.lightBeige,
                    color: theme.palette.accent?.darkGreen,
                    borderRadius: '16px 16px 0 0',
                    borderBottom: `38px solid ${theme.palette.accent?.lightBeige}`,
                    paddingBottom: '14px',
                    transition:
                      'margin-bottom 0.3s ease, padding-bottom 0.3s ease, border-bottom 0.3s ease', // Transition for active tab
                  },
                }}
              />
            ))}
          </Tabs>
        </Grid>

        {/* Right Section with Home Icon */}
        <Grid
          item
          sx={{
            padding: '0',
            marginLeft: 'auto',
            width: '4vw',
            height: '4vh',
          }}
        >
          <IconButton
            component={Link}
            to="/"
            color="inherit"
            aria-label="Home"
            sx={{ color: theme.palette.accent?.beige }}
            size="large"
          >
            <HouseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </AppBar>
  );
};
