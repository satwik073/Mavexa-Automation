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
import { useNavigate } from 'react-router-dom';
import { LGN_STY } from '@/Auth/AuthTokenHandler/Constants/layout';

interface DynamicFormAttributes<T> {
  titleAttached?: string,
  titleStylingController?: string,
  subtitleAttached?: string,
  subtitleStylingController?: string,
  formObjectData: T,
  spacingEnabled?: number,
  areaCoverage?: number,
  validSchemaStructure: Yup.ObjectSchema<any>,
  onFormSubmission: (form_values: T) => void;
  placeHoldersConfig?: string,
  isApiCalledLoading?: boolean,
  gridContainerConfig?: number,
  paddingResponseController?: number,
  labelsAttached?: boolean,
  gridAlignments?: 'center' | 'flex-start' | 'flex-end',
  autoCompleteEnabled?: boolean,
  textFieldStyles?: Record<string, any>;
  textFieldStyleOverrides?: Record<string, Record<string, any>>;
  buttonStyles?: string;
  buttonDisabledStyles?: Record<string, any>;
  googleAuthRequired?: boolean,
  appleAuthRequired?: boolean,
  isDividerRequired?: boolean,
  buttonContent: string,
  forgetPasswordRequired?: boolean,
  forgetPasswordStyling?: string,
  authFlowIdentifier?: AuthFlowIdentifier,
  authLinksEnabled?: boolean,
  onSwitchToDifferentAuthFlow?: () => void,
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
    case 'registered_username':
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
  titleAttached,
  titleStylingController,
  subtitleAttached,
  subtitleStylingController,
  formObjectData,
  areaCoverage,
  spacingEnabled,
  validSchemaStructure,
  onFormSubmission,
  isApiCalledLoading,
  gridContainerConfig,
  gridAlignments,
  autoCompleteEnabled,
  textFieldStyles,
  textFieldStyleOverrides,
  buttonContent,
  buttonStyles,
  buttonDisabledStyles,
  googleAuthRequired,
  appleAuthRequired,
  forgetPasswordRequired,
  forgetPasswordStyling,
  authFlowIdentifier,
  authLinksEnabled,
  onSwitchToDifferentAuthFlow,
  switchAuthFlowStyling

}: DynamicFormAttributes<T>) => {
  const form_controller = useFormik({
    initialValues: formObjectData,
    validationSchema: validSchemaStructure,
    onSubmit: (form_values) => {
      onFormSubmission(form_values);
    },
  });

  const { theme: nextTheme } = useTheme();
  const isDarkMode = nextTheme === ThemeProviderOptions.DARK_TH;
  const navigate = useNavigate()
  return (
    <Box
      component="form"
      onSubmit={form_controller.handleSubmit}
      sx={{
        width: '100%',
        maxWidth: areaCoverage,
        mx: 'auto',
        p: { xs: spacingEnabled, md: spacingEnabled },

      }}
    >
      <div className={titleStylingController}>
        {titleAttached}
      </div>
      <div className={subtitleStylingController}>
        {subtitleAttached}
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

      <Grid container spacing={gridContainerConfig} justifyContent={gridAlignments}>
        {Object.keys(formObjectData).map((field_key) => (
          <Grid item xs={12} key={field_key} sx={{ mb: 1 }}>
            <TextField
              id={field_key}
              name={field_key}
              label={
                field_key === 'registered_user_email'
                  ? 'Email ID'
                  : field_key === 'registered_user_password'
                    ? 'Password'
                    : field_key === 'registered_username' ?
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
              autoComplete={autoCompleteEnabled ? 'off' : 'on'}
              sx={{
                bgcolor: isDarkMode ? '#353839' : '#f9f9f9',
                borderRadius: '8px',
                border: `1px solid transparent`,
                '& fieldset': {
                  borderColor: isDarkMode ? '#424242' : '#e0e0e0',
                  paddingTop: '12px'
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
                  fontSize: '15px',

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
          <div className={`absolute right-0 flex ${forgetPasswordStyling}`}>
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
          color: isDarkMode ? '#000000' : '#ffffff',
          '&:hover': {
            bgcolor: isDarkMode ? '#ffffff' : '#000000',
            color: isDarkMode ? '#000000' : '#ffffff',
          },
          '&:focus': {
            border: `1px solid #10B981`,
            color: '#10B981',
          },
          buttonStyles,
          ...(isApiCalledLoading && buttonDisabledStyles),
        }}
        disabled={isApiCalledLoading}
      >
        {isApiCalledLoading ? <CircularProgress size={24} color="inherit" /> : `${buttonContent}`}
      </Button>
      {authLinksEnabled && (
        <div className={`mt-4 text-center ${switchAuthFlowStyling}`}>
          {authFlowIdentifier === AuthFlowIdentifier.SIGN_IN ? (
            <div>
              <span className='text-[13px] mx-1'>Don't have an account?</span>
              <span
                className={LGN_STY.FG_PASSCODE}
                onClick={() => navigate('/register', {
                  replace: true,
                })}
              >
                Register
              </span>
            </div>
          ) : (
            <div >
              <span className='text-[13px] mx-1'>Already have an account?</span>
              <span
                className={LGN_STY.FG_PASSCODE}
                onClick={() => navigate('/', {
                  replace: true,
                })}
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
