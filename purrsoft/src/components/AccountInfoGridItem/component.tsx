import { Grid, Typography } from '@mui/material';

type AccountInfoGridItemProps = {
  label: string;
  value: string;
};

export const AccountInfoGridItem = ({
  label,
  value,
}: AccountInfoGridItemProps) => {
  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={4}>
        <Typography variant="body1" color="black">
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" color="black">
          {value}
        </Typography>
      </Grid>
      {/*add line under the grid item*/}
      <Grid item xs={12}>
        <hr />
      </Grid>
    </Grid>
  );
};
