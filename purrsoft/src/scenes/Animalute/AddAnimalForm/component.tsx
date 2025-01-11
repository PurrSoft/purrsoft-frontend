import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  FormControlLabel,
  MenuItem,
  IconButton,
  Checkbox,
} from '@mui/material';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { useAddAnimalMutation, useAddAnimalProfileMutation, useDeleteAnimalMutation } from '../../../store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type AnimalFormData = {
  animalType: string;
  name: string;
  yearOfBirth: number;
  gender: string;
  sterilized?: boolean;
  imageUrl?: string;
  passport?: string;
  microchip?: string;
  currentDisease?: string;
  currentMedication?: string;
  pastDisease?: string;
  currentTreatment?: string;
  rabiesVaccine?: string;
  multivalentVaccine?: string;
  usefulLinks?: { link: string }[];
};

const initialValues: AnimalFormData = {
  animalType: '',
  name: '',
  yearOfBirth: 2000,
  gender: '',
  sterilized: false,
  imageUrl: '',
  passport: '',
  microchip: '',
  currentDisease: '',
  currentMedication: '',
  pastDisease: '',
  currentTreatment: '',
  rabiesVaccine: '',
  multivalentVaccine: '',
  usefulLinks: [{ link: '' }],
};

const animalFormSchema = yup
  .object({
    animalType: yup.string().required('Animal type is required'),
    name: yup.string().required('Name is required'),
    yearOfBirth: yup
      .number()
      .required('Year of birth is required')
      .min(2000, 'Year of birth must be after 2000')
      .max(new Date().getFullYear(), 'Year of birth cannot be in the future'),
    gender: yup.string().required('Gender is required'),
    sterilized: yup.boolean(),
    imageUrl: yup.string().url('Invalid URL'),
    passport: yup.string(),
    microchip: yup.string(),
    currentDisease: yup.string(),
    currentMedication: yup.string(),
    pastDisease: yup.string(),
    currentTreatment: yup.string(),
    rabiesVaccine: yup.string(),
    multivalentVaccine: yup.string(),
    usefulLinks: yup.array().of(
      yup.object({
        link: yup.string().url('Invalid URL').required('Link is required'),
      })
    ),
  })
  .required();

export const AddAnimalForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const theme = useTheme();
  const [addAnimal] = useAddAnimalMutation();
  const [addAnimalProfile] = useAddAnimalProfileMutation();
  const [deleteAnimal] = useDeleteAnimalMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(animalFormSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'usefulLinks',
  });

  const onSubmit = async (data: AnimalFormData) => {
    try {
      const animalResponse = await addAnimal({
        animalType: data.animalType,
        name: data.name,
        yearOfBirth: data.yearOfBirth,
        gender: data.gender,
        sterilized: data.sterilized,
        imageUrl: data.imageUrl,
      }).unwrap();

      if (animalResponse?.result) {
        try {
          await addAnimalProfile({
            animalId: animalResponse.result,
            passport: data.passport,
            microchip: data.microchip,
            currentDisease: data.currentDisease,
            currentMedication: data.currentMedication,
            pastDisease: data.pastDisease,
            currentTreatment: data.currentTreatment,
            rabiesVaccine: data.rabiesVaccine,
            multivalentVaccine: data.multivalentVaccine,
            usefulLinks: data.usefulLinks?.map(linkObj => linkObj.link),
          }).unwrap();
        } catch (profileError) {
          await deleteAnimal(animalResponse.result).unwrap();
          throw profileError;
        }
      }
      onClose();
    } catch (error) {
      console.error('Failed to add animal or animal profile:', error);
    }
  };

  const typographyStyles = {
    color: theme.palette.accent?.green, 
  };

  const textFieldStyles = {
    '& .MuiInputBase-root': {
      backgroundColor: '#cec5b4',
      color: theme.palette.accent?.mutedGreen,
    },
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
        Adauga Animalut
      </DialogTitle>
      <DialogContent 
        sx={{
          backgroundColor: theme.palette.background.paper,
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Tip*</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="animalType"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.animalType}
                    helperText={errors.animalType?.message}
                    {...field}
                    sx={textFieldStyles}
                  >
                    <MenuItem 
                      value="Cat"
                    >
                      Cat
                    </MenuItem>
                    <MenuItem 
                      value="Dog"
                    >
                      Dog
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Nume*</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Anul nasterii*</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="yearOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="number"
                    error={!!errors.yearOfBirth}
                    helperText={errors.yearOfBirth?.message}
                    {...field}
                    value={field.value || 2000}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Sex*</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    {...field}
                    sx={textFieldStyles}
                  >
                    <MenuItem 
                      value="Male"
                    >
                      Male
                    </MenuItem>
                    <MenuItem 
                      value="Female"
                    >
                      Female
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Steril</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="sterilized"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox 
                      checked={field.value}
                      sx={{ 
                          '&.Mui-checked': {
                              color: theme.palette.accent?.green,
                          },
                       }} 
                      onChange={field.onChange} 
                    />}
                    label=""
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Image URL</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Passport</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="passport"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.passport}
                    helperText={errors.passport?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Microchip</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="microchip"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.microchip}
                    helperText={errors.microchip?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Current Disease</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="currentDisease"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.currentDisease}
                    helperText={errors.currentDisease?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Current Medication</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="currentMedication"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.currentMedication}
                    helperText={errors.currentMedication?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Past Disease</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="pastDisease"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.pastDisease}
                    helperText={errors.pastDisease?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Current Treatment</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="currentTreatment"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.currentTreatment}
                    helperText={errors.currentTreatment?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Rabies Vaccine</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="rabiesVaccine"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.rabiesVaccine}
                    helperText={errors.rabiesVaccine?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={typographyStyles}>Multivalent Vaccine</Typography>
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="multivalentVaccine"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={!!errors.multivalentVaccine}
                    helperText={errors.multivalentVaccine?.message}
                    {...field}
                    sx={textFieldStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4} alignSelf={'flex-start'} mt={1.5}>
              <Typography variant="h4" sx={typographyStyles}>Useful Links</Typography>
            </Grid>
            <Grid item xs={8}>
              {fields.map((item, index) => (
                <Grid container key={item.id} alignItems="center">
                  <Grid item xs={10}>
                    <Controller
                      name={`usefulLinks.${index}.link`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={!!errors.usefulLinks?.[index]?.link}
                          helperText={errors.usefulLinks?.[index]?.link?.message}
                          {...field}
                          sx={textFieldStyles}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => remove(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                onClick={() => append({ link: '' })}
                startIcon={<AddIcon 
                  sx={{
                    color: theme.palette.accent?.green
                  }}
                  />}
                sx={{
                  color: theme.palette.accent?.green,
                }}
              >
                Add Link
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
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                color: theme.palette.accent?.green,
              }}
              disabled={!isValid}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};