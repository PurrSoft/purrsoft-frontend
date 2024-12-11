import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { CustomCard } from './../../../components/CustomCard';
import UploadIcon from '@mui/icons-material/Upload';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import { useTheme } from '@mui/material/styles';
import { useDeleteAnimalMutation, useGetAnimalProfileQuery, useUpdateAnimalProfileMutation } from '../../../store';
import { useState, useEffect } from 'react';

export const ModificaAnimal = () => {
  // const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const animal = location.state?.animal;
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteAnimal] = useDeleteAnimalMutation();
  // const { data: animalProfile, error, isLoading } = useGetAnimalProfileQuery(animal.id);
  // const [updateAnimalProfile] = useUpdateAnimalProfileMutation();
  const [textFieldContent, setTextFieldContent] = useState('');

  useEffect(() => {
    // if (animalProfile) {
      setTextFieldContent(`Name: ${animal.name}\nType: ${animal.animalType}\nBirth: ${animal.yearOfBirth}\nGender: ${animal.gender}\nSterilized: ${animal.sterilized}\nPassport: ${animalProfile.passport}`);
    // }
  }, [animal]);

  const onDeleteAnimal = async () => {
    try {
      await deleteAnimal(animal.id);
      navigate('/management/animalute/lista');
    } catch (error) {
      console.error(error);
    }
  }

  const handleGeneralInfoClick = () => {
    if (animalProfile) {
      setTextFieldContent(`Name: ${animal.name}\nType: ${animal.animalType}\nBirth: ${animal.yearOfBirth}\nGender: ${animal.gender}\nSterilized: ${animal.sterilized}\nPassport: ${animalProfile.passport}`);
    }
  }

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
            <img src={animal.imageUrl} alt={animal.name} style={{ width: '200px', height: 'auto', borderRadius: '16px' }} />
          </CustomCard>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            value={textFieldContent}
            InputProps={{ 
              readOnly: true
            }}
            sx={{ 
              borderRadius: '15px', 
              mt: 'auto', 
              mb: 'auto',
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.accent?.darkerBeige,
              }
            }}
          />
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
                >
                  Link uri utile
                </Button>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: '16px' 
                }}
                onClick={onDeleteAnimal}
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
    </Container>
  );
};