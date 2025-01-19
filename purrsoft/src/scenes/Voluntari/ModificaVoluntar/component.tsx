import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid, CircularProgress, TextField, MenuItem, Autocomplete, Chip, InputAdornment } from '@mui/material';
import { CustomCard } from './../../../components/CustomCard';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useDeleteVolunteerMutation, useGetVolunteerQuery, useGetVolunteersQuery, useUpdateVolunteerMutation } from '../../../store';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useVisibility } from '../../../hooks/useVisibility';
import { AppSnackbar } from '../../../components/AppSnackbar';

export const ModificaVoluntar = () => {
  const location = useLocation();
  const name = location.state.name;
  const { id } = useParams<{ id: string}>();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { data: volunteer, error, isLoading } = useGetVolunteerQuery(id!);
  const { data: trainers, error: trainersError, isLoading: trainersLoading } = useGetVolunteersQuery();

  const [deleteVoluntar] = useDeleteVolunteerMutation();
  const [updateVoluntar] = useUpdateVolunteerMutation();
  const [startDate, setStartDate] = useState<Dayjs | null>(volunteer?.startDate ? dayjs(volunteer.startDate) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(volunteer?.endDate ? dayjs(volunteer.endDate) : null);
  const [status, setStatus] = useState(volunteer?.status);
  const [tier, setTier] = useState(volunteer?.tier);
  const [lastShiftDate, setLastShiftDate] = useState<Dayjs | null>(volunteer?.lastShiftDate ? dayjs(volunteer.lastShiftDate) : null);
  const [tasks, setTasks] = useState(volunteer?.tasks || []);
  const [availableHours, setAvailableHours] = useState(volunteer?.availableHours);
  const [trainingStartDate, setTrainingStartDate] = useState<Dayjs | null>(volunteer?.trainingStartDate ? dayjs(volunteer.trainingStartDate) : null);
  const [supervisorId, setSupervisorId] = useState(volunteer?.supervisorId || '');
  const [trainersId, setTrainersId] = useState(volunteer?.trainersId || []);

  const [volunteerToDelete, setVolunteerToDelete] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbarConfirmation, setSnackbarConfirmation] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const {
      visibility: snackbarOpen,
      onOpen: onSnackbarOpen,
      onClose: onSnackbarClose,
    } = useVisibility();
  
  useEffect(() => {
    if (volunteer) {
      setStartDate(volunteer?.startDate ? dayjs(volunteer.startDate) : null);
      setEndDate(volunteer?.endDate ? dayjs(volunteer.endDate) : null);
      setStatus(volunteer.status);
      setTier(volunteer.tier);
      setLastShiftDate(volunteer?.lastShiftDate ? dayjs(volunteer.lastShiftDate) : null);
      setTasks(volunteer.tasks || []);
      setAvailableHours(volunteer?.availableHours);
      setTrainingStartDate(volunteer?.trainingStartDate ? dayjs(volunteer.trainingStartDate) : null);
      setSupervisorId(volunteer.supervisorId || '');
      setTrainersId(volunteer.trainersId || []);
    }
  }, [volunteer]);

  const handleDeleteClick = (volunteerId: string) => {
    setVolunteerToDelete(volunteerId);
    onSnackbarOpen();
    setSnackbarConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (volunteerToDelete) {
      try {
        await deleteVoluntar(volunteerToDelete);
        navigate('/management/voluntari/lista');
        setSnackbarConfirmation(false);
        setSnackbarMessage('Voluntarul a fost sters cu succes!');
        setSnackbarSeverity('success');
      } catch (error) {
        setSnackbarMessage('Eroare la stergerea voluntarului!');
        setSnackbarSeverity('error');
      } finally {
        onSnackbarOpen();
      }
    }
  };

  const handleCloseSnackbar = () => {
    onSnackbarClose();
    setVolunteerToDelete(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
  }

  const handleSaveInEdit = async () => {
    if (editMode) {
        updateVoluntar({
            userId: id!,
            startDate: startDate?.toString()!,
            endDate: endDate?.toString(),
            status: status!,
            tier: tier!,
            lastShiftDate: lastShiftDate?.toString()!,
            tasks,
            availableHours: availableHours?.toString()!,
            trainingStartDate: trainingStartDate?.toString()!,
            supervisorId,
            trainersId,
        });
        setSnackbarConfirmation(false);
        setSnackbarMessage('Voluntarul a fost actualizat!');
        setSnackbarSeverity('success');
        onSnackbarOpen();
        setEditMode(false);
    } else {
      setEditMode(true);
    }
  }

  if (isLoading || trainersLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || trainersError) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">Error loading volunteer data</Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
      sx={{
        height: "80vh",
        width: "100%",
        display: "flex",
        backgroundColor: theme.palette.accent?.beige,
        padding: 4,
      }}
    >
    {/* Left Section: Form */}
    <Box flex={3} display="flex">
        <CustomCard
        width="45vw"
        height='auto'
        maxHeight="75vh"
        shadow
        title={<Typography variant="h5" color="white" sx={{fontWeight:'bold'}}>{name}</Typography>}
        >
        <Grid container spacing={2}>
        {/* StartDate and EndDate */}
        <Grid item xs={6}>
        <DatePicker
                value={startDate}
                onChange={(date) => setStartDate(date)}
                disabled={!editMode}
                slots={{
                textField: (params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                        <InputAdornment position="start">
                            <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            >
                            Data de Inceput:
                            </Typography>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        '.MuiOutlinedInput-root': {
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.green,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.lightGreen,
                        },
                        borderRadius: '20px',
                    }}
                    />
                ),
                }}
            />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
                value={endDate}
                onChange={(date) => setEndDate(date)}
                disabled={!editMode}
                slots={{
                textField: (params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                        <InputAdornment position="start">
                            <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            >
                            Data de Sfarsit:
                            </Typography>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        '.MuiOutlinedInput-root': {
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.green,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.lightGreen,
                        },
                        borderRadius: '20px',
                    }}
                    />
                ),
                }}
            />
            </Grid>

            {/* Status and Tier */}
            <Grid item xs={6}>
            <TextField
                fullWidth
                select
                value={status || ''}
                onChange={(e) => setStatus(e.target.value)}
                disabled={!editMode}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Typography
                        sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: 1,
                        }}
                    >
                        Status:
                    </Typography>
                    </InputAdornment>
                ),
                }}
                sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                '.MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.green,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.lightGreen,
                },
                borderRadius: '20px',
                }}
            >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="OnLeave">OnLeave</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={6}>
            <TextField
                fullWidth
                select
                value={tier || ''}
                onChange={(e) => setTier(e.target.value)}
                disabled={!editMode}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Typography
                        sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: 1,
                        }}
                    >
                        Tier:
                    </Typography>
                    </InputAdornment>
                ),
                }}
                sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                '.MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.green,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.lightGreen,
                },
                borderRadius: '20px',
                }}
            >
                <MenuItem value="Trial">Trial</MenuItem>
                <MenuItem value="FullTime">FullTime</MenuItem>
            </TextField>
            </Grid>

            {/* LastShiftDate and TrainingStartDate */}
            <Grid item xs={6}>
            <DatePicker
                value={lastShiftDate}
                onChange={(date) => setLastShiftDate(date)}
                disabled={!editMode}
                slots={{
                textField: (params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                        <InputAdornment position="start">
                            <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            >
                            Ultimul Shift:
                            </Typography>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        '.MuiOutlinedInput-root': {
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.green,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.lightGreen,
                        },
                        borderRadius: '20px',
                    }}
                    />
                ),
                }}
            />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
                value={trainingStartDate}
                onChange={(date) => setTrainingStartDate(date)}
                disabled={!editMode}
                slots={{
                textField: (params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                        <InputAdornment position="start">
                            <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            >
                            Start Mentorat:
                            </Typography>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        '.MuiOutlinedInput-root': {
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.green,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.accent?.lightGreen,
                        },
                        borderRadius: '20px',
                    }}
                    />
                ),
                }}
            />
            </Grid>

            {/* Tasks */}
            <Grid item xs={8}>
            <TextField
                fullWidth
                multiline
                rows={3}
                value={tasks.join('; ')}
                onChange={(e) => setTasks(e.target.value.split(';').map((task) => task.trim()))} // Split by commas and trim whitespace
                variant="outlined"
                disabled={!editMode}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Typography
                        sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: 1,
                        }}
                    >
                        Tasks:
                    </Typography>
                    </InputAdornment>
                ),
                }}
                sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                '.MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.green,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.white,
                },
                borderRadius: '20px',
                }}
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
                fullWidth
                type="number"
                value={availableHours || ''}
                onChange={(e) => setAvailableHours(e.target.value)}
                variant="outlined"
                disabled={!editMode}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Typography
                        sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: 1,
                        borderColor: theme.palette.accent?.green,
                        }}
                    >
                        Ore Disponibile:
                    </Typography>
                    </InputAdornment>
                ),
                }}
                inputProps={{
                min: 0, // Minimum value
                max: 24, // Maximum value
                }}
                sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                height: '100px',
                '.MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.green,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.accent?.green,
                },
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            />
            </Grid>

            {/* SupervisorId and TrainersId */}
            <Grid item xs={6}>
            {editMode ? (
            <TextField
            fullWidth
            select
            value={supervisorId || ''}
            onChange={(e) => setSupervisorId(e.target.value)}
            variant="outlined"
            sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                '.MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                },
                '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.accent?.green,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.accent?.lightGreen,
                },
                borderRadius: '20px',
                height: '80px',
            }}
            >
            {trainers?.records.map((trainer) => (
                <MenuItem key={trainer.userId} value={trainer.userId}>
                    {trainer.email}
                </MenuItem>
                ))}
            </TextField>
        ) : supervisorId ? (
            <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '8px',
                    height: '80px',
                    overflowY: 'auto',
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                    borderRadius: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    Supervisor: {trainers?.records.find((trainer) => trainer.userId === supervisorId)?.email || 'N/A'} 
                  </Box>
        ) : (
            <Box
            sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                padding: '8px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                height: '80px',
            }}
            >
            <Typography 
            sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                padding: '8px',
                borderRadius: '8px',
              }}>
                Supervizor:
            </Typography>
            <Typography
            sx={{
                color: 'white',
                backgroundColor: theme.palette.accent?.green,
                padding: '8px',
                borderRadius: '20px',
              }}>Niciun Supervizor</Typography>
    </Box>
  )}
            </Grid>
            <Grid item xs={6}>
            {editMode ? (
            <Autocomplete
                multiple
                options={Array.isArray(trainers?.records) ? trainers?.records : []}
                getOptionLabel={(trainer) => trainer.email}
                value={trainers?.records.filter((trainer) => trainersId.includes(trainer.userId))}
                onChange={(event, newValue) =>
                    setTrainersId(newValue.map((trainer) => trainer.userId))
                }
                renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      sx={{
                        maxHeight: '80px',
                        overflowY: 'auto',
                        color: 'white',
                        backgroundColor: theme.palette.accent?.green,
                        '.MuiOutlinedInput-root': {
                          color: 'white',
                          backgroundColor: theme.palette.accent?.green,
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.accent?.green,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.accent?.lightGreen,
                        },
                        borderRadius: '20px',
                      }}
                    />
                  )}
                />
                ) : trainersId.length > 0 ? (
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '8px',
                    maxHeight: '80px',
                    overflowY: 'auto',
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                    borderRadius: '20px',
                  }}
                  >
                    Mentori: {trainers?.records
                      .filter((trainer) => trainersId.includes(trainer.userId))
                      .map((trainer) => (
                        <Chip 
                            key={trainer.userId} 
                            label={trainer.email} 
                            sx={{
                                color: 'white',
                                backgroundColor: theme.palette.accent?.green,
                                margin: '2px',
                                fontSize: '16px',
                              }} />
                      ))}
                  </Box>
                ) : (
                  <Typography
                  sx={{
                    color: 'white',
                    backgroundColor: theme.palette.accent?.green,
                    padding: '8px',
                    borderRadius: '20px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >Mentor: Niciun Mentor</Typography>
                )}
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.accent?.lightGreen,
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
                onClick={handleSaveInEdit}
                disabled={!editMode}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
    </Box>

    {/* Right Section: Actions */}
    <Box flex={2} display="flex" flexDirection="column" gap={2} alignItems="center">
        <Button
        fullWidth
        variant="contained"
        sx={{
            width: "50%",
            backgroundColor: theme.palette.accent?.lightGreen,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
        }}
        onClick={() => console.log("Assign new role")}
        >
        Atribuie un nou rol
        </Button>
        <Button
        fullWidth
        variant="contained"
        sx={{
            width: "50%",
            backgroundColor: theme.palette.accent?.lightGreen,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
        }}
        onClick={handleEditClick}
        disabled={editMode}
        >
        Modifica date
        </Button>
        <Button
        fullWidth
        variant="contained"
        sx={{
            width: "50%",
            backgroundColor: theme.palette.accent?.error,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
        }}
        onClick={() => handleDeleteClick(volunteer?.userId!)}
        >
        Sterge voluntar
        </Button>
        <Button
        fullWidth
        variant="contained"
        sx={{
            width: "50%",
            mt: "auto",
            backgroundColor: theme.palette.accent?.green,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
        }}
        onClick={() => navigate("/management/voluntari/lista")}
        >
        Inapoi
        </Button>
    </Box>
        {snackbarConfirmation ? 
                <AppSnackbar
                  open={snackbarOpen}
                  severity="warning"
                  onClose={handleCloseSnackbar}
                >
                  Esti sigur ca vrei sa stergi acest voluntar?
                  <Button onClick={handleConfirmDelete} color="inherit" size="small">
                    Yes
                  </Button>
                  <Button onClick={handleCloseSnackbar} color="inherit" size="small">
                    No
                  </Button>
                </AppSnackbar> :
                <AppSnackbar
                open={snackbarOpen}
                onClose={onSnackbarClose}
                severity={snackbarSeverity}
              >
                {snackbarMessage}
              </AppSnackbar>
              }
    </Box>
    </LocalizationProvider>
  );
};