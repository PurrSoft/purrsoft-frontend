import { useState } from 'react';
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
  Collapse,
} from '@mui/material';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { useAddAnimalMutation, useAddAnimalProfileMutation, useDeleteAnimalMutation } from '../../../store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { ImageUploader } from '../ImageUploader';
import { AppSnackbar } from '../../../components/AppSnackbar';
import { useVisibility } from '../../../hooks/useVisibility';

type AnimalFormData = {
  animalType: string;
  name: string;
  yearOfBirth: number;
  gender: string;
  sterilized?: boolean;
  imageUrls?: { filename: string, base64: string }[];
  passport?: string;
  contract?: string;
  contractState?: string;
  shelterCheckIn?: string;
  microchip?: string;
  externalDeworming?: string;
  internalDeworming?: string;
  currentDisease?: string;
  currentMedication?: string;
  pastDisease?: string;
  currentTreatment?: string;
  multivalentVaccine?: string;
  rabiesVaccine?: string;
  fivFeLVTest?: string;
  coronavirusVaccine?: string;
  giardiaTest?: string;
  earMiteTreatment?: string;
  intakeNotes?: string;
  additionalMedicalInfo?: string;
  additionalInfo?: string;
  medicalAppointments?: string;
  refillReminders?: string;
  usefulLinks?: { link: string }[];
};

const initialValues: AnimalFormData = {
  animalType: '',
  name: '',
  yearOfBirth: 2000,
  gender: '',
  sterilized: false,
  imageUrls: [],
  passport: '',
  microchip: '',
  currentDisease: '',
  currentMedication: '',
  pastDisease: '',
  currentTreatment: '',
  rabiesVaccine: '',
  multivalentVaccine: '',
  usefulLinks: [],
  contract: '',
  contractState: '',
  shelterCheckIn: '',
  externalDeworming: '',
  internalDeworming: '',
  fivFeLVTest: '',
  coronavirusVaccine: '',
  giardiaTest: '',
  earMiteTreatment: '',
  intakeNotes: '',
  additionalMedicalInfo: '',
  additionalInfo: '',
  medicalAppointments: '',
  refillReminders: '',
};

const animalFormSchema = yup
  .object({
    animalType: yup.string().required('Tipul animalului este obligatoriu'),
    name: yup.string().required('Numele este obligatoriu'),
    yearOfBirth: yup
      .number()
      .required('Anul nasterii este obligatoriu')
      .min(2000, 'Anul nasterii nu poate fi mai mic de 2000')
      .max(new Date().getFullYear(), 'Anul nasterii nu poate fi mai mare decat anul curent'),
    gender: yup.string().required('Sexul este obligatoriu'),
    sterilized: yup.boolean(),
    imageUrls: yup.array().of(
      yup.object({
        filename: yup.string().required(),
        base64: yup.string().required(),
      })
    ),
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
        link: yup.string().url('URL invalid').required('URL-ul este obligatoriu'),
      })
    ),
    contract: yup.string(),
    contractState: yup.string(),
    shelterCheckIn: yup.string(),
    externalDeworming: yup.string(),
    internalDeworming: yup.string(),
    fivFeLVTest: yup.string(),
    coronavirusVaccine: yup.string(),
    giardiaTest: yup.string(),
    earMiteTreatment: yup.string(),
    intakeNotes: yup.string(),
    additionalMedicalInfo: yup.string(),
    additionalInfo: yup.string(),
    medicalAppointments: yup.string(),
    refillReminders: yup.string(),
  })
  .required();

type fieldTypes = {
  label: string;
  name: "animalType" | "name" | "yearOfBirth" | "gender" | "sterilized" | 
  "passport" | "contract" | "contractState" | "microchip" | 
  "externalDeworming" | "internalDeworming" | "currentDisease" | "currentMedication" | 
  "pastDisease" | "currentTreatment" | "rabiesVaccine" | "multivalentVaccine" | 
  "fivFeLVTest" | "coronavirusVaccine" | "giardiaTest" | "earMiteTreatment" | 
  "intakeNotes" | "additionalMedicalInfo" | "additionalInfo" | "medicalAppointments" | 
  "refillReminders" | "imageUrls" | "usefulLinks" | "shelterCheckIn";
  type?: "number";
  select?: boolean;
  options?: string[];
  values?: string[];
  checkbox?: boolean;
  date?: boolean;
};

const requiredFields: fieldTypes[] = [
  {label: "Tip", name: "animalType", select: true,values: ["Cat", "Dog", "Other"], options: ["Pisica", "Caine", "Altceva"]},
  {label: "Nume", name: "name"},
  {label: "Anul nasterii", name: "yearOfBirth", type: "number"},
  {label: "Sex", name: "gender", select: true, options: ["Mascul", "Femela"], values: ["Male", "Female"]},
]

const optionalFields: fieldTypes[] = [
  {label: "Steril", name: "sterilized", checkbox: true},
  {label: "Pasaport", name: "passport"},
  {label: "Contract", name: "contract"},
  // {label: "Stare contract", name: "contractState", select: true, values: ["Adopted", "Fostered", "NotFostered"], options: ["Adoptat", "Fostered", "Not Fostered"]},
  // {label: "Data intrarii in adapost", name: "shelterCheckIn", date: true},
  {label: "Microchip", name: "microchip"},
  {label: "Dezparazitare externa", name: "externalDeworming"},
  {label: "Dezparazitare interna", name: "internalDeworming"},
  {label: "Boala curenta", name: "currentDisease"},
  {label: "Medicatie curenta", name: "currentMedication"},
  {label: "Boala anterioara", name: "pastDisease"},
  {label: "Tratament curent", name: "currentTreatment"},
  {label: "Vaccin antirabic", name: "rabiesVaccine"},
  {label: "Vaccin multivalent", name: "multivalentVaccine"},
  {label: "Test FIV/FeLV", name: "fivFeLVTest"},
  {label: "Vaccin coronavirus", name: "coronavirusVaccine"},
  {label: "Test Giardia", name: "giardiaTest"},
  {label: "Tratament raie", name: "earMiteTreatment"},
  {label: "Note internare", name: "intakeNotes"},
  {label: "Informatii medicale aditionale", name: "additionalMedicalInfo"},
  {label: "Informatii aditionale", name: "additionalInfo"},
  {label: "Programari medicale", name: "medicalAppointments"},
  {label: "Remindere refil", name: "refillReminders"},
]

export const AddAnimalForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const theme = useTheme();
  const [addAnimal] = useAddAnimalMutation();
  const [addAnimalProfile] = useAddAnimalProfileMutation();
  const [deleteAnimal] = useDeleteAnimalMutation();
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const {
    visibility: snackbarOpen,
    onOpen: onSnackbarOpen,
    onClose: onSnackbarClose,
  } = useVisibility();

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

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
        passport: data.passport,
        imageUrls: data.imageUrls?.map(imageObj => imageObj.base64),
      }).unwrap();

      console.log('form data:', data);
      if (animalResponse?.result) {
        try {
          await addAnimalProfile({
            animalId: animalResponse.result,
            microchip: data.microchip,
            currentDisease: data.currentDisease,
            currentMedication: data.currentMedication,
            pastDisease: data.pastDisease,
            currentTreatment: data.currentTreatment,
            rabiesVaccine: data.rabiesVaccine,
            multivalentVaccine: data.multivalentVaccine,
            usefulLinks: data.usefulLinks?.map(linkObj => linkObj.link),
            contract: data.contract,
            // contractState: data.contractState,
            // shelterCheckIn: data.shelterCheckIn,
            externalDeworming: data.externalDeworming,
            internalDeworming: data.internalDeworming,
            fivFeLVTest: data.fivFeLVTest,
            coronavirusVaccine: data.coronavirusVaccine,
            giardiaTest: data.giardiaTest,
            earMiteTreatment: data.earMiteTreatment,
            intakeNotes: data.intakeNotes,
            additionalMedicalInfo: data.additionalMedicalInfo,
            additionalInfo: data.additionalInfo,
            medicalAppointments: data.medicalAppointments,
            refillReminders: data.refillReminders,
          }).unwrap();
        } catch (profileError) {
          await deleteAnimal(animalResponse.result).unwrap();
          setSnackbarMessage('A aparut o eroare la adaugarea profilului animalului');
          setSnackbarSeverity('error');
          onSnackbarOpen();
        }
      }
      onClose();
      setSnackbarMessage('Animalul a fost adaugat cu succes');
      setSnackbarSeverity('success');
      onSnackbarOpen();
    } catch (error) {
      setSnackbarMessage('A aparut o eroare la adaugarea animalului');
      setSnackbarSeverity('error');
      onSnackbarOpen();
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
    <>
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
                {requiredFields.map((requiredField, index) => (
                  <Grid container key={index} spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <Typography variant="h4" sx={typographyStyles}>{requiredField.label}*</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        name={requiredField.name}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            select={requiredField.select}
                            fullWidth
                            type={requiredField.type}
                            variant="outlined"
                            margin="normal"
                            error={!!errors.animalType}
                            helperText={errors.animalType?.message}
                            {...field}
                            sx={textFieldStyles}
                          >
                            {requiredField.select && requiredField.options?.map((option, index) => (
                              <MenuItem key={option} value={requiredField.values?.[index]}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                ))}

                <Button
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  sx={{
                    color: theme.palette.accent?.green,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  {showOptionalFields ? 'Ascunde' : 'Arata'} campuri optionale
                </Button>

                <Collapse in={showOptionalFields}>
                  {optionalFields.map((optionalField, index) => (
                    <Grid container key={index} spacing={2} alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="h4" sx={typographyStyles}>{optionalField.label}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Controller
                          name={optionalField.name}
                          control={control}
                          render={({ field }) => (
                            optionalField.checkbox ? (
                              <FormControlLabel
                                control={<Checkbox 
                                  checked={!!field.value}
                                  sx={{ 
                                      '&.Mui-checked': {
                                          color: theme.palette.accent?.green,
                                      },
                                  }} 
                                  onChange={field.onChange} 
                                />}
                                label=""
                              />
                            ) : optionalField.date ? (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  value={typeof field.value === 'string' ? dayjs(field.value) : null}
                                  onChange={(value) => field.onChange(value?.toISOString() || '')}
                                  slots={{ textField: TextField }}
                                  slotProps={{
                                    textField: {
                                    fullWidth: true,
                                    variant: 'outlined',
                                    error: !!errors[optionalField.name],
                                    helperText: errors[optionalField.name]?.message,
                                    },
                                  }}
                                  sx={
                                    {
                                      '& .MuiInputBase-root': {
                                        backgroundColor: '#cec5b4',
                                        color: theme.palette.accent?.mutedGreen,
                                        mt: 2,
                                        mb: 2
                                      },
                                    }
                                  }
                                />
                              </LocalizationProvider>
                            ) : (
                              <TextField
                                select={optionalField.select}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                error={!!errors[optionalField.name]}
                                helperText={errors[optionalField.name]?.message}
                                {...field}
                                sx={textFieldStyles}
                              >
                                {optionalField.select && optionalField.options?.map((option, index) => (
                                  <MenuItem key={option} value={optionalField.values?.[index]}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )
                          )}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Collapse>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <ImageUploader name="imageUrls" control={control} errors={errors}/>
                  </Grid>
                  <Grid item xs={4} alignSelf={'flex-start'} mt={1.5}>
                    <Typography variant="h4" sx={typographyStyles}>Link-uri utile</Typography>
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
              <Typography variant="body1" color={theme.palette.error.main} sx={{ mt: 2 }}>
                * camp obligatoriu
              </Typography>
              <DialogActions>
                <Button
                  onClick={onClose}
                  sx={{
                    color: theme.palette.error.main,
                  }}
                >
                  Anulează
                </Button>
                <Button
                  type="submit"
                  sx={{
                    color: theme.palette.accent?.green,
                  }}
                  disabled={!isValid}
                >
                  Salvează
                </Button>
              </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
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