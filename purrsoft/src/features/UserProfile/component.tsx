import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { DatePicker } from '../../components/DatePicker';

type Props = {}

export const UserProfile = (props: Props) => {
    const theme = useTheme();
    const specialDates = [new Date('December 17, 2024 03:24:00'), new Date('November 7, 2024 03:24:00'), new Date('December 25, 2024')]

    const today = new Date();
    const closestDate = specialDates
      .filter(date => date > today) // filter future dates
      .sort((a, b) => a.getTime() - b.getTime())[0]; // get the closest one by sorting

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
            gap: theme.spacing(3),
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
                <DatePicker specialDates={specialDates}/>
                <Box
                  sx={{
                          backgroundColor: theme.palette.accent?.lightGreen,
                          width: '100%',
                          textAlign: 'center',
                          padding: theme.spacing(2,0),
                          borderRadius: '30px',
                      }}
                  >
                      <Typography variant="body1">Urmatorul Shift</Typography>
                      {closestDate && (
                        <Typography variant="body1">
                          {closestDate.toLocaleDateString('ro-RO', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}, 10:00 AM
                        </Typography>
                      )}
                      <Typography>Locatie: La Casuta</Typography>
                </Box>
                <Button
                  sx={{
                    backgroundColor: theme.palette.accent?.darkGreen,
                    width: '100%',
                    color: 'black',
                  }}>Contul meu</Button>

            {/* Additional sidebar content */}
          </Box>
  )
}