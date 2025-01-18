import React, { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Box,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

type AccountInfoGridItemProps = {
  title: string;
  subtitle?: string;
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number';
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
  isSelect?: boolean;
  selectOptions?: string[];
  selectValues?: string[];
  isCheckbox?: boolean;
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
  editButtonColor = 'accent.beige',
  isSelect = false,
  selectOptions = [],
  selectValues = [],
  isCheckbox = false,
}: AccountInfoGridItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();

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
        setFieldValue,
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
                isSelect ? (
                  <TextField
                    name="value"
                    fullWidth
                    select
                    value={values.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.value && !!errors.value}
                    helperText={touched.value && errors.value}
                    inputProps={{
                      style: { backgroundColor: 'transparent' },
                    }}
                  >
                    {selectOptions.map((option, index) => (
                      <MenuItem value={selectValues[index]}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) :
                isCheckbox ? (
                  <Checkbox 
                      name="value"
                      checked={values.value === 'true'}
                      sx={{ 
                        '&.Mui-checked': {
                          color: theme.palette.accent?.green,
                        },
                      }} 
                      onChange={(e) => setFieldValue('value', e.target.checked ? 'true' : 'false')} 
                    />
                ) : (
                <TextField
                  name="value"
                  fullWidth
                  type={type}
                  value={values.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.value && !!errors.value}
                  helperText={touched.value && errors.value}
                  inputProps={{
                    style: { backgroundColor: 'transparent' },
                  }}
                />
                )
              ) : (
                isCheckbox ? (
                  <Checkbox 
                      checked={values.value === 'true'}
                      sx={{ 
                        '&.Mui-checked': {
                          color: theme.palette.accent?.green,
                        },
                      }} 
                      disabled
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
                      : isSelect 
                        ? selectOptions[selectValues.indexOf(value)]
                        : value || ''}
                  </Typography>
                )
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