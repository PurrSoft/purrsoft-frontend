import { Typography, Grid, CircularProgress, useTheme } from '@mui/material';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import { AppSnackbar } from '../../../components/AppSnackbar';
import * as Yup from 'yup';
import { useAccountQuery, useUpdateAccountMutation } from '../../../store';
import { useVisibility } from '../../../hooks/useVisibility';
import { useState } from 'react';
import { User } from '../../../store/api/auth/slice';
export const ContulMeu = () => {
  // Retrieve user data
  const { data: user, isLoading } = useAccountQuery();

  // Mutation hook for updating the account
  const [updateAccount] = useUpdateAccountMutation();

  const theme = useTheme();

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
    field: keyof User,
    value: string,
    rollbackFn: () => void,
  ) => {
    try {
      if (!user) return;

      const updatedUser = {
        ...user,
        [field]: value,
      };

      // Remove null or undefined fields
      Object.keys(updatedUser).forEach((key) => {
        if (updatedUser[key as keyof typeof user] == null) {
          delete updatedUser[key as keyof typeof user];
        }
      });

      await updateAccount({ applicationUserDto: updatedUser }).unwrap(); // Call the API

      setSnackbarMessage(`${field} updated successfully!`);
      setSnackbarSeverity('success');
      onSnackbarOpen();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setSnackbarMessage(`Error updating ${field}`);
      setSnackbarSeverity('error');
      onSnackbarOpen();
      rollbackFn();
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
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
              value={user?.lastName || ''}
              isValueEditable
              onEditValue={(value) =>
                handleUpdateAccount('lastName', value, () => {})
              }
              validationSchema={Yup.string().required(
                'Numele este obligatoriu',
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <AccountInfoGridItem
              title="Prenume:"
              value={user?.firstName || ''}
              isValueEditable
              onEditValue={(value) =>
                handleUpdateAccount('firstName', value, () => {})
              }
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
              value={user?.email || ''}
              isValueEditable
              onEditValue={(value) =>
                handleUpdateAccount('email', value, () => {})
              }
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
