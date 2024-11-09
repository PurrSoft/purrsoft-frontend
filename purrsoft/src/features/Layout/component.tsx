import Navbar from '../Navbar/component';
import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
export const Layout = () => {
  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        position="relative"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {/* Navbar */}
        <Box width="100%" zIndex="10">
          <Navbar />
        </Box>

        {/* Menu Placeholder (Overlay) */}
        <Box
          component={Paper}
          sx={{
            position: 'absolute',
            top: 20,
            left: 40,
            width: '320px', // Fixed width for the menu
            height: '100vh', // Full height to overlay the navbar and content
            backgroundColor: '#ECEADA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: '16px 16px 16px 16px', // Rounded right corners
            boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)', // Slight shadow on the right
            zIndex: 15, // Higher than the navbar to overlay
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <Typography variant="body1">Profile</Typography>
          {/* Add more items as needed */}
        </Box>

        {/* Main Content Area */}
        <Box
          overflow="auto"
          height="100%"
          flexGrow={1}
          paddingLeft="400px" // Offset to make room for the overlayed menu
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
