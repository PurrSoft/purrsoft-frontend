import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
  Badge,
  Popover,
  Icon,
  useTheme,
  Chip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  useAccountQuery,
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
} from '../../store';
import { CustomCard } from '../../components/CustomCard';

type NotificationProps = {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
};

const Notification = ({ id, type, message, isRead }: NotificationProps) => {
  const theme = useTheme();
  const [updateNotification] = useUpdateNotificationMutation();

  const handleRead = () => {
    updateNotification({ notificationId: id, isRead: true, type, message });
  };
  return (
    <Grid
      item
      container
      key={id}
      sx={{
        border: '1px solid',
        backgroundColor: theme.palette.accent?.beige,
      }}
      padding={2}
      flexDirection={'row'}
      flexWrap={'nowrap'}
      justifyContent={'space-between'}
      md={12}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Grid item>
        <img
          src="/icons/mail.png"
          alt="mail"
          style={{
            width: '48px',
            height: '48px',
            marginRight: '8px',
          }}
        />
      </Grid>
      <Grid item container flexDirection={'column'} justifyContent={'center'}>
        <Grid item>
          <Typography variant="h5">{type}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{message}</Typography>
        </Grid>
      </Grid>
      {!isRead && (
        <Grid item>
          <Chip
            onClick={handleRead}
            sx={{
              backgroundColor: theme.palette.accent?.darkGreen,
              color: theme.palette.accent?.beige,
              borderRadius: '2px',
            }}
            label="OK"
          />
        </Grid>
      )}
    </Grid>
  );
};

export const NotificationsBar = () => {
  const { data: user } = useAccountQuery();
  const { data, isLoading, isError } = useGetNotificationsQuery({
    userId: user?.id,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (isLoading) {
    return (
      <Grid container sx={{ textAlign: 'center', mt: 4, padding: '0' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading notifications...
        </Typography>
      </Grid>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="error">
          Failed to load notifications.
        </Typography>
      </Box>
    );
  }

  const { records } = data;

  return (
    <>
      {/* Notifications Button */}
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="Notifications"
      >
        <Badge
          badgeContent={records.filter((n) => !n.isRead).length}
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notifications Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          mt: 1,
        }}
      >
        <CustomCard
          leftButton={
            <Icon>
              {/*three dots icon*/}
              <MoreVertIcon
                sx={{
                  transform: 'rotate(90deg)',
                }}
              />
            </Icon>
          }
          padding="0"
          headerRight={<></>}
          shadow={false}
          justify={'flex-start'}
        >
          <Grid
            container
            padding={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'grey.300',
            }}
          >
            {records.length > 0 ? (
              records.map((notification) => (
                <Notification
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  message={notification.message}
                  isRead={notification.isRead}
                />
              ))
            ) : (
              <Typography variant="body2">
                No notifications available.
              </Typography>
            )}
          </Grid>
        </CustomCard>
      </Popover>
    </>
  );
};
