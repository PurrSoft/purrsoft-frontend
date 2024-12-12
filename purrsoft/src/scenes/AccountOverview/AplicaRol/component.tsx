import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { useAccountQuery } from '../../../store';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import { ArrowCircleRight } from '@mui/icons-material';

export const AplicaRol = () => {
  const { data: user, isLoading } = useAccountQuery();
  const theme = useTheme();

  if (isLoading) {
    return <CircularProgress />;
  }
  /*dictionar de links pentru forms pentru fiecare rol*/
  const links = {
    Admin: 'link1',
    Voluntar: 'link2',
    Foster: 'link3',
  };
  const descriptions = {
    Admin:
      'Administratorii coordonează activitatea shelter-ului, echipele și evenimentele. Ei iau decizii manageriale pentru a asigura buna funcționare a shelter-ului.',
    Voluntar:
      'Voluntarii se implică în îngrijirea animalelor, întreținerea shelter-ului și organizarea evenimentelor. Este un rol ideal pentru cei care vor să ajute activ și să facă parte dintr-o echipă dedicată.  ',
    Foster:
      'Fosterii oferă un mediu temporar sigur pentru animale, având grijă de ele acasă până la adopție. Este perfect pentru cei care pot oferi timp, spațiu și iubire animalelor.  ',
  };
  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: { xs: 'auto', md: '100%' },
        flexDirection: 'column',
        gap: theme.spacing(2),
      }}
    >
      <Grid item>
        <Typography variant="h4" color="black" fontWeight="bold">
          Aplica pentru un rol:
        </Typography>
      </Grid>
      <AccountInfoGridItem title="Roluri valabile:" value="" />
      <AccountInfoGridItem
        title="Admin"
        actionButton={<ArrowCircleRight />}
        onClickedActionButton={() => window.open(links['Admin'], '_blank')}
        showDivider={false}
        isDisabled={user?.roles.includes('Admin')}
        sxActionButton={{
          color: 'white',
          fontSize: '2rem',
        }}
        subtitle="Administratorii coordonează activitatea shelter-ului, echipele și evenimentele."
      />
      <AccountInfoGridItem
        title="Voluntar"
        actionButton={<ArrowCircleRight />}
        onClickedActionButton={() => window.open(links['Voluntar'], '_blank')}
        showDivider={false}
        isDisabled={user?.roles.includes('Volunteer')}
        sxActionButton={{
          color: 'white',
          fontSize: '2rem',
        }}
        subtitle=" Voluntarii se implică în îngrijirea animalelor"
      />
      <AccountInfoGridItem
        title="Foster"
        actionButton={<ArrowCircleRight />}
        onClickedActionButton={() => window.open(links['Foster'], '_blank')}
        showDivider={false}
        isDisabled={user?.roles.includes('Foster')}
        sxActionButton={{
          color: 'white',
          fontSize: '2rem',
        }}
        subtitle=" Fosterii oferă un mediu temporar sigur pentru animale"
      />
    </Grid>
  );
};
