import React from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';

type CustomCardProps = {
  width?: string | { xs: string; sm: string; md: string; lg: string };
  height?: string | { xs: string; sm: string; md: string; lg: string };
  align?: 'center' | 'flex-start' | 'flex-end';
  justify?:
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'flex-start'
    | 'flex-end';
  padding?: string;
  title?: React.ReactNode;
  subtitle?: string;
  shadow?: boolean;
  closeButton?: boolean;
  headerRight?: React.ReactNode;
  maxHeight?: string;
  children: React.ReactNode;
};

export const CustomCard = ({
  width = '300px',
  height = '400px',
  align = 'center',
  justify = 'center',
  title,
  padding = '0px',
  subtitle = '',
  shadow = true,
  closeButton = true,
  headerRight = (
    <Box
      sx={{
        width: '28px',
        height: '28px',
        backgroundColor: 'accent.mutedGreen',
        borderRadius: '50%',
        border: '2px solid #000',
      }}
    />
  ),
  maxHeight = '400px',
  children,
}: CustomCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        padding,
      }}
    >
      {/* Shadow Layer */}
      {shadow && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '40px', sm: '8px', md: '10px', lg: '12px' },
            left: { xs: '-10px', sm: '-8px', md: '-10px', lg: '-12px' },
            width: '100%',
            height: '100%',
            borderRadius: '15px',
            backgroundColor: theme.palette.accent?.darkGreen, // Shadow color
            border: `2px solid #000`, // Shadow border
            zIndex: 1,
          }}
        ></Box>
      )}

      {/* Main Card */}
      <Card
        elevation={3}
        sx={{
          position: 'relative',
          width: width,
          height: height,
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
            position: 'relative',
            minHeight: '50px', // Ensure header has a minimum height
          }}
        >
          {/* Close Button (X) */}
          {closeButton && (
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
          )}

          {/* Title */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Box>

          {/* Header Right */}
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {headerRight}
          </Box>
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
            overflowY: 'auto',
            maxHeight: maxHeight,
          }}
        >
          {subtitle && <Typography variant="h6">{subtitle}</Typography>}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: justify,
              alignItems: align,
            }}
          >
            {children}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
