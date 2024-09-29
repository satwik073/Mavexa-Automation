import { TextField, Button, Box, Grid, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthFlowIdentifier, DataTypeFormIdentifier } from '@/Constants/structure';
import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { useTheme } from 'next-themes';
import { displaying_buttons } from '@/Constants/DataObjects';
import { TCSS_CLASSES } from '@/Pages/SpotLightCombined/Constant/layout_controlling';
import { Button as UIButton } from '@/Components/Images/External/UI/button';
import { AppleAuthenticationSvgDark, AppleAuthenticationSvgLight, GooogleAuthenticationSvg } from '@/assets';
import ImageContainer from '@/Components/Images/ImageContainer';
interface DynamicFormAttributes<T> {
  form_title?: string;
  form_description?: string;
  allocated_form_data: T;
  validation_schema_declaration: Yup.ObjectSchema<any>;
  on_form_submit: (form_values: T) => void;
  input_placeholder_settings?: string;
  is_submit_button_loading?: boolean;
  form_max_width?: number;
  titleStylingController?: string,
  descriptionStylingController?: string,
  grid_spacing_configuration?: number;
  form_padding_configuration?: number;
  show_labels?: boolean;
  container_grid_alignment?: 'center' | 'flex-start' | 'flex-end';
  form_background_color?: string;
  disable_auto_complete?: boolean;
  textFieldStyles?: Record<string, any>;
  textFieldStyleOverrides?: Record<string, Record<string, any>>;
  buttonStyles?: string;
  buttonDisabledStyles?: Record<string, any>;
  googleAuthRequired?: boolean,
  appleAuthRequired?: boolean,
  isDividerRequired?: boolean,
  buttonContent: string,
  forgetPasswordRequired?: boolean,
  ForgetPasswordStyling?: string,
  auth_flow_type?: AuthFlowIdentifier;
  show_auth_links?: boolean;
  on_switch_to_other_auth_flow?: () => void; 
  switchAuthFlowStyling?: string;
}

const determine_input_field_type = (field_key: string): string => {
  if (field_key.includes(DataTypeFormIdentifier.EM_L)) return DataTypeFormIdentifier.EM_L;
  if (field_key.includes(DataTypeFormIdentifier.PS_D)) return DataTypeFormIdentifier.PS_D;
  if (field_key.includes(DataTypeFormIdentifier.PHN)) return DataTypeFormIdentifier.TEL;
  return DataTypeFormIdentifier.TEXT;
};

const generate_placeholder_text = (field_key: string): string => {
  switch (field_key) {
    case 'registered_userName':
      return 'Enter your username';
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
  is_submit_button_loading = false,
  form_max_width = 600,
  grid_spacing_configuration = 3,
  form_padding_configuration = 4,
  show_labels = true,
  ForgetPasswordStyling,
  container_grid_alignment = 'flex-start',
  form_background_color = '#fff',
  forgetPasswordRequired = false,
  disable_auto_complete = false,
  textFieldStyles,
  textFieldStyleOverrides,
  buttonStyles,
  buttonDisabledStyles,
  titleStylingController,
  descriptionStylingController,
  googleAuthRequired,
  appleAuthRequired,
  buttonContent,
  auth_flow_type = AuthFlowIdentifier.SIGN_IN, 
  show_auth_links = false,
  on_switch_to_other_auth_flow,
  switchAuthFlowStyling,
}: DynamicFormAttributes<T>) => {
  const form_controller = useFormik({
    initialValues: allocated_form_data,
    validationSchema: validation_schema_declaration,
    onSubmit: (form_values) => {
      on_form_submit(form_values);
    },
  });

  const { theme: nextTheme } = useTheme();
  const isDarkMode = nextTheme === ThemeProviderOptions.DARK_TH;

  return (
    <Box
      component="form"
      onSubmit={form_controller.handleSubmit}
      sx={{
        width: '100%',
        maxWidth: form_max_width,
        mx: 'auto',
        p: { xs: form_padding_configuration, md: form_padding_configuration },

      }}
    >
      <div className={titleStylingController}>
        {form_title}
      </div>
      <div className={descriptionStylingController}>
        {form_description}
      </div>
      <div>
      </div>
      {(googleAuthRequired || appleAuthRequired) ? (
        <Grid className={`${TCSS_CLASSES.buttonsParentGridIssues} w-full my-8`}>
          {googleAuthRequired && (
            <UIButton className={buttonStyles}>
              <div className="flex items-center lg:gap-4">
                {/* Google Icon */}
                <ImageContainer width={20} height={20} src={GooogleAuthenticationSvg} alt="Google Icon" />
                <span className="ml-2">{displaying_buttons['google_auth']}</span>
              </div>
            </UIButton>
          )}

          {appleAuthRequired && (
            <UIButton className={buttonStyles}>
              <div className="flex items-center lg:gap-4">
                <ImageContainer width={20} height={20} src={isDarkMode ? AppleAuthenticationSvgLight : AppleAuthenticationSvgDark} alt="Apple Icon" />
                <span className="ml-2">{displaying_buttons['apple_auth']}</span>
              </div>
            </UIButton>
          )}

        </Grid>
      ) : (
        <div></div>
      )}

      <Grid container spacing={grid_spacing_configuration} justifyContent={container_grid_alignment}>
        {Object.keys(allocated_form_data).map((field_key) => (
          <Grid item xs={12} key={field_key}>
            <TextField
              id={field_key}
              name={field_key}
              label={
                field_key === 'registered_user_email'
                  ? 'Email ID'
                  : field_key === 'registered_user_password'
                    ? 'Password'
                    : field_key === 'registered_userName' ?
                      'Username'
                      : field_key.replace('_', ' ').toUpperCase()
              }
              type={determine_input_field_type(field_key)}
              value={form_controller.values[field_key] || ''}
              onChange={form_controller.handleChange}
              onBlur={form_controller.handleBlur}
              placeholder={generate_placeholder_text(field_key)}
              variant="outlined"
              fullWidth
              autoComplete={disable_auto_complete ? 'off' : 'on'}
              sx={{
                bgcolor: isDarkMode ? '#353839' : '#f9f9f9',
                borderRadius: '8px',
                border: `1px solid transparent`,
                '& fieldset': {
                  borderColor: isDarkMode ? '#424242' : '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? '#ffffff' : '#000000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10B981',
                },
                '& .MuiInputLabel-root': {
                  color: isDarkMode ? '#ffffff' : '#000000',
                  fontSize: '12px',
                  '&.Mui-focused': {
                    color: '#10B981',
                    fontSize: '15px'
                  },
                },
                '& .MuiInputBase-input': {
                  height: '25px',
                  padding: '12px',
                  fontSize: '15px'
                },
                '& .MuiInputBase-input::placeholder': {
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 1,
                },
                '& .MuiInputBase-input::focus': {
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  opacity: 1,
                },
                ...textFieldStyles,
                ...textFieldStyleOverrides?.[field_key],
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
        <div className="relative w-full">
          {forgetPasswordRequired && (
            <div className={`absolute right-0 flex ${ForgetPasswordStyling}`}>
              <span className='cursor-pointer'>Forgot your password?</span>
              <span className='dark:text-white text-black'>&nbsp; Create new</span>
            </div>
          )}
        </div>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 2,
          marginTop: 8,
          border: `1px solid transparent`,
          backgroundColor: isDarkMode ? '#ffffff' : '#000000',
          color : isDarkMode ?  '#000000' : '#ffffff',
          '&:hover': {
            bgcolor: isDarkMode ? '#ffffff' : '#000000',
            color: isDarkMode ? '#000000' : '#ffffff',
          },
          '&:focus': {
            border: `1px solid #10B981`,
            color: '#10B981',
          },
          buttonStyles,
          ...(is_submit_button_loading && buttonDisabledStyles),
        }}
        disabled={is_submit_button_loading}
      >
        {is_submit_button_loading ? <CircularProgress size={24} color="inherit" /> : `${buttonContent}`}
      </Button>
      {show_auth_links && (
        <div className={`mt-4 text-center ${switchAuthFlowStyling}`}>
          {auth_flow_type === AuthFlowIdentifier.SIGN_IN ? (
            <div>
              <span>Don't have an account?</span>
              <span
                className="ml-1 text-green-600 cursor-pointer"
                onClick={on_switch_to_other_auth_flow}
              >
                Register
              </span>
            </div>
          ) : (
            <div>
              <span>Already have an account?</span>
              <span
                className="ml-1 text-green-600 cursor-pointer"
                onClick={on_switch_to_other_auth_flow}
              >
                Login
              </span>
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default DynamicForm;
