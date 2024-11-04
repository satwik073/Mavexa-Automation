import React, { FC, useEffect, useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { LOGIN_SESSION } from '@/Pipe/Auth/auth';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProviderOptions, ThemeSchema } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { AuthFlowIdentifier, DataTypeFormIdentifier, RolesIdentifier, RoutesConfiguration } from '@/Constants/structure';
import { TENANT_AUTHENTICATION } from '@/Events/Success/PredefinedError';
import { useDispatch } from 'react-redux';
import { set_token } from '@/Store/authSlice';
import DynamicForm from '@/Forms/DynamicAtttributes/DynamicReducer';
import * as Yup from 'yup';
import { PRODUCTS_CONFIGURATIONS } from '@/Global/GlobalSiteNavigators/NavigationState/Constants';
import { LOGIN_CONFIG } from './Constants';
import { LGN_STY } from './Constants/layout';
import { MESSAGE_HANDLER_SONNER, MessageConfiguration } from '@/Events/SonnerMessageDispatch';
import { useTheme } from 'next-themes';
import CustomBox from '@/@types/Comp_BX';
import { makeStyles } from '@mui/styles';
const queryClient = new QueryClient();

interface ResponseData { Details?: string; }
export interface CredentialKeys { registered_user_email: string; registered_user_password: string; }


const useStyles = makeStyles((_theme: any) => ({
  container_values: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1.5rem',
    '@media (min-width: 768px)': { 
      flexDirection: 'row',
    },
  }
}));

const REQUEST_LOGIN_EXECUTION = async (payload: CredentialKeys) => {
  const loginRequestPayload = await LOGIN_SESSION(payload);
  return (await axios(loginRequestPayload)).data;
};

const UserAuthProviderComponent: FC = () => {
  const navigate = useNavigate(), { theme: runtimeTheme } = useTheme(), dispatch = useDispatch();
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL), [isLoading, setIsLoading] = useState(false);
  const classes =  useStyles()
  const defaultValues: CredentialKeys = { registered_user_email: '', registered_user_password: '' };
  const validationSchema = Yup.object({
    registered_user_email: Yup.string().email('Invalid email').required('Email is required'),
    registered_user_password: Yup.string().min(0, 'Password must be at least 6 characters').required('Password is required'),
  });

  useEffect(() => setLogoColor(runtimeTheme === ThemeProviderOptions.LIGHT_TH ? '' : ThemeSchema.BLK_CL), [runtimeTheme]);

  const mutation = useMutation({
    mutationFn: (userData: CredentialKeys) => REQUEST_LOGIN_EXECUTION(userData),
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      MESSAGE_HANDLER_SONNER("Success Notification", "You have been logged in successfully.", MessageConfiguration.SC_M);
      dispatch(set_token({ token: data.token, user_info: data.userInfo }));
      navigate(`/${RoutesConfiguration.AUTH.substring(1)}`);
      localStorage.setItem('User-Settings', data.token);
      localStorage.setItem('User-Verification', JSON.stringify(data.userInfo.is_user_verified ?? data.userInfo.verified));
      setIsLoading(false);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ResponseData>;
        const message = axiosError?.request?.response ? JSON.parse(axiosError.request.response).message : TENANT_AUTHENTICATION(RolesIdentifier.USER, AuthFlowIdentifier.SIGN_IN);
        MESSAGE_HANDLER_SONNER("Error Notification", message, MessageConfiguration.ERR_M);
      }
      setIsLoading(false);
    },
  });

  const handleToggleAuth = () => navigate(`${RoutesConfiguration.REGISTRATION}`);
  const handleSubmit = (values: CredentialKeys) => mutation.mutate(values);

  return (
    <CustomBox className={classes.container_values}>
      <CustomBox className='max-w-xl'>
        <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display />
        <DynamicForm
          formObjectData={defaultValues}
          validSchemaStructure={validationSchema}
          onFormSubmission={handleSubmit}
          isApiCalledLoading={isLoading}
          titleAttached={LOGIN_CONFIG.TITLE}
          titleStylingController={LGN_STY.TITLE}
          subtitleAttached={LOGIN_CONFIG.SUBTITLE}
          subtitleStylingController={LGN_STY.SUBTITLE}
          placeHoldersConfig={DataTypeFormIdentifier.EM_L ? 'Enter your email ' : 'Enter your password'}
          autoCompleteEnabled={false}
          googleAuthRequired
          appleAuthRequired
          spacingEnabled={4}
          paddingResponseController={2}
          forgetPasswordRequired
          forgetPasswordStyling={LGN_STY.FG_PASSCODE}
          buttonStyles={LGN_STY.BTN_STYLES}
          buttonContent={LOGIN_CONFIG.AUTH_BTN}
          authFlowIdentifier={AuthFlowIdentifier.SIGN_IN}
          authLinksEnabled
          onSwitchToDifferentAuthFlow={handleToggleAuth}
        />
      </CustomBox>
    </CustomBox>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserAuthProviderComponent />
    </QueryClientProvider>
  );
}
