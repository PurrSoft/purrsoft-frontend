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
  Switch,
  Button,
  ListItemButton,
} from '@mui/material';
import { RemoveCircle, AddCircle } from '@mui/icons-material';
import { useVisibility } from '../../hooks/useVisibility';
import {
  useAccountQuery,
  useAddShiftMutation,
  useGetEventsQuery,
  useGetShiftCountByDateQuery,
  useGetShiftsQuery,
  useGetShiftVolunteersQuery,
  useGetVolunteersPaginatedQuery,
  useRemoveShiftMutation,
  useUpdateShiftMutation,
} from '../../store';
import { AppSnackbar } from '../../components/AppSnackbar';
import { ProgramDatePicker } from '../../components/ProgramDatePicker';
import { ShiftType } from '../../store/api/shifts';
import Typeahead from '../../components/TypeAhead/component';
import { CustomCard } from '../../components/CustomCard';

type ShiftMetadata = {
  [key: string]: {
    color?: string;
    tooltip?: string;
  };
};

export const Program = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [highestRole, setHighestRole] = useState<string | null>(null);
  const [lowkeyRole, setLowkeyRole] = useState<string | null>(null);
  const { data: user, isLoading: isUserLoading } = useAccountQuery();
  useEffect(() => {
    if (user?.roles) {
      const roles = user.roles;
      if (roles.includes('Foster')) {
        setHighestRole('foster');
      }
      if (roles.includes('Admin')) {
        setHighestRole('admin');
      }
      if (roles.includes('Manager')) {
        setHighestRole('admin');
      }
      if (roles.includes('Volunteer')) {
        setHighestRole('volunteer');
      }
    }
  }, [user, highestRole]);
  //set lowest role
  useEffect(() => {
    if (user?.roles) {
      const roles = user.roles;
      if (roles.includes('Manager')) {
        setLowkeyRole('admin');
      }
      if (roles.includes('Admin')) {
        setLowkeyRole('admin');
      }

      if (roles.includes('Volunteer')) {
        setLowkeyRole('volunteer');
      }
      if (roles.includes('Foster')) {
        setLowkeyRole('foster');
      }
    }
  }, [user, lowkeyRole]);
  console.log(lowkeyRole);
  const [mode, setMode] = useState<'admin' | 'volunteer' | 'foster'>(null);

  useEffect(() => {
    if (lowkeyRole) {
      setMode(lowkeyRole as 'admin' | 'volunteer' | 'foster');
    }
    if (lowkeyRole === 'admin') {
      setMode('volunteer');
    }
  }, [lowkeyRole]);

  console.log(mode);

  const { data: shiftsData, isLoading: isShiftsLoading } = useGetShiftsQuery({
    Skip: 0,
    Take: 1000,
    ...(mode !== 'admin' && { VolunteerId: user?.id }),
  });

  /* i need to check if user is admin or not */
  const [selectedVolunteer, setSelectedVolunteer] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const [selectedShift, setSelectedShift] = useState<{
    id: string;
    date: string;
    shiftType: ShiftType;
    nameOfVolunteer: string;
    volunteerId?: string;
  } | null>(null);
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
  const { data: eventsData, isLoading: isEventsLoading } = useGetEventsQuery({
    Skip: 0,
    Take: 1000,
  });
  useEffect(() => {
    const metadata: ShiftMetadata = {};

    // Add shift data to metadata
    shiftsData?.records?.forEach((shift) => {
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

    // Add event data to metadata
    eventsData?.records?.forEach((event) => {
      const eventDate = dayjs(event.date).format('YYYY-MM-DD');
      metadata[eventDate] = {
        color: theme.palette.error.main,
        tooltip: 'Eveniment',
      };
    });

    console.log(metadata);
    setShiftMetadata(metadata);
  }, [shiftsData, eventsData, theme]);

  const [shiftChangeType, setShiftChangeType] = useState<ShiftType | null>(
    null,
  );

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    // Reset volunteer selection when a new date is selected
    setSelectedVolunteer(null);
    setSelectedShift(null);
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
          shiftStatus: 'Upcoming',
        },
      }).unwrap();

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

  //update
  const [updateShift] = useUpdateShiftMutation();

  const handleUpdateShiftType = async () => {
    const shiftId = selectedShift?.id;
    if (!shiftId) return;
    const shiftType = selectedShift?.shiftType;
    const newShiftType = shiftType === 'Day' ? 'Night' : 'Day';
    try {
      await updateShift({
        shiftDto: {
          id: shiftId,
          shiftType: newShiftType,
          start: selectedShift?.date,
          volunteerId: selectedShift.volunteerId || '',
          shiftStatus: 'Upcoming',
        },
      }).unwrap();
      setSnackbarMessage(
        `Shift (${newShiftType}) updated for ${selectedShift?.date}`,
      );
      setSnackbarSeverity('success');
      onSnackbarOpen();
    } catch (error) {
      console.error('Failed to update shift:', error);
      setSnackbarMessage('Failed to update shift');
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

  const handleRemoveShiftById = async () => {
    const shiftId = selectedShift?.id;
    if (!shiftId) return;

    try {
      await removeShift(shiftId).unwrap();
      setSnackbarMessage(`Shift removed for ${selectedShift?.date}`);
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
    useGetShiftCountByDateQuery(
      { date: selectedDate || '' },
      { skip: !selectedDate },
    );

  const totalShiftCount = shiftCountData?.totalShiftCount || 0;
  const dayShiftsCount = shiftCountData?.dayShiftsCount || 0;
  const nightShiftsCount = shiftCountData?.nightShiftsCount || 0;

  useEffect(() => {
    if (selectedDate) {
      refetchShiftCount();
    }
  }, [selectedDate, refetchShiftCount]);
  const handleAddShiftToVolunteer = async (volunteerId: string) => {
    if (!selectedDate || !shiftChangeType) return;

    try {
      await addShift({
        shiftDto: {
          start: dayjs(selectedDate).format(),
          shiftType: shiftChangeType,
          volunteerId,
          shiftStatus: 'Upcoming',
        },
      }).unwrap();

      setSnackbarMessage(
        `Shift (${shiftChangeType}) added for ${selectedDate}`,
      );
      setSnackbarSeverity('success');
      onSnackbarOpen();
    } catch (error) {
      console.error('Failed to add shift:', error);
      setSnackbarMessage('Failed to add shift');
      setSnackbarSeverity('error');
      onSnackbarOpen();
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: volunteerData, isLoading: isVolunteerLoading } =
    useGetVolunteersPaginatedQuery(
      { Skip: 0, Take: 1000, Search: searchQuery },
      { refetchOnMountOrArgChange: true }, // Ensures it refetches on changes
    );

  // display the users that have shifts on the selected date
  const { data: shiftVolunteersData, refetch: refetchShiftVolunteers } =
    useGetShiftVolunteersQuery(
      { dayOfShift: selectedDate || '', Skip: 0, Take: 1000 },
      { skip: !selectedDate },
    );

  useEffect(() => {
    if (selectedDate) {
      refetchShiftVolunteers();
    }
  }, [selectedDate, refetchShiftVolunteers]);

  /* is in admin mode or loading */
  return isUserLoading || isShiftsLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Grid
        container
        width="100%"
        justifyContent="center"
        spacing={2}
        gap={1}
        flexDirection={'column'}
        alignItems={'center'}
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {highestRole === 'admin' && (
          <Grid item padding={0}>
            <Switch
              checked={mode === 'admin'}
              onChange={() => setMode(mode === 'admin' ? 'volunteer' : 'admin')}
              sx={{
                width: 50,
                height: 28,
                padding: 0,
                borderRadius: 16,
                '& .MuiSwitch-switchBase': {
                  padding: 0,
                  transition: 'all 0.3s ease',
                  '&.Mui-checked': {
                    transform: 'translateX(22px)',
                    color: '#fff',
                    '& + .MuiSwitch-track': {
                      backgroundColor:
                        theme.palette.accent?.lightGreen || '#4cd964',
                      opacity: 1,
                    },
                  },
                },
                '& .MuiSwitch-thumb': {
                  width: 24,
                  height: 24,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                },
                '& .MuiSwitch-track': {
                  borderRadius: 16,
                  backgroundColor: '#d9d9d9',
                  opacity: 1,
                  transition: 'background-color 0.3s ease',
                },
              }}
            />
            Modul admin
          </Grid>
        )}
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="stretch"
          flexDirection={{
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
          flexWrap="nowrap"
          padding={0}
          width={'100%'}
        >
          {/* Display the top section (Numărul de persoane) conditionally */}
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            flexDirection={'row'}
            gap={1}
          >
            {/*General Information */}
            {selectedDate && mode !== 'admin' && (
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
                      backgroundColor: theme.palette.error.main,
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '16px',
                    }}
                  >
                    Eveniment
                  </Typography>
                </Grid>

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
            <Grid item xs={14} md={10}>
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

            {/* Selected Day and Shifts for volunteer mode */}
            {mode !== 'admin' && mode !== 'foster' && (
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
            )}

            {/*for admin mode the actions are different */}
            {mode === 'admin' && (
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                flexDirection={'row'}
                flexWrap={'nowrap'}
                gap={10}
                padding={2}
              >
                {/* avem un container cu actiuni pentru adaugare de tură */}
                <Grid item container direction="column" spacing={2} xs={8}>
                  <Typography variant="h5" fontWeight="bold">
                    Search Volunteers
                  </Typography>
                  <Typeahead
                    data={
                      volunteerData?.records.map((volunteer) => ({
                        id: volunteer.userId,
                        firstName: volunteer.firstName,
                        lastName: volunteer.lastName,
                        email: volunteer.email,
                      })) || []
                    }
                    isLoading={isVolunteerLoading}
                    onSearch={setSearchQuery}
                    onSelect={(volunteer) =>
                      setSelectedVolunteer({
                        id: volunteer.id,
                        name: `${volunteer.firstName} ${volunteer.lastName}`,
                        email: volunteer.email,
                      })
                    }
                    fieldsToShow={['firstName', 'lastName', 'email']} // Fields shown in dropdown and input
                  />
                </Grid>
                {/* switch for shift type */}
                <Grid item>
                  <Switch
                    checked={shiftChangeType === 'Day'}
                    onChange={() =>
                      setShiftChangeType(
                        shiftChangeType === 'Day' ? 'Night' : 'Day',
                      )
                    }
                    sx={{
                      width: 48,
                      height: 24,
                      padding: 0,
                      '& .MuiSwitch-switchBase': {
                        padding: 0,
                        '&.Mui-checked': {
                          transform: 'translateX(24px)',
                          color: theme.palette.warning.main,
                          '& + .MuiSwitch-track': {
                            backgroundColor: theme.palette.warning.main,
                          },
                        },
                      },
                      '& .MuiSwitch-thumb': {
                        width: 24,
                        height: 24,
                        backgroundColor: '#fff',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        content: '"D"',
                      },
                      '& .MuiSwitch-track': {
                        borderRadius: 20 / 2,
                        backgroundColor: theme.palette.accent?.lavenderBlue,
                        opacity: 1,
                      },
                    }}
                  />
                  {/* Label displayed next to the switch */}
                  <Typography
                    variant="h6"
                    sx={{
                      marginLeft: 2,
                      color: shiftChangeType === 'Day' ? '#FFD700' : '#1E90FF',
                    }}
                  >
                    {shiftChangeType === 'Day' ? 'Day Shift' : 'Evening Shift'}
                  </Typography>
                </Grid>
                {/* Button for adding shift */}
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() =>
                      selectedVolunteer &&
                      shiftChangeType &&
                      handleAddShiftToVolunteer(selectedVolunteer.id)
                    }
                    sx={{
                      backgroundColor:
                        shiftChangeType === 'Day'
                          ? theme.palette.warning.main
                          : theme.palette.accent?.lavenderBlue,
                    }}
                  >
                    Adauga Tura
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* for admin role we have the list here with actions */}
          {mode === 'admin' && selectedDate && (
            <Grid item container justifyContent="space-evenly">
              <Grid item padding={0}>
                <CustomCard
                  title="LISTA VOLUNTARI"
                  closeButton={false}
                  padding="0"
                  align="flex-start"
                >
                  <Grid
                    container
                    padding={0}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    {shiftVolunteersData?.records.map((volunteer) => (
                      <ListItemButton
                        key={volunteer.shiftId}
                        sx={{
                          width: '100%',
                          padding: 4,
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'row', // Layout: name and email in a row
                          justifyContent: 'space-between', // Space between name and email
                          alignItems: 'center', // Center content vertically

                          backgroundColor:
                            volunteer.shiftType === 'Day'
                              ? theme.palette.warning.main
                              : theme.palette.accent?.lavenderBlue,
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                          '&:hover': {
                            backgroundColor:
                              volunteer.shiftType === 'Day'
                                ? theme.palette.warning.dark
                                : theme.palette.accent?.lavenderBlue,
                          },
                        }}
                        onClick={() => {
                          setSelectedShift({
                            id: volunteer.shiftId,
                            date: selectedDate,
                            shiftType: volunteer.shiftType,
                            nameOfVolunteer: volunteer.fullName,
                            volunteerId: volunteer.volunteerId,
                          });
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          padding={0}
                          alignItems={'center'}
                          flexDirection={'row'}
                        >
                          <Grid item xs={4}>
                            <Typography variant="h6">
                              {volunteer.fullName}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                              {volunteer.email}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    ))}{' '}
                  </Grid>
                </CustomCard>
              </Grid>

              {selectedShift && (
                <Grid
                  item
                  container
                  paddingTop={2}
                  justifyContent={'center'}
                  gap={2}
                >
                  <Grid item>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color={theme.palette.primary.main}
                    >
                      Selected Volunteer: {selectedShift?.nameOfVolunteer}
                    </Typography>
                  </Grid>
                  <Grid item container justifyContent={'center'} gap={2}>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={handleRemoveShiftById}
                        sx={{
                          backgroundColor:
                            theme.palette.error.main || 'defaultColor',
                          fontSize: '0.80rem', // Smaller font size
                          padding: '4px 8px', // Smaller padding
                        }}
                      >
                        Sterge din lista
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={handleUpdateShiftType}
                        sx={{
                          backgroundColor:
                            theme.palette.accent?.lightGreen || 'defaultColor',
                          fontSize: '0.80rem', // Smaller font size
                          padding: '4px 8px', // Smaller padding
                        }}
                      >
                        Schimba tura
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}

          {/*sfarsit container mare*/}
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
