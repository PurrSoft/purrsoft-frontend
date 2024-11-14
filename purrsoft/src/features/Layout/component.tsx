import {
  Box,
  Paper,
  Typography,
  useTheme,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

export const Layout = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Mobile screens
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Tablet screens
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Navbar */}
      <Box width="100%" zIndex="10" position="relative">
        <Navbar />

        {/* Show Menu Icon for Mobile */}
        {(isSmallScreen || isMedium) && (
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ position: 'absolute', top: 20, left: 16, zIndex: 20 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Sidebar as Drawer on Mobile, Permanent on Tablet and Larger Screens */}
      {isSmallScreen || isMedium ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          variant="temporary"
          sx={{
            '& .MuiDrawer-paper': {
              width: '80%',
              boxSizing: 'border-box',
              backgroundColor: '#ECEADA',
            },
          }}
        >
          <Box
            component={Paper}
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ECEADA',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Menu
            </Typography>
            <Typography variant="body1">Profile</Typography>
            {/* Additional sidebar content */}
          </Box>
        </Drawer>
      ) : (
        <Box
          component={Paper}
          sx={{
            position: 'fixed', // Fixed sidebar on tablet and larger screens
            top: '16px',
            left: '32px',
            width: '320px',
            height: '80vh',
            backgroundColor: '#ECEADA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: '16px 16px 16px 16px',
            boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <Typography variant="body1">Profile</Typography>
          {/* Additional sidebar content */}
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        overflow="auto"
        height="100%"
        flexGrow={1}
        sx={{
          paddingLeft: isMedium || isSmallScreen ? 0 : '400px',
          transition: 'padding-left 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
