import { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  Grid,
  IconButton,
  useMediaQuery,
  Badge,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HouseIcon from '@mui/icons-material/House';
import { useAccountQuery } from '../../store';
import { useVisibility } from '../../hooks/useVisibility';
import { NotificationsBar } from '../NotificationsBar';

type RouteLabel =
  | 'Home'
  | 'Program'
  | 'Animalute'
  | 'Evenimente'
  | 'Voluntari'
  | 'Fosteri'
  | 'Cereri';

type RouteObject = {
  label: RouteLabel;
  value: string;
  url: string;
};

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routes: RouteObject[] = [
    {
      label: 'Program',
      value: '/management/program',
      url: '/management/program',
    },
    {
      label: 'Animalute',
      value: '/management/animalute',
      url: '/management/animalute/lista',
    },
    {
      label: 'Evenimente',
      value: '/management/evenimente',
      url: '/management/evenimente',
    },
  ];

  if (useAccountQuery().data?.roles?.includes('Manager')) {
    routes.push({
      label: 'Voluntari',
      value: '/management/voluntari',
      url: '/management/voluntari',
    });
  }

  if (useAccountQuery().data?.roles?.includes('Manager')) {
    routes.push({
      label: 'Fosteri',
      value: '/management/fosteri',
      url: '/management/fosteri',
    });
  }

  if (useAccountQuery().data?.roles?.includes('Manager')) {
    routes.push({
      label: 'Cereri',
      value: '/management/cereri',
      url: '/management/cereri',
    });
  }

  const [activeTab, setActiveTab] = useState<string>(
    routes.find((route) => location.pathname.startsWith(route.value))?.value ||
      '/management/program',
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { visibility, onOpen, onClose } = useVisibility();
  useEffect(() => {
    if (location.pathname === '/management') {
      navigate('/management/program', { replace: true });
    } else {
      const activeRoute = routes.find((route) =>
        location.pathname.startsWith(route.value),
      );
      setActiveTab(activeRoute!.value);
    }
  }, [location.pathname, navigate, routes]);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.accent?.darkGreen,
        height: '80px',
        overflow: 'hidden',
        paddingLeft: isSmallScreen ? '32px' : isMediumScreen ? '32px' : '400px',
        paddingRight: isSmallScreen || isMediumScreen ? '0px' : '0',
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
        <Grid
          item
          xs
          sx={{
            overflowX: isSmallScreen ? 'auto' : 'visible',
            width: '100%',
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for a cleaner look on mobile
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant={
              isSmallScreen || isMediumScreen ? 'scrollable' : 'standard'
            }
            scrollButtons={isSmallScreen || isMediumScreen ? 'auto' : false}
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
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
                      ? theme.palette.accent?.beige
                      : theme.palette.accent?.beige,
                  borderRadius: '16px',
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.button.fontWeight,
                  minHeight: '38px',
                  padding: '12px 24px',
                  margin: isSmallScreen || isMediumScreen ? '8px 8px' : '0 8px',
                  transition:
                    'margin-bottom 0.3s ease, padding-bottom 0.3s ease, background-color 0.3s ease',
                  marginTop: activeTab === route.value ? '44px' : '0px',
                  marginBottom: activeTab === route.value ? '0px' : '0',
                  maxWidth: isSmallScreen ? '45%' : 'auto', // Limit width to 45% on mobile
                  flex: isSmallScreen
                    ? '0 0 45%'
                    : isMediumScreen
                      ? '0 0 30%'
                      : 'initial',
                  '&:hover': {
                    backgroundColor: theme.palette.accent?.beige,
                    color: theme.palette.accent?.green,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.accent?.beige,
                    color: theme.palette.accent?.darkGreen,
                    borderRadius: '16px 16px 0 0',
                    borderBottom: `38px solid ${theme.palette.accent?.beige}`,
                    paddingBottom: '14px',
                    transition:
                      'margin-bottom 0.3s ease, padding-bottom 0.3s ease, border-bottom 0.3s ease',
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
            marginLeft: '0 auto',
          }}
        >
          <NotificationsBar />

          <IconButton
            component={Link}
            to="/"
            color="inherit"
            aria-label="Home"
            sx={{
              color: theme.palette.accent?.beige,
              margin: '0 auto',
            }}
            size="large"
          >
            <HouseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </AppBar>
  );
};
