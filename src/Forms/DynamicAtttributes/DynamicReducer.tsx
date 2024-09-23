import { TextField, Button, Box, Grid, Typography, useTheme, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { DataTypeFormIdentifier } from '@/Constants/structure';

interface DynamicFormAtttributes<T> {
  form_title?: string;
  form_description?: string;
  form_title_styling_configuration?: string;
  form_description_styling_configuration?: string;
  allocated_form_data: T;
  validation_schema_declaration: Yup.ObjectSchema<any>;
  input_placeholder_settings?: string;
  on_form_submit: (form_values: T) => void;
  additional_class_name?: string;
  is_submit_button_loading?: boolean;
  form_box_styling?: string;
  input_field_styling?: string;
  button_text?: string;
  grid_spacing_configuration?: number;
  button_disabled_styling?: string;
  form_max_width?: number;
  button_styling?: string;
  form_padding_configuration?: number;
  field_label_transformer?: (field_key: string) => string;
  show_labels?: boolean;
  field_error_styling?: string;
  container_grid_alignment?: 'center' | 'flex-start' | 'flex-end';
  form_background_color?: string;
  disable_auto_complete?: boolean;
}

const determine_input_field_type = (field_key: string): string => {
  if (field_key.includes(DataTypeFormIdentifier.EM_L)) return DataTypeFormIdentifier.EM_L;
  if (field_key.includes(DataTypeFormIdentifier.PS_D)) return DataTypeFormIdentifier.PS_D;
  if (field_key.includes(DataTypeFormIdentifier.PHN)) return DataTypeFormIdentifier.TEL;
  return DataTypeFormIdentifier.TEXT;
};

const generate_placeholder_text = (field_key: string): string => {
  switch (field_key) {
    case 'registered_user_email':
      return 'Enter your email';
    case 'registered_user_password':
      return 'Enter your password';
    case 'registered_user_phone':
      return 'Enter your phone number';
    default:
      return `Enter ${field_key.replace('_', ' ')}`;
  }
};

const DynamicForm = <T extends Record<string, any>>({
  allocated_form_data,
  validation_schema_declaration,
  on_form_submit,
  form_title,
  form_description,
  form_title_styling_configuration,
  form_description_styling_configuration,
  is_submit_button_loading = false,
  form_box_styling,
  input_placeholder_settings,
  additional_class_name,
  input_field_styling,
  button_text = 'Submit',
  grid_spacing_configuration = 3,
  button_disabled_styling,
  form_max_width = 600,
  button_styling,
  form_padding_configuration = 4,
  field_label_transformer,
  show_labels = true,
  field_error_styling,
  container_grid_alignment = 'flex-start',
  form_background_color = '#fff',
  disable_auto_complete = false,
}: DynamicFormAtttributes<T>) => {
  const form_controller = useFormik({
    initialValues: allocated_form_data,
    validationSchema: validation_schema_declaration,
    onSubmit: (form_values) => {
      on_form_submit(form_values);
    },
  });

  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={form_controller.handleSubmit}
      className={form_box_styling}
      sx={{
        width: '100%',
        maxWidth: form_max_width,
        mx: 'auto',
        p: { xs: form_padding_configuration, md: form_padding_configuration },
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      >
        <Grid className={form_title_styling_configuration}>
          {form_title}
        </Grid>
        <Grid className={form_description_styling_configuration}>
          {form_description}
        </Grid>
      </Typography>

      <Grid container spacing={grid_spacing_configuration} justifyContent={container_grid_alignment}>
        {Object.keys(allocated_form_data).map((field_key) => (
          <Grid item xs={12} key={field_key}>
            <TextField
              id={field_key}
              name={field_key}
              label={
                field_key === 'registered_user_email'
                  ? 'Email'
                  : field_key === 'registered_user_password'
                    ? 'Password'
                    : field_key.replace('_', ' ').toUpperCase()
              }
              type={determine_input_field_type(field_key)}
              value={form_controller.values[field_key] || ''}
              onChange={form_controller.handleChange}
              onBlur={form_controller.handleBlur}
              placeholder={input_placeholder_settings || generate_placeholder_text(field_key)}
              variant="outlined"
              fullWidth
              className={input_field_styling}
              autoComplete={disable_auto_complete ? 'off' : 'on'}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#424242',
                  borderRadius: '8px',
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#424242',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              }}
              error={Boolean(form_controller.touched[field_key] && form_controller.errors[field_key])}
              helperText={
                form_controller.touched[field_key] && form_controller.errors[field_key]
                  ? String(form_controller.errors[field_key])
                  : ''
              }
            />
          </Grid>
        ))}
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 2,
          bgcolor: is_submit_button_loading ? theme.palette.action.disabledBackground : 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'white',
            color: theme.palette.primary.main,
          },
        }}
        className={button_styling || button_disabled_styling}
        disabled={is_submit_button_loading}
      >
        {is_submit_button_loading ? <CircularProgress size={24} color="inherit" /> : button_text}
      </Button>
    </Box>
  );
};

export default DynamicForm;
