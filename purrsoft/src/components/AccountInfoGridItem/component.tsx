import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

type AccountInfoGridItemProps = {
  title: string;
  subtitle?: string;
  value?: string;
  type?: 'text' | 'password' | 'email'; // Specify the type of field
  isPassword?: boolean; // Whether the value should be displayed as dots
  isDisabled?: boolean; // Whether the field is disabled
  isValueEditable?: boolean; // Whether the value is editable
  onEditValue?: (newValue: string) => void; // Callback when value is saved
  validationSchema?: Yup.AnySchema; // Optional validation schema
  actionButton?: React.ReactNode; // Custom action button/icon
  sxActionButton?: object; // Custom styles for the action button
  onClickedActionButton?: () => void; // Handler for the action button
  showDivider?: boolean; // Whether to show a divider
  usesButtonForEdit?: boolean; // Whether to use a button for editing
};

export const AccountInfoGridItem = ({
  title,
  subtitle,
  value = '',
  type = 'text',
  isDisabled = false,
  isValueEditable = false,
  onEditValue,
  validationSchema,
  actionButton,
  sxActionButton,
  onClickedActionButton,
  showDivider = true,
  usesButtonForEdit = true,
}: AccountInfoGridItemProps) => {
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [currentValue, setCurrentValue] = useState(value); // Track current value

  const handleSave = (newValue: string) => {
    setIsEditing(false); // Exit editing mode
    if (onEditValue) {
      onEditValue(newValue); // Notify parent with the new value
    }
  };

  const theme = useTheme();

  return (
    <Formik
      initialValues={{ value: currentValue }}
      validationSchema={
        validationSchema ||
        Yup.object().shape({
          value: Yup.string().required('This field is required'),
        })
      }
      onSubmit={(values) => {
        setCurrentValue(values.value);
        handleSave(values.value || '');
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              backgroundColor: 'transparent', // Transparent container
            }}
          >
            {/* Title & Subtitle */}
            <Grid item xs={4}>
              <Typography variant="body1" color={isDisabled ? 'gray' : 'black'}>
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="body2"
                  color={isDisabled ? 'gray' : 'black'}
                >
                  {subtitle}
                </Typography>
              )}
            </Grid>

            {/* Editable Field or Display */}
            <Grid item xs={5}>
              {isEditing && isValueEditable && !isDisabled ? (
                <TextField
                  name="value"
                  fullWidth
                  type={type} // Use the type prop
                  value={values.value}
                  onChange={(e) => {
                    handleChange(e); // Update Formik state
                    setCurrentValue(e.target.value); // Sync with local state
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (!usesButtonForEdit) {
                      handleSubmit(); // Auto-save on blur
                    }
                  }}
                  error={touched.value && !!errors.value}
                  helperText={touched.value && errors.value}
                  slotProps={{
                    input: {
                      style: {
                        backgroundColor: 'transparent', // Make the field transparent
                      },
                    },
                  }}
                />
              ) : (
                <Typography
                  variant="body1"
                  color={isDisabled ? 'gray' : 'black'}
                  sx={{
                    fontFamily: type === 'password' ? 'monospace' : 'inherit', // Optional font style for passwords
                  }}
                >
                  {type === 'password'
                    ? currentValue?.replace(/./g, '●') || '●●●●●●' // Masked dots for password
                    : currentValue || ''}{' '}
                  {/* Display value or "N/A" */}
                </Typography>
              )}
            </Grid>

            {/* Action Button */}
            <Grid item xs={3}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                {isValueEditable && !isDisabled && usesButtonForEdit && (
                  <IconButton
                    sx={{
                      ...sxActionButton, // Apply custom styles
                    }}
                    onClick={() => {
                      if (isEditing) {
                        handleSubmit(); // Save value on button click
                      } else {
                        setIsEditing(true); // Enter editing mode
                      }
                    }}
                  >
                    {isEditing ? (
                      <CheckIcon sx={{ color: theme.palette.accent?.beige }} /> // Check icon for save
                    ) : (
                      <EditIcon sx={{ color: theme.palette.accent?.beige }} /> // Edit icon for edit
                    )}
                  </IconButton>
                )}
                {actionButton && onClickedActionButton && (
                  <IconButton
                    sx={{ ...sxActionButton }}
                    onClick={onClickedActionButton} // Trigger custom action
                    disabled={isDisabled}
                  >
                    {actionButton && React.isValidElement(actionButton)
                      ? React.cloneElement(actionButton as React.ReactElement, {
                          sx: { fontSize: 'inherit', color: 'inherit' }, // Ensure it inherits styles
                        })
                      : actionButton}
                  </IconButton>
                )}
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
