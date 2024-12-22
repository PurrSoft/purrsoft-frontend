import { useCallback, useEffect, useState } from 'react';
import { Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import { Variant } from '@mui/material/styles/createTypography';

type ProgramDatePickerProps = {
  dateMetadata?: {
    [key: string]: {
      color?: string; // Color for the date
      tooltip?: string; // Tooltip for the date
    };
  };
  width?: string;
  monthVariant?: Variant;
  dayVariant?: Variant;
  smallScreenMonthVariant?: Variant;
  smallScreenDayVariant?: Variant;
  onMonthChange?: (month: Dayjs) => void; // Callback when the month changes
  onDateSelect?: (date: Dayjs) => void; // Callback when a date is selected
  selectedDate?: string | null; // Currently selected date
};

export const ProgramDatePicker = ({
  dateMetadata = {},
  onDateSelect,
  onMonthChange,
  width = '{{md:300px , lg: 300px}}',
  monthVariant = 'h4',
  smallScreenMonthVariant = 'h5',
  smallScreenDayVariant = 'h5',
  dayVariant = 'h4',
  selectedDate,
}: ProgramDatePickerProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // Detect small screens

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [localSelectedDate, setLocalSelectedDate] = useState<Dayjs | null>(
    selectedDate ? dayjs(selectedDate) : null,
  );

  const handleDateClick = (date: Dayjs) => {
    setLocalSelectedDate(date); // Update local state immediately
    if (onDateSelect) {
      onDateSelect(date); // Notify parent
    }
  };

  const generateWeeks = useCallback(() => {
    const firstDayOfMonth = currentMonth.startOf('month');
    const lastDayOfMonth = currentMonth.endOf('month');

    const weeks: (Dayjs | null)[][] = [];
    let currentWeek: (Dayjs | null)[] = [];

    for (let i = 0; i < firstDayOfMonth.day(); i++) {
      currentWeek.push(null); // Empty cell
    }

    for (let day = 1; day <= lastDayOfMonth.date(); day++) {
      currentWeek.push(firstDayOfMonth.date(day));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    while (currentWeek.length < 7) {
      currentWeek.push(null); // Empty cell
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    return weeks;
  }, [currentMonth]);

  const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, 'month'));
  const handlePreviousMonth = () =>
    setCurrentMonth((prev) => prev.subtract(1, 'month'));

  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentMonth);
    }
  }, [currentMonth, onMonthChange]);

  useEffect(() => {
    if (selectedDate) {
      setLocalSelectedDate(dayjs(selectedDate));
    }
  }, [selectedDate]);

  const daysInWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const weeks = generateWeeks();

  return (
    <Grid
      container
      direction="column"
      sx={{
        border: `2px solid black`,
        borderRadius: 2,
        overflow: 'hidden',
        width: width,
        margin: 'auto',
      }}
    >
      {/* Month Navigation */}
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: '24px',
          borderBottom: `2px solid black`,
          backgroundColor: theme.palette.accent?.lightGreen,
        }}
      >
        <Grid item>
          <PlayCircleTwoToneIcon
            onClick={handlePreviousMonth}
            sx={{ cursor: 'pointer', transform: 'rotate(180deg)' }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant={isSmallScreen ? smallScreenMonthVariant : monthVariant} // Dynamically change variant
            fontWeight="bold"
            color="black"
          >
            {currentMonth.format('MMMM YYYY').toUpperCase()}
          </Typography>
        </Grid>
        <Grid item>
          <PlayCircleTwoToneIcon
            onClick={handleNextMonth}
            sx={{ cursor: 'pointer' }}
          />
        </Grid>
      </Grid>

      {/* Weekday Headers */}
      <Grid container justifyContent="center" sx={{ padding: '8px 0' }}>
        {daysInWeek.map((day) => (
          <Grid
            item
            key={day}
            sx={{
              width: 50,
              height: 50,
              textAlign: 'center',
            }}
          >
            <Typography
              variant={isSmallScreen ? smallScreenDayVariant : dayVariant} // Dynamically change variant
              fontWeight="bold"
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        container
        sx={{
          paddingBottom: '16px',
        }}
      >
        {/* Calendar Rows */}
        {weeks.map((week, weekIndex) => (
          <Grid container justifyContent="center" key={weekIndex}>
            {week.map((day, dayIndex) => {
              if (!day) {
                return (
                  <Grid
                    item
                    key={`empty-${weekIndex}-${dayIndex}`}
                    sx={{
                      width: 50,
                      height: 50,
                      textAlign: 'center',
                    }}
                  />
                );
              }

              const dateKey = day.format('YYYY-MM-DD');
              const isSelected =
                localSelectedDate && localSelectedDate.isSame(day, 'day');
              const metadata = dateMetadata[dateKey];

              return (
                <Grid
                  item
                  key={dateKey}
                  sx={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    onClick={() => handleDateClick(day)}
                    variant={isSmallScreen ? smallScreenDayVariant : dayVariant} // Dynamically change variant
                    sx={{
                      cursor: 'pointer',
                      color: isSelected ? 'white' : 'black',
                      backgroundColor: metadata?.color || 'transparent',
                      borderRadius: '50%',
                      border: isSelected
                        ? `2px solid black`
                        : '1px solid transparent',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      '&:hover': {
                        backgroundColor: isSelected
                          ? theme.palette.accent?.lightGreen
                          : theme.palette.accent?.mutedGreen,
                      },
                    }}
                    title={metadata?.tooltip || ''}
                  >
                    {day.date()}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
