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
import TitleDescriptionBlock from '@/@molecules/Content/TitleDescriptionBlock';
import { useTheme } from 'next-themes';
const queryClient = new QueryClient();

interface ErrorResponse {
  Details?: string;
}
export interface LoginCredentialProps {
  registered_user_email: string;
  registered_user_password: string;
}


const LOGIN_CALLER = async (payload: LoginCredentialProps) => {
  console.time('RegistrationCallerExecutionTime'); 
  const login_request_generated = await LOGIN_SESSION(payload);
  const response_handler = await axios(login_request_generated);
  console.timeEnd('RegistrationCallerExecutionTime'); 

  return response_handler.data;
};

const UserLoginEnabled: FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);

  useEffect(() => {
    const isLightTheme = theme === ThemeProviderOptions.LIGHT_TH
    setLogoColor(isLightTheme ? '' : ThemeSchema.BLK_CL);
  }, [theme]);
  const dispatch = useDispatch();
  const [is_loading, set_is_loading] = useState(false);
  const initialValues: LoginCredentialProps = {
    registered_user_email: '',
    registered_user_password: '',
  };

  const validationSchema = Yup.object({
    registered_user_email: Yup.string().email('Invalid email').required('Email is required'),
    registered_user_password: Yup.string().min(0, 'Password must be at least 6 characters').required('Password is required'),
  });

  const mutation = useMutation({
    mutationFn: (userData: LoginCredentialProps) => LOGIN_CALLER(userData),
    onMutate: () => {
      set_is_loading(true);
    },
    onSuccess: (data) => {
      MESSAGE_HANDLER_SONNER(
        "Success Notification", 
        "You have been logged in successfully.", 
        MessageConfiguration.SC_M
    );
      dispatch(
        set_token({
          token: data.token,
          user_info: data.userInfo,
        })
      );
      navigate(`/${RoutesConfiguration.AUTH.substring(1)}`);
      localStorage.setItem('User-Settings', data.token);
      const settingVerificationDynamic = ( JSON.stringify(data.userInfo.is_user_verified) === undefined ) ? JSON.stringify(data.userInfo.verified) : JSON.stringify(data.userInfo.is_user_verified)
      localStorage.setItem('User-Verification', settingVerificationDynamic);
      console.log(localStorage.getItem('User-Verification'))
      set_is_loading(false);
    },

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const axios_detail = axiosError.response?.data?.Details;
        const message_captured: string = (axios_detail) ? `Login Unsuccessful` : TENANT_AUTHENTICATION(RolesIdentifier.USER, AuthFlowIdentifier.SIGN_IN)
        MESSAGE_HANDLER_SONNER("Error Notification", message_captured, MessageConfiguration.ERR_M);
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
//todo
  return (
    <React.Fragment>
      {/* <ThemeSwitcher /> */}
      <div className='flex flex-col md:flex-row h-screen items-center justify-center w-full lg:p-6'>
        <div className='max-w-xl'>
          <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display />
          <DynamicForm
            formObjectData={initialValues}
            validSchemaStructure={validationSchema}
            onFormSubmission={handleSubmit}
            isApiCalledLoading={is_loading}
            titleAttached={LOGIN_CONFIG.TITLE}
            titleStylingController={LGN_STY.TITLE}
            subtitleAttached={LOGIN_CONFIG.SUBTITLE}
            subtitleStylingController={LGN_STY.SUBTITLE}
            placeHoldersConfig={DataTypeFormIdentifier.EM_L ? 'Enter your email ' : ' Enter your password'}
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
            onSwitchToDifferentAuthFlow={handle_toggle_auth_controller}

          />
        </div>
        {/* <div className="lg:w-2/3 md:w-1/2 w-full bg-gradient-to-b from-black via-black via-black via-black to-[#10B981] flex flex-col justify-center">
          <div className="p-6 lg:p-10 text-center md:text-left ">
            <div className="text-4xl lg:text-4xl font-bold text-white md:max-w-lg bg-opacity-50 bg-clip-text mb-6 lg:mb-10">
              The Simplest way to manage your workplace
            </div>
            <div className="flex justify-center items-center mb-4">
              <ImageContainer {...imageContainerProps} />
            </div>
            <InfiniteMovingCards className="mt-[6rem]" items={clients} />
          </div>
        </div> */}



      </div>
    </React.Fragment>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserLoginEnabled />
    </QueryClientProvider>
  );
}
