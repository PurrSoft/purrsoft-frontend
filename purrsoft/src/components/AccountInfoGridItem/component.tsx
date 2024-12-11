import { Grid, Typography, TextField, IconButton, Box } from '@mui/material';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React from 'react';

type AccountInfoGridItemProps = {
  title: string;
  subtitle?: string;
  value?: string;
  isDisabled?: boolean; // Whether the field is disabled
  isValueEditable?: boolean; // Whether the value is editable
  onEditValue?: (newValue: string) => void; // Callback when value is saved
  validationSchema?: Yup.AnySchema; // Optional validation schema
  actionButton?: React.ReactNode; // Custom action button/icon
  sxActionButton?: object; // Custom styles for the action button
  onClickedActionButton?: () => void; // Handler for the action button
  showDivider?: boolean; // Whether to show a divider
};

export const AccountInfoGridItem = ({
  title,
  subtitle,
  value,
  isDisabled = false,
  isValueEditable = false,
  onEditValue,
  validationSchema,
  actionButton,
  sxActionButton,
  onClickedActionButton,
  showDivider = true,
}: AccountInfoGridItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = (newValue: string) => {
    setIsEditing(false);
    if (onEditValue) onEditValue(newValue);
  };

  return (
    <Formik
      initialValues={{ value: currentValue }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setCurrentValue(values.value);
        handleSave(values.value || '');
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2} alignItems="center">
            {/* Title & Subtitle */}
            <Grid item xs={4}>
              <Grid container direction="column" spacing={0}>
                <Grid item>
                  <Typography
                    variant="body1"
                    color={isDisabled ? 'gray' : 'black'}
                  >
                    {title}
                  </Typography>
                </Grid>
                {subtitle && (
                  <Grid item>
                    <Typography
                      variant="body2"
                      color={isDisabled ? 'gray' : 'black'}
                    >
                      {subtitle}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Value or Input Field */}
            <Grid item xs={5}>
              {isEditing && isValueEditable && !isDisabled ? (
                <Field
                  name="value"
                  as={TextField}
                  fullWidth
                  disabled={isDisabled}
                  error={touched.value && !!errors.value}
                  helperText={touched.value && errors.value}
                />
              ) : (
                <Typography
                  variant="body1"
                  color={isDisabled ? 'gray' : 'black'}
                >
                  {currentValue}
                </Typography>
              )}
            </Grid>

            {/* Action Button */}
            <Grid item xs={3}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <IconButton
                  sx={{
                    ...sxActionButton, // Apply sx styles directly to IconButton
                  }}
                  onClick={() => {
                    if (isValueEditable && !isDisabled) {
                      if (isEditing) {
                        document.querySelector('form')?.dispatchEvent(
                          new Event('submit', {
                            cancelable: true,
                            bubbles: true,
                          }),
                        );
                      } else {
                        setIsEditing(true);
                      }
                    } else if (onClickedActionButton) {
                      onClickedActionButton();
                    }
                  }}
                  disabled={isDisabled}
                >
                  {actionButton && React.isValidElement(actionButton)
                    ? React.cloneElement(actionButton as React.ReactElement, {
                        sx: { fontSize: 'inherit', color: 'inherit' }, // Ensure it inherits styles
                      })
                    : actionButton}
                </IconButton>
              </Box>
            </Grid>

            {/* Divider */}
            {showDivider && (
              <Grid item xs={12}>
                <hr />
              </Grid>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
