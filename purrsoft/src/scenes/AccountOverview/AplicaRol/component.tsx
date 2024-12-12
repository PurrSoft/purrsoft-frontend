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
        subtitle="Despre:...."
        actionButton={<ArrowCircleRight />}
        onClickedActionButton={() => window.open(links['Admin'], '_blank')}
        showDivider={false}
        isDisabled={user?.roles.includes('Admin')}
        sxActionButton={{
          color: 'white',
          fontSize: '2rem',
        }}
      />
      <AccountInfoGridItem
        title="Voluntar"
        subtitle="Despre:...."
        actionButton={<ArrowCircleRight />}
        onClickedActionButton={() => window.open(links['Voluntar'], '_blank')}
        showDivider={false}
        isDisabled={user?.roles.includes('Volunteer')}
        sxActionButton={{
          color: 'white',
          fontSize: '2rem',
        }}
      />
      <AccountInfoGridItem
        title="Foster"
        subtitle="Despre:...."
        actionButton={<ArrowCircleRight />}
        onClickedActionButton={() => window.open(links['Foster'], '_blank')}
        showDivider={false}
        isDisabled={user?.roles.includes('Foster')}
        sxActionButton={{
          color: 'white',
          fontSize: '2rem',
        }}
      />
    </Grid>
  );
};
