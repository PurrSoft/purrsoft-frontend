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
      width={'70%'}
      flexDirection={'row'}
      sx={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center', // Center elements vertically
        margin: 0,
        gap: 30, // Increased gap between items for more spacing
        zIndex: 4,
        padding: '10px 0', // Extra padding for a more spacious feel
      }}
    >
      <Toolbar sx={{ width: '100%' }}>
        {/* Logo */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <img
            src="/green-cats-logo.png"
            alt="Green Cats"
            style={{ height: 100, marginRight: 120, width: 100 }}
          />
        </Typography>

        {/* Navigation Links */}
        <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{
            color: theme.palette.accent?.green,
            fontSize: '1.6rem',
            marginRight: 3,
            whiteSpace: 'nowrap',
          }}
        >
          Acasă
        </Button>
        <Button
          component={Link}
          to="/about"
          color="inherit"
          sx={{
            color: theme.palette.accent?.green,
            fontSize: '1.2rem',
            marginRight: 3,
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="h4" sx={{ whiteSpace: 'nowrap' }}>
            Despre noi
          </Typography>
        </Button>
        <Button
          onClick={handlePopoverOpen}
          endIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: theme.palette.accent?.darkGreen,
            color: '#fff',
            borderRadius: 0,
            padding: '8px 40px',
            fontSize: '1.2rem',
            whiteSpace: 'nowrap',
          }}
        >
          Implică-te!
        </Button>

        {/* Accordion Button for "Implică-te!" */}
        <Popover
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
          <Grid container direction="column" style={{ padding: '15px 25px' }}>
            <Button
              component={Link}
              to="/volunteer"
              color="inherit"
              style={{
                color: theme.palette.accent?.green,
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              <Typography variant="h5" sx={{ whiteSpace: 'nowrap' }}>
                Voluntariat
              </Typography>
            </Button>
            <Button
              component={Link}
              to="/donate"
              color="inherit"
              style={{
                color: theme.palette.accent?.green,
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              Donate
            </Button>
          </Grid>
        </Popover>

        {/* User Profile Icon */}

        <IconButton
          component={Link}
          to="/login"
          edge="end"
          color="inherit"
          sx={{ marginLeft: 3 }}
        >
          <AccountCircle
            sx={{
              color: theme.palette.accent?.darkGreen,
              fontSize: '2.5rem',
            }}
          />
          <Typography
            variant="h4"
            sx={{ marginLeft: 1, fontSize: '1.5rem', whiteSpace: 'nowrap' }}
          >
            Login
          </Typography>
        </IconButton>
      </Toolbar>
    </Grid>
  );
};
