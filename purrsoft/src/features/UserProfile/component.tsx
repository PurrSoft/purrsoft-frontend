import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import { DatePicker } from '../../components/DatePicker';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAccountQuery, useGetShiftsQuery } from '../../store';

type Props = {};

export const UserProfile = (props: Props) => {
  const theme = useTheme();
  const [specialDates, setSpecialDates] = useState<Date[]>([]);

  const accountQuery = useAccountQuery();
  const username = accountQuery.data?.email;
  const userId = accountQuery.data?.id;

  const {
    data: shiftsData,
    isLoading: shiftsLoading,
    error: shiftsError,
  } = useGetShiftsQuery(
    { VolunteerId: userId },
    {
      skip: !userId, // This prevents the query from running if there's no userId
    },
  );

  useEffect(() => {
    if (shiftsData && !shiftsLoading && !shiftsError) {
      setSpecialDates(
        shiftsData.records.map((record) => new Date(record.start)),
      );
    }
  }, [shiftsData, shiftsLoading, shiftsError]);

  const navigate = useNavigate();
  const today = new Date();
  const closestDate = specialDates
    .filter((date) => date > today) // filter future dates
    .sort((a, b) => a.getTime() - b.getTime())[0]; // get the closest one by sorting

  return (
    <Box
      component={Paper}
      sx={{
        position: 'fixed', // Fixed sidebar on tablet and larger screens
        top: '16px',
        left: '16px',
        width: { xs: '280px', sm: '320px' },
        maxHeight: '100vh',
        backgroundColor: theme.palette.accent?.beige,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: '24px',
        border: `10px solid ${theme.palette.accent?.lightGreen}`,
        boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        overflow: 'auto',
      }}
    >
      <Box
        component="img"
        src="/green-cats-logo.png"
        alt="description"
        sx={{
          width: '40%',
          height: 'auto',
          borderRadius: '8px',
        }}
      />
      <Box
        sx={{
          backgroundColor: theme.palette.accent?.lightGreen,
          width: '100%',
          textAlign: 'center',
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.8rem', sm: '1rem' },
            color: theme.palette.accent?.beige,
          }}
        >
          {username}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          minHeight: '300px',
          overflow: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <DatePicker specialDates={specialDates} />
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.accent?.lightGreen,
          width: '100%',
          textAlign: 'center',
          padding: theme.spacing(1),
          borderRadius: '30px',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.8rem', sm: '1rem' },
            color: theme.palette.accent?.beige,
          }}
        >
          Urmatorul Shift
        </Typography>
        {closestDate && (
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
          >
            {closestDate.toLocaleDateString('en-EN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
            ,{' '}
            {closestDate.toLocaleTimeString('en-EN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Typography>
        )}
        <Typography
          sx={{
            fontSize: { xs: '0.8rem', sm: '1rem' },
            color: theme.palette.accent?.beige,
          }}
        >
          Locatie: La Casuta
        </Typography>
      </Box>
      <Button
        onClick={() => {
          console.log('Navigating to account overview');
          navigate('/account-overview/contul-meu');
        }}
        sx={{
          backgroundColor: theme.palette.accent?.darkGreen,
          width: '100%',
          color: theme.palette.accent?.beige,
          fontSize: { xs: '0.8rem', sm: '1rem' },
          marginBottom: theme.spacing(3),
        }}
      >
        Contul meu
      </Button>

      {/* Additional sidebar content */}
    </Box>
  );
};
