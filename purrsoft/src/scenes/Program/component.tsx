import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { RemoveCircle, AddCircle } from '@mui/icons-material';
import { useVisibility } from '../../hooks/useVisibility';
import {
  useAccountQuery,
  useAddShiftMutation,
  useGetShiftCountByDateQuery,
  useGetShiftsQuery,
  useRemoveShiftMutation,
} from '../../store';
import { AppSnackbar } from '../../components/AppSnackbar';
import { ProgramDatePicker } from '../../components/ProgramDatePicker';
import { ShiftType } from '../../store/api/shifts';

type ShiftMetadata = {
  [key: string]: {
    color?: string;
    tooltip?: string;
  };
};

export const Program = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [mode, setMode] = useState<'volunteer' | 'admin'>('volunteer');

  const { data: user, isLoading: isUserLoading } = useAccountQuery();
  const { data: shiftsData, isLoading: isShiftsLoading } = useGetShiftsQuery({
    Skip: 0,
    Take: 1000,
    VolunteerId: user?.id,
  });

  const {
    visibility: snackbarOpen,
    onOpen: onSnackbarOpen,
    onClose: onSnackbarClose,
  } = useVisibility();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const [shiftMetadata, setShiftMetadata] = useState<ShiftMetadata>({});

  // Set admin mode if the user has the 'admin' role
  useEffect(() => {
    if (user?.roles.includes('admin')) {
      setMode('admin');
    }
  }, [user]);

  // Update metadata for the calendar based on shifts
  useEffect(() => {
    if (shiftsData) {
      const metadata: ShiftMetadata = {};
      shiftsData.records?.forEach((shift) => {
        const shiftDate = shift.start.split('T')[0]; // Extract YYYY-MM-DD
        const color =
          shift.shiftType === 'Day'
            ? theme.palette.warning.main
            : theme.palette.accent?.lavenderBlue;
        metadata[shiftDate] = {
          color,
          tooltip: shift.shiftType === 'Day' ? 'Tura de zi' : 'Tura de seară',
        };
      });
      setShiftMetadata(metadata);
    }
  }, [shiftsData, theme]);

  const [shiftChangeType, setShiftChangeType] = useState<ShiftType | null>(
    null,
  );

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date.format('YYYY-MM-DD')); // Store as YYYY-MM-DD
  };
  //use add mutation
  const [addShift] = useAddShiftMutation();

  //find shift id
  function findShiftId(date: string, shiftType: ShiftType) {
    const shift = shiftsData?.records?.find(
      (shift) =>
        shift.start.split('T')[0] === date && shift.shiftType === shiftType,
    );
    return shift?.id;
  }
  // Add shift
  const handleAddShift = async (date: string, shiftType: ShiftType) => {
    try {
      await addShift({
        shiftDto: {
          start: dayjs(date).format(),
          shiftType,
          volunteerId: user?.id || '',
        },
      }).unwrap();

      console.log(`Shift (${shiftType}) added for ${date}`);
      setSnackbarMessage(`Shift (${shiftType}) added for ${date}`);
      setSnackbarSeverity('success');
      onSnackbarOpen();
    } catch (error) {
      console.error('Failed to add shift:', error);
      setSnackbarMessage('Failed to add shift');
      setSnackbarSeverity('error');
      onSnackbarOpen();
    }
  };
  //remove
  const [removeShift] = useRemoveShiftMutation();
  const handleRemoveShift = async (date: string, shiftType: ShiftType) => {
    const shiftId = findShiftId(date, shiftType);
    if (!shiftId) return;

    try {
      await removeShift(shiftId).unwrap();
      console.log(`Shift (${shiftType}) removed for ${date}`);
      setSnackbarMessage(`Shift (${shiftType}) removed for ${date}`);
      setSnackbarSeverity('success');
      onSnackbarOpen();
    } catch (error) {
      console.error('Failed to remove shift:', error);
      setSnackbarMessage('Failed to remove shift');
      setSnackbarSeverity('error');
      onSnackbarOpen();
    }
  };

  const hasShift = (date: string, shiftType: ShiftType): boolean => {
    console.log(date, shiftType);
    // Implement the actual logic to check if the shift exists
    if (shiftsData?.records) {
      return shiftsData.records.some(
        (shift) =>
          shift.start.split('T')[0] === date && shift.shiftType === shiftType,
      );
    }

    return false; // Placeholder return value
  };
  //when date is selected set th enumber of shifts
  const { data: shiftCountData, refetch: refetchShiftCount } =
    useGetShiftCountByDateQuery({
      date: selectedDate || '',
    });

  const totalShiftCount = shiftCountData?.totalShiftCount || 0;
  const dayShiftsCount = shiftCountData?.dayShiftsCount || 0;
  const nightShiftsCount = shiftCountData?.nightShiftsCount || 0;

  useEffect(() => {
    if (selectedDate) {
      refetchShiftCount();
    }
  }, [selectedDate, refetchShiftCount]);
  return isUserLoading || isShiftsLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Grid
        container
        width="100%"
        justifyContent="center"
        spacing={2}
        gap={2}
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {/* Display the top section (Numărul de persoane) conditionally */}
        {selectedDate && (
          <Grid
            item
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: theme.palette.accent?.darkGreen,
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '16px',
                }}
              >
                Numărul de persoane: {totalShiftCount}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: theme.palette.warning.main,
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '16px',
                }}
              >
                Numar tura de zi: {dayShiftsCount}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: theme.palette.accent?.lavenderBlue,
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '16px',
                }}
              >
                Numar tura de noapte: {nightShiftsCount}
              </Typography>
            </Grid>
          </Grid>
        )}

        {/* Calendar Component */}
        <Grid item xs={12} md={8}>
          <ProgramDatePicker
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            dateMetadata={shiftMetadata}
          />
        </Grid>

        {/* Legend */}
        {mode !== 'admin' && (
          <Grid
            item
            container
            xs={12}
            md={8}
            gap={2}
            flexDirection={'row'}
            flexWrap={'nowrap'}
            justifyContent="center"
            alignItems={'center'}
          >
            <Typography variant="h5" fontWeight={'bold'} color="black">
              LEGENDA:
            </Typography>
            <Grid item container spacing={1} gap={2} flexDirection={'row'}>
              <Grid item>
                <Typography
                  sx={{
                    padding: '5px 10px',
                    backgroundColor: theme.palette.error.main,
                    color: 'white',
                    borderRadius: '16px',
                  }}
                >
                  Eveniment
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    padding: '5px 10px',
                    backgroundColor: theme.palette.warning.main,
                    color: 'white',
                    borderRadius: '16px',
                  }}
                >
                  Tura de zi
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    padding: '5px 10px',
                    backgroundColor:
                      theme.palette.accent?.lavenderBlue || 'defaultColor',
                    color: 'white',
                    borderRadius: '16px',
                  }}
                >
                  Tura de seară
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Selected Day and Shifts */}
        <Grid
          item
          container
          xs={12}
          md={8}
          gap={2}
          justifyContent="center"
          flexDirection={'row'}
          alignItems={'center'}
          flexWrap={'nowrap'}
        >
          <Grid item>
            <Typography variant="h5" fontWeight="bold" color="black">
              ZIUA SELECTATA:
            </Typography>
          </Grid>
          <Grid item>
            {selectedDate ? (
              <Typography variant="h5" color="black">
                {dayjs(selectedDate).format('DD/MM/YYYY')}
              </Typography>
            ) : (
              <Typography variant="h5">../../....</Typography>
            )}
          </Grid>

          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            flexDirection={'row'}
          >
            <Grid item>
              <Typography variant="h5" color="black">
                Tura:
              </Typography>
            </Grid>

            {/* Morning Shift (Dim) */}
            <Grid item>
              <Tooltip
                title={
                  hasShift(selectedDate || '', 'Day')
                    ? 'Ai deja tura de dimineață'
                    : 'Adaugă tura de dimineață'
                }
              >
                <Chip
                  label="dim"
                  clickable
                  sx={{
                    backgroundColor: hasShift(selectedDate || '', 'Day')
                      ? theme.palette.error.main
                      : shiftChangeType === 'Day'
                        ? theme.palette.accent?.lightGreen
                        : 'transparent',
                    color: 'black',
                    fontSize: '1rem', // Increase font size
                    padding: '10px', // Increase padding
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setShiftChangeType('Day')}
                />
              </Tooltip>
            </Grid>
            <Grid item>/</Grid>
            {/* Evening Shift (Seara) */}
            <Grid item>
              <Tooltip
                title={
                  hasShift(selectedDate || '', 'Night')
                    ? 'Ai deja tura de seară'
                    : 'Adaugă tura de seară'
                }
              >
                <Chip
                  label="seara"
                  clickable
                  sx={{
                    backgroundColor: hasShift(selectedDate || '', 'Night')
                      ? theme.palette.error.main
                      : shiftChangeType === 'Night'
                        ? theme.palette.accent?.lightGreen
                        : 'transparent',
                    color: 'black',
                    fontSize: '1rem', // Increase font size
                    padding: '10px', // Increase padding
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setShiftChangeType('Night')}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              {shiftChangeType &&
              hasShift(selectedDate || '', shiftChangeType) ? (
                <IconButton
                  onClick={() =>
                    shiftChangeType &&
                    handleRemoveShift(selectedDate || '', shiftChangeType)
                  }
                >
                  <RemoveCircle />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    if (shiftChangeType) {
                      handleAddShift(selectedDate || '', shiftChangeType);
                    }
                  }}
                >
                  <AddCircle />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
