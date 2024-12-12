import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import {
  useAccountQuery,
  useRolesAndStatusQuery,
  useRolesAndDatesQuery,
} from '../../../store';
import { AccountInfoGridItem } from '../../../components/AccountInfoGridItem';
import dayjs from 'dayjs';

export const RolurileMele = () => {
  const theme = useTheme();

  const { data: user, isLoading: isUserLoading } = useAccountQuery();
  const { data: rolesAndStatus, isLoading: isStatusLoading } =
    useRolesAndStatusQuery(user?.id || '');
  const { data: rolesAndDates, isLoading: isDatesLoading } =
    useRolesAndDatesQuery(user?.id || '');
  console.log(rolesAndDates);
  console.log(rolesAndStatus);
  if (isUserLoading || isStatusLoading || isDatesLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(3),
        borderRadius: 2,
      }}
    >
      <Grid item>
        <Typography variant="h5" color="black" fontWeight="bold">
          Informatii rol:
        </Typography>
      </Grid>
      {isUserLoading ? (
        <CircularProgress />
      ) : (
        <>
          <AccountInfoGridItem
            title="Roluri"
            subtitle={user?.roles.join(', ') || 'N/A'}
          />
          <AccountInfoGridItem
            title="Status"
            subtitle={rolesAndStatus?.records
              .map(
                (roleAndStat) =>
                  roleAndStat.role + '( ' + roleAndStat.status + ' )' + '',
              )
              .join(', ')}
          />
        </>
      )}
      {isDatesLoading ? (
        <CircularProgress />
      ) : (
        <AccountInfoGridItem
          title="Start date"
          subtitle={
            rolesAndDates?.records
              .map((roleAndDate) => {
                if (roleAndDate.role !== 'Manager') {
                  return (
                    roleAndDate.role +
                    '( ' +
                    dayjs(roleAndDate.startDate).format('DD/MM/YYYY') +
                    ' )'
                  );
                }
                return 'Manager(Does not have a start date)';
              })
              .join(', ') || 'N/A'
          }
        />
      )}
    </Grid>
  );
};
