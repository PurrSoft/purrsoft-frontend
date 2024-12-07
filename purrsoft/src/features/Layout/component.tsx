import {
  Box,
  useTheme,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { UserProfile } from '../UserProfile';

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
          <UserProfile />
        </Drawer>
      ) : (
        
          <UserProfile />
      )}

      {/* Main Content Area */}
      <Box
        overflow="auto"
        height="100%"
        flexGrow={1}
        sx={{
          paddingLeft: isMedium || isSmallScreen ? 0 : '350px',
          transition: 'padding-left 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
