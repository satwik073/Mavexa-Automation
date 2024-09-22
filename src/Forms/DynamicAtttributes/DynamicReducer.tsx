import { TextField, Button, Box, Grid } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { DataTypeFormIdentifier } from '@/Constants/structure';

interface DynamicFormProps<T> {
  form_allocated_data: T;
  schema_declaration: Yup.ObjectSchema<any>;
  onSubmit: (values: T) => void;
  className?: string;
}

const getInputType = (key: string): string => {
  if (key.includes(DataTypeFormIdentifier.EM_L)) return DataTypeFormIdentifier.EM_L;
  if (key.includes(DataTypeFormIdentifier.PS_D)) return DataTypeFormIdentifier.PS_D;
  if (key.includes(DataTypeFormIdentifier.PHN)) return DataTypeFormIdentifier.TEL;
  return DataTypeFormIdentifier.TEXT;
};

const DynamicForm = <T extends Record<string, any>>({
  form_allocated_data,
  schema_declaration,
  onSubmit,
}: DynamicFormProps<T>) => {
  const form_controller = useFormik({
    initialValues: form_allocated_data,
    validationSchema: schema_declaration,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Box component="form" onSubmit={form_controller.handleSubmit} sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Grid container spacing={2}>
        {Object.keys(form_allocated_data).map((key_values) => (
          <Grid item xs={12} key={key_values}>
            <TextField
              id={key_values}
              name={key_values}
              label={
                key_values === 'registered_user_email'
                  ? 'Email'
                  : key_values === 'registered_user_password'
                  ? 'Password'
                  : key_values.replace('_', ' ').toUpperCase()
              }
              type={getInputType(key_values)}
              value={form_controller.values[key_values] || ''}
              onChange={form_controller.handleChange}
              onBlur={form_controller.handleBlur}
              variant="outlined"
              fullWidth
              error={Boolean(form_controller.touched[key_values] && form_controller.errors[key_values])}
              helperText={
                form_controller.touched[key_values] && form_controller.errors[key_values]
                  ? String(form_controller.errors[key_values])
                  : ''
              }
              InputProps={{
                sx: {
                  '& input': {
                    color: 'white',
                    backgroundColor: 'transparent',
                  },
                  '& input::placeholder': {
                    color: 'white',
                    opacity: 1,
                  },
                },
              }}
              className="dark:bg-gray-800 dark:text-white dark:placeholder:text-white"
            />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default DynamicForm;
