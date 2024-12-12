import { useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import * as Yup from 'yup';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import { useAccountQuery, useChangePasswordMutation } from '../../../store';
import { AppSnackbar } from '../../../components/AppSnackbar'; // Import your Snackbar component

// Validation Schema
const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Parola curenta este obligatorie'),
  newPassword: Yup.string()
    .min(6, 'Parola noua trebuie sa aiba cel putin 6 caractere')
    .required('Parola noua este obligatorie'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Parolele nu corespund')
    .required('Confirmarea parolei este obligatorie'),
});

export const SchimbaParola = () => {
  const theme = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data: user } = useAccountQuery();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [changePassword, { isLoading: isSubmitting, isError, error }] =
    useChangePasswordMutation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const values = { currentPassword, newPassword, confirmPassword };

    // Validate the form data
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({}); // Clear any validation errors

      // Call the change password mutation
      await changePassword({
        email: user?.email || '', // Ensure the user's email is passed
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap(); // Unwrap the promise for clean error handling

      console.log('Password changed successfully');

      // Optionally reset the fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Show success snackbar
      setSnackbarMessage('Parola a fost schimbata cu succes!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      if ((error as Yup.ValidationError)?.inner) {
        // Validation errors from Yup
        const errorMap: { [key: string]: string } = {};
        (error as Yup.ValidationError).inner.forEach(
          (err: Yup.ValidationError) => {
            if (err.path) {
              errorMap[err.path] = err.message;
            }
          },
        );
        setErrors(errorMap);
      } else if ((error as { data?: { message?: string } })?.data) {
        // Server errors from the mutation
        setErrors({
          server:
            (error as { data?: { message?: string } }).data?.message ||
            'Eroare la schimbarea parolei',
        });

        // Show error snackbar
        setSnackbarMessage(
          (error as { data?: { message?: string } }).data?.message ||
            'Eroare la schimbarea parolei',
        );
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="black" gutterBottom>
        Schimba Parola:
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <AccountInfoGridItem
            title="Parola curenta"
            isValueEditable={true}
            value={currentPassword}
            validationSchema={
              Yup.reach(validationSchema, 'currentPassword') as Yup.AnySchema
            }
            onEditValue={(value) => setCurrentPassword(value)}
            type="password"
          />
          {errors.currentPassword && (
            <Typography variant="body2" color="red">
              {errors.currentPassword}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <AccountInfoGridItem
            title="Parola noua"
            isValueEditable={true}
            value={newPassword}
            validationSchema={
              Yup.reach(validationSchema, 'newPassword') as Yup.AnySchema
            }
            onEditValue={(value) => setNewPassword(value)}
            type="password"
          />
          {errors.newPassword && (
            <Typography variant="body2" color="red">
              {errors.newPassword}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <AccountInfoGridItem
            title="Confirmare parola noua"
            isValueEditable={true}
            value={confirmPassword}
            validationSchema={
              Yup.reach(validationSchema, 'confirmPassword') as Yup.AnySchema
            }
            onEditValue={(value) => setConfirmPassword(value)}
            type="password"
          />
          {errors.confirmPassword && (
            <Typography variant="body2" color="red">
              {errors.confirmPassword}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              backgroundColor: theme.palette.accent?.mutedGreen,
              color: 'white',
            }}
          >
            {isSubmitting ? 'Se schimbă...' : 'Schimba Parola'}
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for Success/Error Messages */}
      <AppSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
      >
        {snackbarMessage}
      </AppSnackbar>
    </Box>
  );
};
