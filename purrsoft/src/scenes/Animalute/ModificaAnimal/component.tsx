import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Container, Grid, CircularProgress, IconButton, TextField, } from '@mui/material';
import { CustomCard } from './../../../components/CustomCard';
import UploadIcon from '@mui/icons-material/Upload';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import { useDeleteAnimalMutation, useGetAnimalProfileQuery, useUpdateAnimalProfileMutation, useUpdateAnimalMutation } from '../../../store';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import { useState, useEffect } from 'react';
import { AppSnackbar } from '../../../components/AppSnackbar';
import { useVisibility } from '../../../hooks/useVisibility';
import defaultPhoto from '/defaultPhoto.jpeg';
import { useForm } from 'react-hook-form';
import { ImageUploader } from '../ImageUploader';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type fieldTypes = {
  title: string;
  value: string;
  onEditValueFn: (newValue: any) => void;
  isSelect?: boolean;
  selectOptions?: string[];
  selectValues?: string[];
  type?: 'number';
  isCheckbox?: boolean;
};

type urlData = {
  imageUrls?: { filename: string, base64: string }[];
};

const initialUrlData: urlData = {
  imageUrls: [],
};

const validateUrl = (url: string) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');
  return !!urlPattern.test(url);
};

export const ModificaAnimal = () => {
  const location = useLocation();
  const animal = location.state?.animal;
  const { id } = useParams<{ id: string}>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteAnimal] = useDeleteAnimalMutation();
  const { data: animalProfile, error, isLoading } = useGetAnimalProfileQuery(id!);
  const [updateAnimalProfile] = useUpdateAnimalProfileMutation();
  const [updateAnimal] = useUpdateAnimalMutation();
  const [showInfo, setShowInfo] = useState(''); 
  const [animalType, setAnimalType] = useState(animal.animalType);
  const [name, setName] = useState(animal.name);
  const [yearOfBirth, setYearOfBirth] = useState(animal.yearOfBirth);
  const [gender, setGender] = useState(animal.gender);
  const [sterilized, setSterilized] = useState(animal.sterilized);
  const [passport, setPassport] = useState(animal.passport);
  const [microchip, setMicrochip] = useState('');
  const [currentDisease, setCurrentDisease] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');
  const [pastDisease, setPastDisease] = useState('');
  const [currentTreatment, setCurrentTreatment] = useState('');
  const [rabiesVaccine, setRabiesVaccine] = useState('');
  const [multivalentVaccine, setMultivalentVaccine] = useState('');
  const [externalDeworming, setExternalDeworming] = useState('');
  const [internalDeworming, setInternalDeworming] = useState('');
  const [fivFeLVTest, setFivFeLVTest] = useState('');
  const [coronavirusVaccine, setCoronavirusVaccine] = useState('');
  const [giardiaTest, setGiardiaTest] = useState('');
  const [earMiteTreatment, setEarMiteTreatment] = useState('');
  const [intakeNotes, setIntakeNotes] = useState('');
  const [additionalMedicalInfo, setAdditionalMedicalInfo] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [refillReminders, setRefillReminders] = useState('');
  const [usefulLinks, setUsefulLinks] = useState<string[]>([]);
  const [animalImageUrls, setAnimalImageUrls] = useState<string[]>(animal.imageUrls);
  // const [medicalAppointments, setMedicalAppointments] = useState('');
  // const [contract, setContract] = useState('');
  // const [contractState, setContractState] = useState('');
  // const [shelterCheckIn, setShelterCheckIn] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [animalEdited, setAnimalEdited] = useState(false);
  const [animalProfileEdited, setAnimalProfileEdited] = useState(false);
  // const [editedMedicalAppointments, setEditedMedicalAppointments] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editedUsefulLinks, setEditedUsefulLinks] = useState(false);
  const [usefulLinksErrors, setUsefulLinksErrors] = useState<string[]>([]);
  const [addedUsefulLinks, setAddedUsefulLinks] = useState<string[]>([]);

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...addedUsefulLinks];
    newLinks[index] = value;
    setAddedUsefulLinks(newLinks);

    const newErrors = [...usefulLinksErrors];
    newErrors[index] = validateUrl(value) ? '' : 'Link invalid';
    setUsefulLinksErrors(newErrors);
  };

  const { control, watch, formState: {errors} } = useForm({
    defaultValues: initialUrlData
  });

  const imageUrls = watch('imageUrls');

  const {
    visibility: snackbarOpen,
    onOpen: onSnackbarOpen,
    onClose: onSnackbarClose,
  } = useVisibility();

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );
  const [snackbarConfirmation, setSnackbarConfirmation] = useState(false);

  useEffect(() => {
    if (animalProfile) {
      setMicrochip(animalProfile.microchip || '');
      setCurrentDisease(animalProfile.currentDisease || '');
      setCurrentMedication(animalProfile.currentMedication || '');
      setPastDisease(animalProfile.pastDisease || '');
      setCurrentTreatment(animalProfile.currentTreatment || '');
      setRabiesVaccine(animalProfile.rabiesVaccine || '');
      setMultivalentVaccine(animalProfile.multivalentVaccine || '');
      setExternalDeworming(animalProfile.externalDeworming || '');
      setInternalDeworming(animalProfile.internalDeworming || '');
      setFivFeLVTest(animalProfile.fivFeLVTest || '');
      setCoronavirusVaccine(animalProfile.coronavirusVaccine || '');
      setGiardiaTest(animalProfile.giardiaTest || '');
      setEarMiteTreatment(animalProfile.earMiteTreatment || '');
      setIntakeNotes(animalProfile.intakeNotes || '');
      setAdditionalMedicalInfo(animalProfile.additionalMedicalInfo || '');
      setAdditionalInfo(animalProfile.additionalInfo || '');
      setRefillReminders(animalProfile.refillReminders || '');
      setUsefulLinks(animalProfile.usefulLinks || []);
      // setMedicalAppointments(animalProfile.medicalAppointments || '');
      // setContract(animalProfile.contract || '');
      // setContractState(animalProfile.contractState || '');
      // setShelterCheckIn(animalProfile.shelterCheckIn || '');
    }
  }, [animalProfile]);

  const generalFields: fieldTypes[] = [
    { title: 'Tip:', value: animalType, onEditValueFn: setAnimalType, isSelect: true, selectOptions: ['Caine', 'Pisica', 'Altceva'], selectValues: ['Dog', 'Cat', 'Other']},
    { title: 'Nume:', value: name, onEditValueFn: setName },
    { title: 'Anul nasterii:', value: yearOfBirth, onEditValueFn: setYearOfBirth, type: 'number' },
    { title: 'Sex:', value: gender, onEditValueFn: setGender, isSelect: true, selectOptions: ['Mascul', 'Femela'], selectValues: ['Male', 'Female'] },
    { title: 'Steril', value: sterilized ? 'true' : 'false', onEditValueFn: setSterilized, isCheckbox: true },
    { title: 'Pasaport:', value: passport, onEditValueFn: setPassport },
  ];

  const medicalFields: fieldTypes[] = [
   { title: 'Microchip', value: microchip, onEditValueFn: setMicrochip },
   { title: 'Boala curenta:', value: currentDisease, onEditValueFn: setCurrentDisease }, 
   { title: 'Medicatie curenta:', value: currentMedication, onEditValueFn: setCurrentMedication },
   { title: 'Boala anterioara:', value: pastDisease, onEditValueFn: setPastDisease },
   { title: 'Tratament curent:', value: currentTreatment, onEditValueFn: setCurrentTreatment },
   { title: 'Vaccin antirabic:', value: rabiesVaccine, onEditValueFn: setRabiesVaccine },
   { title: 'Vaccin multivalent:', value: multivalentVaccine, onEditValueFn: setMultivalentVaccine },
   { title: 'Dezparazitare externa:', value: externalDeworming, onEditValueFn: setExternalDeworming },
   { title: 'Dezparazitare interna:', value: internalDeworming, onEditValueFn: setInternalDeworming },
   { title: 'Test FIV/FeLV:', value: fivFeLVTest, onEditValueFn: setFivFeLVTest },
   { title: 'Vaccin coronavirus:', value: coronavirusVaccine, onEditValueFn: setCoronavirusVaccine },
   { title: 'Test giardia:', value: giardiaTest, onEditValueFn: setGiardiaTest },
   { title: 'Tratament raie:', value: earMiteTreatment, onEditValueFn: setEarMiteTreatment },
   { title: 'Note de internare:', value: intakeNotes, onEditValueFn: setIntakeNotes },
   { title: 'Informatii medicale aditionale:', value: additionalMedicalInfo, onEditValueFn: setAdditionalMedicalInfo },
   { title: 'Informatii aditionale:', value: additionalInfo, onEditValueFn: setAdditionalInfo },
   { title: 'Remindere refil:', value: refillReminders, onEditValueFn: setRefillReminders },
  ];

  const handleDeleteClick = (animalId: string) => {
    setAnimalToDelete(animalId);
    onSnackbarOpen();
    setSnackbarConfirmation(true);
  };

  const handleCloseSnackbar = () => {
    onSnackbarClose();
    setAnimalToDelete(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, animalImageUrls.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex < animalImageUrls.length - 1) {
          return prevIndex + 1;
        } else {
          return 0;
        }
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, [animalImageUrls.length]);

  const handleConfirmDelete = async () => {
    if (animalToDelete) {
      try {
        await deleteAnimal(animalToDelete);
        navigate('/management/animalute/lista');
        setSnackbarConfirmation(false);
        setSnackbarMessage('Animalul a fost sters cu succes!');
        setSnackbarSeverity('success');
      } catch (error) {
        setSnackbarMessage('Eroare la stergerea animalului!');
        setSnackbarSeverity('error');
      } finally {
        onSnackbarOpen();
      }
    }
  };

  const handleGeneralInfoClick = () => {
    setEditMode(false);
    setShowInfo('general');
  }

  const handleMedicalInfoClick = () => {
    setEditMode(false);
    setShowInfo('medical');
  }

  const handleMedicalAppointmentsClick = () => {
    setEditMode(false);
    setShowInfo('medicalAppointments');
  }

  const handleUsefulLinksClick = () => {
    setEditMode(true);
    setEditedUsefulLinks(true);
    setShowInfo('usefulLinks');
  }

  const handleSaveImagesClick = () => {
    setAnimalImageUrls([...animalImageUrls, ...(imageUrls ?? []).map((img) => img.base64)]);
    handleEditOrSave();
    setShowInfo('');
  }

  const handleUploadImagesClick = () => {
    setEditMode(true);
    setShowInfo('imageUpload');
    setAnimalEdited(true);
  }
  

  const handleEditOrSave = async () => {
    if (editMode) {
      if (animalProfileEdited) {
        updateAnimalProfile({
          animalId: id!,
          // contract,
          // contractState,
          // shelterCheckIn,
          microchip,
          currentDisease,
          currentMedication,
          pastDisease,
          currentTreatment,
          rabiesVaccine,
          multivalentVaccine,
          externalDeworming,
          internalDeworming,
          fivFeLVTest,
          coronavirusVaccine,
          giardiaTest,
          earMiteTreatment,
          intakeNotes,
          additionalMedicalInfo,
          additionalInfo,
          refillReminders,
        });
        setSnackbarConfirmation(false);
        setSnackbarMessage('Animalul a fost actualizat!');
        setSnackbarSeverity('success');
        onSnackbarOpen();
      }
      if (animalEdited) {
        updateAnimal({
          id: animal.id,
          animalType,
          name,
          yearOfBirth,
          gender,
          sterilized,
          passport,
          imageUrls: animalImageUrls,
        });
        setSnackbarConfirmation(false);
        setSnackbarMessage('Animalul a fost actualizat!');
        setSnackbarSeverity('success');
        onSnackbarOpen();
      }
      // if (editedMedicalAppointments) {
      //   updateAnimalProfile({
      //     animalId: id!,
      //     medicalAppointments,
      //   });
      // }
      if (editedUsefulLinks) {
        console.log(usefulLinks);
        await updateAnimalProfile({
          animalId: id!,
          usefulLinks: [...usefulLinks, ...addedUsefulLinks.filter((link) => link !== '')],
        }).then(() => {
          setSnackbarConfirmation(false);
          setSnackbarMessage('Link-uri adaugate cu succes!');
          setSnackbarSeverity('success');
          onSnackbarOpen();
        }).catch(() => {
          setSnackbarMessage('Eroare la adaugarea link-urilor!');
          setSnackbarSeverity('error');
          onSnackbarOpen();
        });
        setEditedUsefulLinks(false);
      }
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }

  const renderGeneralInfo = () => (
    <>
      <Button
        variant='contained'
        sx={{
          borderRadius: '16px',
          backgroundColor: theme.palette.accent?.softSageGreen,
          mb: 1,
          mt: 1,
          maxHeight: '10px'
        }}
        onClick={handleEditOrSave}
      >
        {editMode? 'Salveaza' : 'Editeaza informatii'}
      </Button>
      {generalFields.map((field, index) => (
        <Grid item xs={12} key={index}>
          <AccountInfoGridItem
            title={field.title}
            value={field.value}
            isValueEditable={true}
            onEditValue={(newValue) => {
              setAnimalEdited(true);
              field.isCheckbox ? field.onEditValueFn(newValue === 'true') : field.onEditValueFn(newValue)
            }}
            showDivider={false}
            editButtonColor='accent.green'
            usesButtonForEdit={editMode}
            isSelect={field.isSelect}
            selectOptions={field.selectOptions}
            selectValues={field.selectValues}
            type={field.type}
            isCheckbox={field.isCheckbox}
          />
        </Grid>
      ))}    
    </>
  );

  const renderMedicalInfo = () => (
    isLoading ? <CircularProgress /> :
    error ? <Typography variant="h5" color="error">Eroare la incarcarea profilului!</Typography> :
    <>
      <Button
        variant='contained'
        sx={{
          borderRadius: '16px',
          backgroundColor: theme.palette.accent?.softSageGreen,
          mb: 1,
          mt: 1,
          maxHeight: '10px'
        }}
        onClick={handleEditOrSave}
      >
        {editMode? 'Salveaza' : 'Editeaza informatii'}
      </Button>
      {medicalFields.map((field, index) => (
        <Grid item xs={12} key={index}>
          <AccountInfoGridItem
            title={field.title}
            value={field.value}
            isValueEditable={true}
            onEditValue={(newValue) => {
              setAnimalProfileEdited(true);
              field.onEditValueFn(newValue)
            }}
            showDivider={false}
            editButtonColor='accent.green'
            usesButtonForEdit={editMode}
          />
        </Grid>
      ))}    
    </>
  );

  const renderMedicalAppointments = () => (
    <>
      <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>Programari medicale</Typography>
      <Typography variant="body1">{animalProfile?.medicalAppointments}</Typography>
    </>
  );

  const renderUsefulLinks = () => (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>Link-uri utile</Typography>
      </Grid>
      {usefulLinks.map((link, index) => (
        link !== '' && (
          <Grid container key={index} alignItems="center">
            <Typography variant="body1">{link}</Typography>
          </Grid>
        )
      ))}
      {addedUsefulLinks.map((link, index) => (
        <Grid container key={index} alignItems="center">
          <Grid item xs={10}>
            <TextField
              value={link}
              onChange={(e) => {handleLinkChange(index, e.target.value)}}
              fullWidth
              variant="standard"
              error={!!usefulLinksErrors[index]}
              helperText={usefulLinksErrors[index]}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={
              () => {
                const newLinks = [...addedUsefulLinks];
                newLinks.splice(index, 1);
                setAddedUsefulLinks(newLinks);

                const newErrors = [...usefulLinksErrors];
                newErrors.splice(index, 1);
                setUsefulLinksErrors(newErrors);
              }
            }>
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={6}>
        <Button
          onClick={() => {
            setAddedUsefulLinks([...addedUsefulLinks, '']);
            setUsefulLinksErrors([...usefulLinksErrors, '']);
          }}
          startIcon={<AddIcon 
            sx={{
              color: theme.palette.accent?.green
            }}
          />}
          sx={{
            color: theme.palette.accent?.green,
          }}
        >
          Adauga link
        </Button>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant='contained'
          sx={{
            borderRadius: '16px',
            backgroundColor: theme.palette.accent?.softSageGreen,
            maxHeight: '10px',
          }}
          onClick={() => {
            setAddedUsefulLinks(['']);
            setUsefulLinksErrors(['']);
            handleEditOrSave();
          }}
          disabled={usefulLinksErrors.some((error) => !!error) || addedUsefulLinks.length === 0 || addedUsefulLinks.some((link) => link === '')}
        >
          Salveaza
        </Button>
      </Grid>
    </Grid>
  );

  const renderImageUploader = () => (
    <>
      <ImageUploader
        control={control}
        name="imageUrls"
        errors={errors}
      />
      {imageUrls && imageUrls.length > 0 && 
        <Button
          variant="contained"
          sx={{ 
            borderRadius: '16px',
            backgroundColor: theme.palette.accent?.softSageGreen,
            mb: 1,
            mt: 1,
            maxHeight: '10px'
          }}
          onClick={handleSaveImagesClick}
        >
          Adauga imagini
        </Button>
      }
    </>
  );


  return (
    <Container sx={{ height: '91vh', display: 'flex' }}>
      <Box 
        display="flex" 
        gap="16px"
        sx={{
          my: 6,
          flexGrow: 1,
        }}
      >
        {/* Left CustomCard */}
        <Box 
          width="60%"
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          <CustomCard
            width='100%'
            title={
              <Button
                variant="contained"
                endIcon={<UploadIcon />}
                sx={{ 
                  backgroundColor: theme.palette.accent?.darkGreen, 
                  color: 'white',
                  px: 10,
                  py: 0.5,
                  borderRadius: '15px',
                }}
                onClick={handleUploadImagesClick}
              >
                Incarca fotografii
              </Button>
            }
            headerRight={<PanoramaOutlinedIcon sx={{
              width: '30px',
              height: '30px',
            }} />}
            shadow={true}
            closeButton={false}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
                sx={{ minWidth: 'auto', color: theme.palette.accent?.green }}
              >
                <ArrowBackIosIcon />
              </Button>
              <img
                src={animalImageUrls.length > 0 ? animalImageUrls[currentImageIndex] : defaultPhoto}
                style={{ width: '200px', height: 'auto', borderRadius: '16px' }}
              />
              <Button
                onClick={handleNextImage}
                disabled={currentImageIndex === animalImageUrls.length - 1}
                sx={{ minWidth: 'auto', color: theme.palette.accent?.green }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </CustomCard>
          {/* Actions button result */}
          {showInfo !== '' && 
            <Grid 
              container
              sx={{
                mt: 6,
                px: 4,
                backgroundColor: theme.palette.accent?.darkerBeige,
                borderRadius: '15px',
                borderColor: theme.palette.accent?.darkGreen,
                borderWidth: '1px',
                borderStyle: 'solid',
                maxHeight: '25vh',
                overflowY: 'auto',
              }}
            >
              {showInfo === 'general' && renderGeneralInfo()}
              {showInfo === 'medical' && renderMedicalInfo()}
              {showInfo === 'usefulLinks' && renderUsefulLinks()}
              {showInfo === 'medicalAppointments' && renderMedicalAppointments()}
              {showInfo === 'imageUpload' && renderImageUploader()}
            </Grid>
          }
        </Box>

        {/* Right CustomCard */}
        <Box width="40%" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Box>
            <CustomCard
              title={<Typography variant="h5" color="white" sx={{
                backgroundColor: theme.palette.accent?.darkGreen,
                px: 12,
                py: 1,
                borderRadius: '15px',
              }}>ACTIUNI</Typography>}
              shadow={false}
              closeButton={false}
              headerRight={null}
              height="auto"
              width='auto'
            >
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mt: 3, 
                  mb: 5, 
                  backgroundColor: theme.palette.accent?.green,
                  borderRadius: '16px' 
                }}
                onClick={handleGeneralInfoClick}
              >
                Informatii generale
              </Button>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mb: 5,
                  backgroundColor: theme.palette.accent?.green,
                  borderRadius: '16px'   
                }}
                onClick={handleMedicalInfoClick}
              >
                Informatii medicale
              </Button>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mb: 5,
                  backgroundColor: theme.palette.accent?.green,
                  borderRadius: '16px'
                }}
                onClick={handleMedicalAppointmentsClick}
                >
                  Programari medicale
              </Button>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mb: 9,
                  backgroundColor: theme.palette.accent?.green,
                  borderRadius: '16px'  
                }}
                onClick={handleUsefulLinksClick}
                >
                  Link-uri utile
                </Button>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: '16px',
                  backgroundColor: theme.palette.error?.main,
                }}
                onClick={() => handleDeleteClick(animal.id)}
              >
                Sterge animal
              </Button>
            </CustomCard>
          </Box>
          <Button
            variant="contained"
            sx={{ 
              mt: 'auto',
              mb: 'auto',
              ml: 20,
              borderRadius: '16px', 
              backgroundColor: theme.palette.accent?.darkGreen
            }}
            onClick={() => navigate('/management/animalute/lista')}
          >
            Inapoi
          </Button>
        </Box>
      </Box>
      {snackbarConfirmation ? 
        <AppSnackbar
          open={snackbarOpen}
          severity="warning"
          onClose={handleCloseSnackbar}
        >
          Esti sigur ca vrei sa stergi acest animal?
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
    </Container>
  );
};