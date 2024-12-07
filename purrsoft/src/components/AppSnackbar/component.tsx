import { Alert, AlertProps, Snackbar } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  open: boolean;
  severity: AlertProps['severity'];
  onClose: () => void;
}>;

export const AppSnackbar = ({ children, open, severity, onClose }: Props) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', color: 'accent.white' }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};