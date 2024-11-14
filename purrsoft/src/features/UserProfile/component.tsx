import { Box, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

type Props = {}

export const UserProfile = (props: Props) => {
    const theme = useTheme();
  return (
    <Box
          component={Paper}
          sx={{
            position: 'fixed', // Fixed sidebar on tablet and larger screens
            top: '16px',
            left: '32px',
            width: '320px',
            height: '80vh',
            backgroundColor: theme.palette.accent?.beige,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: '24px',
            border: `10px solid ${theme.palette.accent?.lightGreen}`,
            boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
          }}
        >
            <Box
                component="img"
                src='../../../public/green-cats-logo.png'
                alt="description"
                sx={{
                    width: '50%',
                    height: 'auto',
                    borderRadius: '8px',
                }}
                />
                <Box 
                    sx={{
                        backgroundColor: theme.palette.accent?.lightGreen,
                        width: '100%',
                        textAlign: 'center',
                        padding: theme.spacing(2),
                        borderRadius: theme.shape.borderRadius,
                    }}>
                    <Typography variant="body1">Username</Typography>
                </Box>
            {/* Additional sidebar content */}
          </Box>
  )
}