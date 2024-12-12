import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

type AccountInfoGridItemProps = {
  title: string;
  subtitle?: string;
  value?: string;
  type?: 'text' | 'password' | 'email';
  isDisabled?: boolean;
  isValueEditable?: boolean;
  onEditValue?: (newValue: string) => void;
  validationSchema?: Yup.AnySchema;
  actionButton?: React.ReactNode;
  sxActionButton?: object;
  onClickedActionButton?: () => void;
  showDivider?: boolean;
  usesButtonForEdit?: boolean;
  editButtonColor?: string;
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
  editButtonColor = 'accent.beige'
}: AccountInfoGridItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Formik
      initialValues={{ value }}
      validationSchema={
        validationSchema ||
        Yup.object().shape({
          value: Yup.string().required('This field is required'),
        })
      }
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setIsEditing(false);
        if (onEditValue) onEditValue(values.value);
        setSubmitting(false);
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
              backgroundColor: 'transparent',
            }}
          >
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

            <Grid item xs={5}>
              {isEditing && isValueEditable && !isDisabled ? (
                <TextField
                  name="value"
                  fullWidth
                  type={type}
                  value={values.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                    fontFamily: type === 'password' ? 'monospace' : 'inherit',
                  }}
                >
                  {type === 'password'
                    ? value.replace(/./g, '●') || '●●●●●●'
                    : value || ''}
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                {isValueEditable && !isDisabled && usesButtonForEdit && (
                  <IconButton
                    sx={sxActionButton}
                    onClick={() => {
                      if (isEditing) {
                        handleSubmit();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                  >
                    {isEditing ? (
                      <CheckIcon sx={{ color: editButtonColor }} />
                    ) : (
                      <EditIcon sx={{ color: editButtonColor }} />
                    )}
                  </IconButton>
                )}
                {actionButton && onClickedActionButton && (
                  <IconButton
                    sx={sxActionButton}
                    onClick={onClickedActionButton}
                    disabled={isDisabled}
                  >
                    {actionButton}
                  </IconButton>
                )}
              </Box>
            </Grid>

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