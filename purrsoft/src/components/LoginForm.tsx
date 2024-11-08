import React, { useState } from 'react';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import greencatsLogo from '../assets/greencats-logo.svg';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    (<Box sx={{ position: 'relative', padding: 3 }}>
      <Box
        component="img"
        src={greencatsLogo}
        alt="Green Cats Logo"
        sx={{
          width: 80,
          height: 80,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 600, pt: 7 }}>
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          slotProps={
            {
              input: {
                startAdornment: (
                  // to display "Email" label above the text box
                  <InputAdornment position="start" />
                ),
              }              
            }
          }
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />

        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <Link href="#" underline="none" sx={{ color: '#4B7F52', fontSize: '0.875rem' }}>
            Forgot Password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mb: 2,
          }}
        >
          Log in
        </Button>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderColor: '#4B7F52',
            color: '#4B7F52',
            backgroundColor: '#F8F7F6',
            '&:hover': {
              borderColor: '#4B7F52',
              backgroundColor: 'transparent',
            },
          }}
        >
          <Box
            component="img"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            sx={{ width: 20, height: 20, mr: 1 }}
            alt="Google logo"
          />
          Log in with Google
        </Button>
      </form>
    </Box>)
  );
};

export default LoginForm;
