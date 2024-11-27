import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Card,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import greencatsLogo from '/green-cats-logo.png';
import { useAppDispatch, useLoginMutation, updateToken } from '../../store/store';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useVisibility } from '../../hooks/useVisibility';
import { AppSnackbar } from '../../components/AppSnackbar';

type LoginFormData = {
  email: string;
  password: string;
};
const initialValues: LoginFormData = {
  email: '',
  password: '',
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    visibility: snackbarOpen,
    onOpen: onSnackbarOpen,
    onClose: onSnackbarClose,
  } = useVisibility();

  const [onLogin, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const loginFormSchema = yup
  .object({
    email: yup.string().email('Email invalid').required('Câmp obligatoriu'),
    password: yup
      .string()
      .min(8, 'Parola trebuie să aibă cel puțin 8 caractere')
      .matches(/\d/, 'Parola trebuie să conțină cel puțin o cifră')
      .required('Câmp obligatoriu'),
  })
  .required();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    onLogin(data)
      .then(({ data }) => {
        if (!data?.result) {
          return onSnackbarOpen();
        }

        dispatch(updateToken(data?.result.token));
      })
      .catch(() => {
        onSnackbarOpen();
      });
  };
  
  const token = document.cookie.split('=')[1];

  useEffect(() => {
    if (token) {
      dispatch(updateToken(token));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: 'accent.beige',
          }}
        >
          <Box sx={{ position: 'relative', padding: 3 }}>
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
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 600, pt: 7 }}>
              Log in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render = {({field}) => (
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        // to display label above the text box
                        <InputAdornment position="start" />
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                  {...field}
                />
                )}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link href="#" underline="none" sx={{ color: 'accent.green', fontSize: '0.875rem' }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isValid || isLoading || isSuccess}
                sx={{
                  backgroundColor: 'accent.green',
                  color: 'accent.lightBeige',
                  borderColor: 'accent.beige',
                  mb: 2,
                  '&:hover': {
                    backgroundColor: 'accent.darkGreen',
                  },
                }}
              >
                Log in
              </Button>

              <Divider sx={{ my: 2 }} />

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: 'accent.green',
                  color: 'accent.green',
                  backgroundColor: 'accent.lightBeige',
                  '&:hover': {
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
              <AppSnackbar
                open={snackbarOpen && isError}
                onClose={onSnackbarClose}
                severity="error"
              >
                {error && 'Credentialele sunt gresite'}
              </AppSnackbar>
            </form>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};