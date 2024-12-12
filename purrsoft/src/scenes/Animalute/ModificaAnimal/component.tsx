import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Grid, CircularProgress } from '@mui/material';
import { CustomCard } from './../../../components/CustomCard';
import UploadIcon from '@mui/icons-material/Upload';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import { useTheme } from '@mui/material/styles';
import { useDeleteAnimalMutation, useGetAnimalProfileQuery, useUpdateAnimalProfileMutation, useUpdateAnimalMutation } from '../../../store';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import { useState } from 'react';
import { AppSnackbar } from '../../../components/AppSnackbar';
import { useVisibility } from '../../../hooks/useVisibility';

export const ModificaAnimal = () => {
  const location = useLocation();
  const animal = location.state?.animal;
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteAnimal] = useDeleteAnimalMutation();
  const { data: animalProfile, error, isLoading } = useGetAnimalProfileQuery(animal.id);
  const [updateAnimalProfile] = useUpdateAnimalProfileMutation();
  const [updateAnimal] = useUpdateAnimalMutation();
  const [showInfo, setShowInfo] = useState(''); 
  const [animalType, setAnimalType] = useState(animal.animalType);
  const [name, setName] = useState(animal.name);
  const [yearOfBirth, setYearOfBirth] = useState(animal.yearOfBirth);
  const [gender, setGender] = useState(animal.gender);
  const [sterilized, setSterilized] = useState(animal.sterilized);
  const [passport, setPassport] = useState(animalProfile?.passport);
  const [microchip, setMicrochip] = useState(animalProfile?.microchip);
  const [currentDisease, setCurrentDisease] = useState(animalProfile?.currentDisease);
  const [currentMedication, setCurrentMedication] = useState(animalProfile?.currentMedication);
  const [pastDisease, setPastDisease] = useState(animalProfile?.pastDisease);
  const [currentTreatment, setCurrentTreatment] = useState(animalProfile?.currentTreatment);
  const [rabiesVaccine, setRabiesVaccine] = useState(animalProfile?.rabiesVaccine);
  const [multivalentVaccine, setMultivalentVaccine] = useState(animalProfile?.multivalentVaccine);
  const [editMode, setEditMode] = useState(false);
  const [animalEdited, setAnimalEdited] = useState(false);
  const [animalProfileEdited, setAnimalProfileEdited] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<string | null>(null);

  const {
    visibility: snackbarOpen,
    onOpen: onSnackbarOpen,
    onClose: onSnackbarClose,
  } = useVisibility();

  const handleDeleteClick = (animalId: string) => {
    setAnimalToDelete(animalId);
    onSnackbarOpen();
  };

  const handleCloseSnackbar = () => {
    onSnackbarClose();
    setAnimalToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (animalToDelete) {
      try {
        await deleteAnimal(animalToDelete);
        navigate('/management/animalute/lista');
      } catch (error) {
        console.error(error);
      } finally {
        handleCloseSnackbar();
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

  const handleUsefulLinksClick = () => {
    setEditMode(false);
    setShowInfo('usefulLinks');
  }

  const handleEditOrSave = () => {
    if (editMode) {
      if (animalProfileEdited) {
        updateAnimalProfile({
          animalId: animal.id,
          passport,
          microchip,
          currentDisease,
          currentMedication,
          pastDisease,
          currentTreatment,
          rabiesVaccine,
          multivalentVaccine,
        });
      }
      if (animalEdited) {
        updateAnimal({
          id: animal.id,
          animalType,
          name,
          yearOfBirth,
          gender,
          sterilized,
          imageUrl: animal.imageUrl
        });
      }
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }

  const renderGeneralInfo = () => (
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
      {editMode? 'Save info' : 'Edit info'}
    </Button>    
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Animal Type:"
          value={animalType}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setAnimalType(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Name:"
          value={name}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setName(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Year of Birth:"
          value={yearOfBirth}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setYearOfBirth(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Gender:"
          value={gender}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setGender(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Sterilized"
          value={sterilized ? 'Yes' : 'No'}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            newValue === 'Yes' ? setSterilized(true) : setSterilized(false)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Passport:"
          value={passport}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalProfileEdited(true);
            setPassport(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
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
        {editMode? 'Save info' : 'Edit info'}
      </Button>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Microchip:"
          value={microchip}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalProfileEdited(true);
            setMicrochip(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Current Disease:"
          value={currentDisease}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalProfileEdited(true);
            setCurrentDisease(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Current Medication:"
          value={currentMedication}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalProfileEdited(true);
            setCurrentMedication(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Past Disease:"
          value={pastDisease}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setPastDisease(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Current Treatment:"
          value={currentTreatment}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalProfileEdited(true);
            setCurrentTreatment(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Rabies Vaccine:"
          value={rabiesVaccine}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setRabiesVaccine(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
      <Grid item xs={12}>
        <AccountInfoGridItem
          title="Multivalent Vaccine:"
          value={multivalentVaccine}
          isValueEditable={true}
          onEditValue={(newValue) => {
            setAnimalEdited(true);
            setMultivalentVaccine(newValue)
          }}
          showDivider={false}
          editButtonColor='accent.green'
          usesButtonForEdit={editMode}
        />
      </Grid>
    </>
  );

  const renderUsefulLinks = () => (
    <>
      <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>Link-uri utile</Typography>
      {animalProfile?.usefulLinks?.map((link, index) => (
        <Grid item xs={12} key={index}>
          <Typography variant="body1">{link}</Typography>
        </Grid>
      ))}
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
            <img src={animal.imageUrl} style={{ width: '200px', height: 'auto', borderRadius: '16px' }} />
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
                GENERAL INFO
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
                  Link uri utile
                </Button>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: '16px',
                  // backgroundColor: theme.palette.accent?.error,
                  backgroundColor: 'red'
                }}
                onClick={() => handleDeleteClick(animal.id)}
              >
                Sterge animal
              </Button>
            </CustomCard>
          </Box>
          <Button
            variant="contained"
            color="success"
            sx={{ 
              mt: 'auto',
              mb: 'auto',
              ml: 20,
              borderRadius: '16px' 
            }}
            onClick={() => navigate('/management/animalute/lista')}
          >
            Inapoi
          </Button>
        </Box>
      </Box>
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
      </AppSnackbar>
    </Container>
  );
};