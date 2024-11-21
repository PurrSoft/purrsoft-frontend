import { useState } from 'react';
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Popover,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  AccountCircle,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { PopOver } from './AlaturatePopOver';

export const SecondaryNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const theme = useTheme();
  return (
    <Grid
      container
      width={'60%'}
      flexDirection={'row'}
      sx={{
        flex: 1,
        justifyContent: 'space-between', // Adjust alignment to avoid overflow
        margin: 0,
        gap: 20,
        zindex: 4,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
          <img
            src="/green-cats-logo.png"
            alt="Green Cats"
            style={{ height: 100, marginRight: 100 }}
          />
        </Typography>

        {/* Navigation Links */}
        <Button
          component={Link}
          to="/"
          color="inherit"
          style={{ color: '#4CAF50' }}
        >
          Acasă
        </Button>
        <Button
          component={Link}
          to="/about"
          color="inherit"
          style={{ color: '#4CAF50' }}
        >
          <Typography variant="h5">Despre noi</Typography>
        </Button>
        {/* <Button
          onClick={handlePopoverOpen}
          endIcon={<ExpandMoreIcon />}
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            borderRadius: 4,
            padding: '5px 10px',
          }}
        >
          <Typography variant="h5">Implică-te!</Typography>
        </Button> */}
        {/* Accordion Button for "Implică-te!" */}
        {/* <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Grid container direction="column" style={{ padding: '10px 20px' }}>
            <Button
              component={Link}
              to="/volunteer"
              color="inherit"
              style={{ color: '#4CAF50', textAlign: 'left' }}
            >
              <Typography variant="h6">Voluntariat</Typography>
            </Button>
            <Button
              component={Link}
              to="/donate"
              color="inherit"
              style={{
                color: theme.palette.accent?.green,
                textAlign: 'left',
              }}
            >
              Donate
            </Button>
          </Grid>
        </Popover> */}
        <PopOver />

        {/* User Profile Icon */}
        <IconButton edge="end" color="inherit">
          <AccountCircle style={{ color: theme.palette.accent?.darkGreen }} />
          <Typography variant="h5">Login</Typography>
        </IconButton>
      </Toolbar>
    </Grid>
  );
};
