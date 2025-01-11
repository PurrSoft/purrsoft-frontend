import React, { useState } from 'react'
import {Box, Button, Paper, Typography, useTheme} from '@mui/material'
import { Redo, Undo } from '@mui/icons-material';

type Props = {
    specialDates: Date[];
}

export const DatePicker = ({specialDates}: Props) => {
const theme = useTheme();
const [currentDate, setCurrentDate] = useState(new Date());

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);


 // Calculate the previous month's overflow days
 const startDayOfWeek = firstDayOfMonth.getDay();
 const previousMonthOverflow = [...Array(startDayOfWeek).keys()].reverse().map(day => {
     const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), -day);
     return lastDayOfLastMonth.getDate();
 });

 // Calculate the current month's days
 const currentMonthDays = [...Array(lastDayOfMonth.getDate()).keys()].map(day => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1);
 });

 // Calculate the next month's overflow days to fill the rows
 const totalDays = previousMonthOverflow.length + currentMonthDays.length;
 const nextMonthOverflow = [...Array((7 - totalDays % 7) % 7).keys()].map(day => day + 1);

 // Adjust month
 const changeMonth = (increment: number) => {
     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
 };

 return (
    <Paper 
        elevation={3} 
        sx={{ 
            position: 'absolute',
            width: '100%', 
            height: '100%',
            overflow: 'hidden',
            padding: theme.spacing(1), 
            bgcolor: theme.palette.accent?.darkGreen, 
            borderRadius: '24px'
        }}
    >
        <Box 
            textAlign={'center'}
            alignItems="center"
        >
            <Typography 
                variant="h6"
                sx={{ color: theme.palette.accent?.beige }}
            >{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</Typography>
            
        </Box>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
            marginTop: 1
        }}>
            {days.map(day => (
                    <Typography 
                        key={day} 
                        variant='h6' 
                        sx={{ 
                            textAlign: 'center', 
                            color: theme.palette.accent?.beige
                        }}
                    >
                        {day}
                    </Typography>
                
            ))}
            {previousMonthOverflow.map((day, index) => (
                <Typography 
                    sx={{ 
                        textAlign: 'center', 
                        color: 'transparent' 
                    }}
                    >
                    {day}
                </Typography>
            ))}
            {currentMonthDays.map((day) => {
              const isSpecialDay = specialDates.some((d) => d.toDateString() == day.toDateString());  
                return (
                    <Box 
                        borderRadius={'50%'} 
                        width={'24px'}
                        height={'24px'}
                        padding={'1px'}
                        sx={{
                            backgroundColor: isSpecialDay ? theme.palette.accent?.lightGreen : undefined,
                        }}
                        >
                        <Typography 
                            sx={{ 
                                textAlign: 'center',
                                color: theme.palette.accent?.beige,
                            }}
                        >
                            {day.getDate()}
                        </Typography>
                    </Box>
                )
            })}
            {nextMonthOverflow.map((day, index) => (
                <Typography sx={{ textAlign: 'center', color: 'transparent' }}>
                    {day}
                </Typography>
            ))}
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', left: 0, bottom: 8}}>
            <Button onClick={() => changeMonth(-1)}>
                <Redo 
                    fontSize='large' 
                    sx={{ 
                        transform: 'rotate(180deg)', 
                        color: theme.palette.accent?.beige
                    }}
                />
            </Button>
            <Button onClick={() => changeMonth(1)}>
                <Undo 
                    fontSize='large' 
                    sx={{ 
                        transform: 'rotate(180deg)', 
                        color: theme.palette.accent?.beige
                    }}
                />
            </Button>
        </Box>
    </Paper>
);
}