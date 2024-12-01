import React from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';

type CustomCardProps = {
  width?: string;
  height?: string;
  align?: 'center' | 'flex-start' | 'flex-end';
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const CustomCard = ({
  width = '300px',
  height = '400px',
  align = 'center',
  title,
  subtitle = '',
  children,
}: CustomCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
      }}
    >
      {/* Shadow Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          left: '-12px',
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          backgroundColor: theme.palette.accent?.darkGreen, // Shadow color
          border: `2px solid #000`, // Shadow border
          zIndex: 0,
        }}
      ></Box>

      {/* Main Card */}
      <Card
        elevation={3}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '15px', // Match shadow corners
          backgroundColor: theme.palette.accent?.beige, // Main card color
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1, // Stack above shadow
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.accent?.lightGreen, // Header background
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderRadius: '15px 15px 0 0', // Match top corners
            border: `2px solid #000`, // Header border
          }}
        >
          {/* Close Button (X) */}
          <Box
            sx={{
              width: '20px',
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <img
              src={'/x.svg'}
              alt="close"
              style={{ width: '100%', height: '100%' }}
            />
          </Box>

          {/* Title */}
          {title && (
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#000',
                flexGrow: 1,
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
          )}

          {/* Circle */}
          <Box
            sx={{
              width: '28px',
              height: '28px',
              backgroundColor: theme.palette.accent?.darkGreen,
              borderRadius: '50%',
              border: '2px solid #000',
            }}
          />
        </Box>

        {/* Content Section */}
        <CardContent
          sx={{
            padding: '16px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderRadius: '0 0 15px 15px',
            border: `2px solid #000`,
          }}
        >
          {subtitle && <Typography variant="h6">{subtitle}</Typography>}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: align,
            }}
          >
            {children}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
