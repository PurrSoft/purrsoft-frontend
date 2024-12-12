import { useState } from 'react';
import { Typography, Grid, CircularProgress, useTheme } from '@mui/material';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import { AppSnackbar } from '../../../components/AppSnackbar'; // Import Snackbar
import * as Yup from 'yup';
import { useAccountQuery, useUpdateAccountMutation } from '../../../store';
import { useVisibility } from '../../../hooks/useVisibility'; // Import the visibility hook

export const ContulMeu = () => {
  // Retrieve user data
  const { data: user, isLoading } = useAccountQuery();

  // State for each field
  const [nume, setNume] = useState(user?.lastName || 'Not Found');
  const [prenume, setPrenume] = useState(user?.firstName || 'Not Found');
  const [email, setEmail] = useState(user?.email || 'Not Found');
  const [isEditing, setIsEditing] = useState(false); // Track editing status for all fields
  const theme = useTheme();

  // Mutation hook for updating the account
  const [updateAccount] = useUpdateAccountMutation();

  // Visibility hook for the Snackbar
  const {
    visibility: snackbarOpen,
    onOpen: onSnackbarOpen,
    onClose: onSnackbarClose,
  } = useVisibility();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  // Function to handle account updates
  const handleUpdateAccount = async (
    field: string,
    value: string,
    previousValue: string,
    rollbackFn: () => void,
  ) => {
    setIsEditing(true); // Set editing to true while waiting for API response
    try {
      const updatedUser = { ...user, [field]: value }; // Create updated user object
      await updateAccount(updatedUser).unwrap(); // Call the API
      console.log(`${field} updated successfully`);
      setSnackbarMessage(`${field} updated successfully!`);
      setSnackbarSeverity('success');
      onSnackbarOpen(); // Show success snackbar
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setSnackbarMessage(`Error updating ${field}`);
      setSnackbarSeverity('error');
      onSnackbarOpen(); // Show error snackbar
      rollbackFn(); // Rollback the value if the API call fails
    } finally {
      setIsEditing(false); // Reset editing status
    }
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Grid
        container
        sx={{
          width: '100%',
          height: { xs: 'auto', md: '100%' },
          flexDirection: 'column',
          gap: theme.spacing(2),
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="black" gutterBottom>
          Informatii generale
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccountInfoGridItem
              title="Nume:"
              value={nume}
              isValueEditable
              isDisabled={isEditing} // Disable editing if waiting for API
              onEditValue={(value) => {
                const previousValue = nume; // Save the previous value
                handleUpdateAccount('lastName', value, previousValue, () =>
                  setNume(previousValue),
                ); // Revert if API fails
              }}
              validationSchema={Yup.string().required(
                'Numele este obligatoriu',
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountInfoGridItem
              title="Prenume:"
              value={prenume}
              isValueEditable
              isDisabled={isEditing} // Disable editing if waiting for API
              onEditValue={(value) => {
                const previousValue = prenume; // Save the previous value
                handleUpdateAccount('firstName', value, previousValue, () =>
                  setPrenume(previousValue),
                ); // Revert if API fails
              }}
              validationSchema={Yup.string().required(
                'Prenumele este obligatoriu',
              )}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          fontWeight="bold"
          color="black"
          gutterBottom
          mt={4}
        >
          Informatii de contact
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccountInfoGridItem
              title="Email:"
              value={email}
              isValueEditable
              isDisabled={isEditing} // Disable editing if waiting for API
              onEditValue={(value) => {
                const previousValue = email; // Save the previous value
                console.log('email', value);
                handleUpdateAccount('email', value, previousValue, () =>
                  setEmail(previousValue),
                ); // Revert if API fails
              }}
              validationSchema={Yup.string()
                .email('Adresa de email este invalida')
                .required('Email-ul este obligatoriu')}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Snackbar for showing success/error messages */}
      <AppSnackbar
        open={snackbarOpen}
        onClose={onSnackbarClose}
        severity={snackbarSeverity}
      >
        {snackbarMessage}
      </AppSnackbar>
    </>
  );
};
