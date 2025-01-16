import { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Typography, IconButton, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useAddEventMutation, useGetVolunteersQuery } from '../../../store';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export type Eveniment = {
    title: string;
    subtitle: string;
    where: string;
    when: string; // ISO string format
    description: string;
    volunteers?: string[];
};

const initialValues: Eveniment = {
    title: '',
    subtitle: '',
    where: '',
    when: '',
    description: '',
    volunteers: [],
};

const eventFormSchema = yup.object({
    title: yup.string().required('Title is required'),
    subtitle: yup.string().required('Subtitle is required'),
    where: yup.string().required('Location is required'),
    when: yup.string().required('Date and time are required'),
    description: yup.string().required('Description is required'),
}).required();

export const AdaugaEventForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const theme = useTheme();
    const [addEvent] = useAddEventMutation();
    const { data: volunteersData } = useGetVolunteersQuery();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(eventFormSchema),
        defaultValues: initialValues,
        mode: 'onChange',
    });

    const [volunteers, setVolunteers] = useState<string[]>([]);

    const onSubmit = async (data: Eveniment) => {
        try {
            await addEvent({
                ...data,
                volunteers,
            }).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    const volunteerList = useMemo(() => {
        if (!volunteersData || !volunteersData.records) return [];
        return volunteersData.records.map((v) => ({
            userId: v.userId,
            name: `${v.firstName} ${v.lastName}`,
        }));
    }, [volunteersData]);
    
    const availableVolunteers = useMemo(() => {
        return volunteerList.filter((v) => !volunteers.includes(v.userId));
    }, [volunteers, volunteerList]);

    const handleAddVolunteer = () => {
        setVolunteers((prev) => [...prev, '' ]);
    };

    const handleVolunteerChange = (index: number, value: string) => {
        const updatedVolunteers = [...volunteers];
        updatedVolunteers[index] = value;
        setVolunteers(updatedVolunteers);
    };

    const handleRemoveVolunteer = (index: number) => {
        const updatedVolunteers = volunteers.filter((_, i) => i !== index);
        setVolunteers(updatedVolunteers);
    };

    const typographyStyles = {
        color: theme.palette.accent?.green, 
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                variant='h2'
                align='center'
                sx={{
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                Adauga Eveniment
            </DialogTitle>
            <DialogContent
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    maxHeight: '70vh',
                    overflowY: 'auto',
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={4}>
                            <Typography variant="h4" sx={typographyStyles}>Titlu*</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" sx={typographyStyles}>Subtitlu</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Controller
                                name="subtitle"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.subtitle}
                                        helperText={errors.subtitle?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" sx={typographyStyles}>Locatie*</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Controller
                                name="where"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.where}
                                        helperText={errors.where?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" sx={typographyStyles}>Data si Ora*</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Controller
                                name="when"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            value={field.value ? dayjs(field.value) : null}
                                            onChange={(value) => field.onChange(value?.toISOString() || '')}
                                            slots={{ textField: TextField }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    error: !!errors.when,
                                                    helperText: errors.when?.message,
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" sx={typographyStyles}>Descriere</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h4' sx={typographyStyles}>Voluntari</Typography>
                            {volunteers.map((volunteer, index) => (
                                <Grid container key={index} spacing={2} alignItems="center" mt={1}>
                                    <Grid item xs={10}>
                                        <Select
                                            fullWidth
                                            value={volunteer}
                                            onChange={(e) => handleVolunteerChange(index, e.target.value)}
                                        >
                                            {availableVolunteers.map((v) => (
                                                <MenuItem key={v.userId} value={v.userId}>
                                                    {v.name}
                                                </MenuItem>
                                            ))}
                                            {volunteer && (
                                                <MenuItem key={volunteer} value={volunteer}>
                                                    {volunteerList.find((v) => v.userId === volunteer)?.name}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => handleRemoveVolunteer(index)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button
                                onClick={handleAddVolunteer}
                                startIcon={<AddIcon sx={{ color: theme.palette.accent?.green }} />}
                                sx={{ color: theme.palette.accent?.green }}
                                disabled={availableVolunteers.length === 0}
                            >
                                Adauga Voluntar
                            </Button>
                        </Grid>
                    </Grid>
                        <Typography variant="body1" color={theme.palette.accent?.error} sx={{ mt: 2 }}>
                            * camp obligatoriu
                        </Typography>
                    <DialogActions>
                        <Button
                            onClick={onClose}
                            sx={{
                                color: theme.palette.accent?.error,
                            }}
                        >
                            Anuleaza
                        </Button>
                        <Button type="submit" disabled={!isValid} sx={{color: theme.palette.accent?.green}}>
                            Salveaza
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
