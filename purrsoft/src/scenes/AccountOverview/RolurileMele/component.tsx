import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { useAccountQuery } from '../../../store';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';

export const RolurileMele = () => {
  const theme = useTheme();
  const { data: user, isLoading } = useAccountQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

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
      <Grid item xs={4}>
        <Typography variant="h5" color="black" fontWeight="bold">
          Informatii rol:
        </Typography>
      </Grid>
      <AccountInfoGridItem
        title="Roluri"
        value={user?.roles.join(', ') || ''}
      />
      {/* {console.log(user?.roles)} */}
    </Grid>
  );
};
