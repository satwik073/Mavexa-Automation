import React, { FC, useEffect, useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { REGISTER_SESSION } from '@/Pipe/Auth/auth';
import { MESSAGE_HANDLER, MessageConfiguration } from '@/Events/MessageDispatch';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProviderOptions, ThemeSchema } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { AuthFlowIdentifier, DataTypeFormIdentifier, RolesIdentifier, RoutesConfiguration } from '@/Constants/structure';
import { TENANT_AUTHENTICATION } from '@/Events/Success/PredefinedError';
import { useDispatch } from 'react-redux';
import { set_token } from '@/Store/authSlice';
import DynamicForm from '@/Forms/DynamicAtttributes/DynamicReducer';
import * as Yup from 'yup';
import { Box, useMediaQuery, useTheme as useMUITheme } from '@mui/material';
import { useTheme } from 'next-themes'
import ImageContainer from '@/Components/Images/ImageContainer';
import { InfiniteMovingCards } from '@/Animations/MovingCardsGlobalState';
import { clients } from '@/lib/constants';
import { PRODUCTS_CONFIGURATIONS } from '@/Global/GlobalSiteNavigators/NavigationState/Constants';
import { LOGIN_CONFIG } from '../Logins/Constants/index_controller';
import { LGN_STY } from '../Logins/Constants/layout_controller';
const queryClient = new QueryClient();

interface ErrorResponse {
  Details?: string;
}
export interface LoginCredentialProps {
  registered_username: string,
  registered_user_email: string;
  registered_user_password: string;
}

const REGISTRATION_CALLER = async (payload: LoginCredentialProps) => {
  console.time('RegistrationCallerExecutionTime'); 
  const login_request_generated = await REGISTER_SESSION(payload);
  const response_handler = await axios(login_request_generated);
  console.timeEnd('RegistrationCallerExecutionTime'); 
  return response_handler.data;
};

const UserRegistrationEnabled: FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const muiTheme = useMUITheme()
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);
  const is_small_screen = useMediaQuery(muiTheme.breakpoints.down('sm'))
  const imageContainerProps = {
    src: logoColor ? "/darkLogin.png" : "/lightLogin.png",
    width: 1000,
    height: 1000,
    alt: "SaaSy Logo",
    className: "shadow-sm",
  };
  useEffect(() => {
    const isLightTheme = theme === ThemeProviderOptions.LIGHT_TH
    setLogoColor(isLightTheme ? '' : ThemeSchema.BLK_CL);
  }, [theme]);
  const dispatch = useDispatch();
  const [is_loading, set_is_loading] = useState(false);
  const initialValues: LoginCredentialProps = {
    registered_username : '',
    registered_user_email: '',
    registered_user_password: '',
  };

  const validationSchema = Yup.object({
    registered_user_email: Yup.string().email('Invalid email').required('Email is required'),
    registered_user_password: Yup.string().min(0, 'Password must be at least 6 characters').required('Password is required'),
  });

  const mutation = useMutation({
    mutationFn: (userData: LoginCredentialProps) => REGISTRATION_CALLER(userData),
    onMutate: () => {
      set_is_loading(true);
    },
    onSuccess: (data) => {
      MESSAGE_HANDLER(TENANT_AUTHENTICATION(RolesIdentifier.USER, AuthFlowIdentifier.SIGN_IN), MessageConfiguration.SC_M, {
        hideProgressBar: true,
        autoClose: 5000,
        position: is_small_screen ? 'top-right' : 'bottom-right',
        theme: logoColor ? ThemeProviderOptions.DARK_TH : ThemeProviderOptions.LIGHT_TH,
      });
      dispatch(
        set_token({
          token: data.token,
          user_info: data.userInfo,
        })
      );

      navigate(`/${RoutesConfiguration.AUTH.substring(1)}`);
      localStorage.setItem('User-Settings', data.token);
      localStorage.setItem('User-Verification', JSON.stringify(data.userInfo.is_user_verified));
      console.log(localStorage.getItem('User-Verification'))
      set_is_loading(false);
    },

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const axios_detail = axiosError.response?.data?.Details;
        const message_captured: string = (axios_detail) ? `Login Unsuccessful` : TENANT_AUTHENTICATION(RolesIdentifier.USER, AuthFlowIdentifier.SIGN_IN)
        MESSAGE_HANDLER(message_captured, MessageConfiguration.ERR_M, {
          hideProgressBar: true,
          autoClose: 1000,
          position: is_small_screen ? 'top-right' : 'bottom-right',
          theme: logoColor ? ThemeProviderOptions.DARK_TH : ThemeProviderOptions.LIGHT_TH,
        });
      }
      set_is_loading(false);
    }

  });
  const handle_toggle_auth_controller = () => {
    navigate(`${RoutesConfiguration.REGISTRATION}`)
  }
  const handleSubmit = (values: LoginCredentialProps) => {
    mutation.mutate(values);
  };

  return (
    <React.Fragment>
      <Box className='flex flex-col md:flex-row items-center justify-between w-full lg:p-6'>
        <Box className=' md:w-1/2 w-full'>
          <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display />
          <DynamicForm
            formObjectData={initialValues}
            validSchemaStructure={validationSchema}
            onFormSubmission={handleSubmit}
            isApiCalledLoading={is_loading}
            titleAttached={LOGIN_CONFIG.REG_TITLE}
            titleStylingController={LGN_STY.TITLE}
            subtitleAttached={LOGIN_CONFIG.REG_SUBTITLE}
            subtitleStylingController={LGN_STY.SUBTITLE}
            placeHoldersConfig={DataTypeFormIdentifier.EM_L ? DataTypeFormIdentifier.EM_L : DataTypeFormIdentifier.PS_D}
            autoCompleteEnabled={false}
            googleAuthRequired
            appleAuthRequired
            spacingEnabled={4}
            paddingResponseController={2}
            buttonStyles={LGN_STY.BTN_STYLES}
            buttonContent={LOGIN_CONFIG.RED_AUTH}
            authFlowIdentifier={AuthFlowIdentifier.REGISTER_VAR}
            authLinksEnabled
            onSwitchToDifferentAuthFlow={handle_toggle_auth_controller}

          />
        </Box>
        <Box className="lg:w-2/3 md:w-1/2 w-full bg-gradient-to-b from-black via-black via-black via-black to-[#10B981] flex flex-col justify-center">
          <Box className="p-6 lg:p-10 text-center md:text-left ">
            <Box className="text-4xl lg:text-4xl font-bold text-white md:max-w-lg bg-opacity-50 bg-clip-text mb-6 lg:mb-10">
              The Simplest way to manage your workplace
            </Box>
            <Box className="flex justify-center items-center mb-4">
              <ImageContainer {...imageContainerProps} />
            </Box>
            <InfiniteMovingCards className="mt-[6rem]" items={clients} />
          </Box>
        </Box>



      </Box>
    </React.Fragment>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserRegistrationEnabled/>
    </QueryClientProvider>
  );
}
