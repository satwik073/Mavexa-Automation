import React, { FC, useEffect, useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { LOGIN_SESSION } from '@/Pipe/Auth/auth';
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
import { useTheme as useMUITheme } from '@mui/material';
import { colorMixGenerator, REUSABLE_CONFIG } from '@/Constants/globalStyles';
import { useTheme } from 'next-themes'
import ThemeSwitcher from '@/Hooks/useThemeSwitcher';
import { displaying_buttons } from '@/Constants/DataObjects';
import { TCSS_CLASSES } from '@/Pages/SpotLightCombined/Constant/layout_controlling';
import ImageContainer from '@/Components/Images/ImageContainer';
import Image from "../../../public/p1.png"
import { InfiniteMovingCards } from '@/Animations/MovingCardsGlobalState';
import { clients } from '@/lib/constants';
const queryClient = new QueryClient();

interface ErrorResponse {
  Details?: string;
}
interface LoginCredentialProps {
  registered_user_email: string;
  registered_user_password: string;
}



const LOGIN_CALLER = async (payload: LoginCredentialProps) => {
  const login_request_generated = await LOGIN_SESSION(payload);
  const response_handler = await axios(login_request_generated);
  return response_handler.data;
};

const UserLoginEnabled: FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);
  const imageContainerProps = {
    src: logoColor ? "../../../public/darkLogin.png" : "../../../public/lightLogin.png",
    width: 1000,
    height: 1000,
    alt: "SaaSy Logo",
    className: "shadow-sm",
  };
  useEffect(() => {
    const isLightTheme = theme === 'light';
    setLogoColor(isLightTheme ? '' : ThemeSchema.BLK_CL);
  }, [theme]);
  const dispatch = useDispatch();
  const [is_loading, set_is_loading] = useState(false);
  const themeDefined = useMUITheme()
  const palette = colorMixGenerator(themeDefined.palette.mode)
  const initialValues: LoginCredentialProps = {
    registered_user_email: '',
    registered_user_password: '',
  };

  const validationSchema = Yup.object({
    registered_user_email: Yup.string().email('Invalid email').required('Email is required'),
    registered_user_password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const mutation = useMutation({
    mutationFn: (userData: LoginCredentialProps) => LOGIN_CALLER(userData),
    onMutate: () => {
      set_is_loading(true);
    },
    onSuccess: (data) => {
      MESSAGE_HANDLER(TENANT_AUTHENTICATION(RolesIdentifier.USER, AuthFlowIdentifier.SIGN_IN), MessageConfiguration.SC_M, {
        hideProgressBar: true,
        autoClose: 5000,
        position: 'bottom-right',
        theme: ThemeProviderOptions.DARK_TH,
      });
      dispatch(set_token({
        token: data.token,
        user_info: data.userInfo,
      }));
      navigate(`/${RoutesConfiguration.AUTH.substring(1)}`);
      localStorage.setItem('User-Settings', data.token);
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
          theme: ThemeProviderOptions.DARK_TH,
        });
      }
      set_is_loading(false);
    }

  });

  const handleSubmit = (values: LoginCredentialProps) => {
    mutation.mutate(values);
  };

  return (
    <React.Fragment>
      <ThemeSwitcher/>
      <div className='w-full md:flex h-full md:p-20  items-center justify-center'>
        <div className='md:w-1/2'>
          <DynamicForm
            allocated_form_data={initialValues}
            validation_schema_declaration={validationSchema}
            on_form_submit={handleSubmit}
            is_submit_button_loading={is_loading}
            form_title='Login into your Account'
            titleStylingController='text-4xl md:text-5xl my-2 font-bold bg-clip-text text-black dark:text-white
    bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'
            form_description='Please enter your credentials to login into your account.'
            descriptionStylingController={`relative text-md text-zinc-500 
    dark:text-zinc-300 tracking-wide mb-8 text-left
    max-w-2xl antialiased leading-loose`}
            input_placeholder_settings={DataTypeFormIdentifier.EM_L ? 'Enter your email ' : ' Enter your pword'}
            disable_auto_complete={false}
            googleAuthRequired
            appleAuthRequired
            buttonStyles={`${TCSS_CLASSES.browseComponentFlexed} capitalize  my-7`}
            buttonContent={displaying_buttons['sign_in']}
          />
        </div>
        <div className='md:w-1/2  bg-gradient-to-b from-black via-black via-black via-black to-[#10B981] h-screen'>
  <div className='p-6 text-center'>
    <div className='text-4xl md:text-5xl my-2 font-bold bg-clip-text text-white dark:text-black
    bg-opacity-50'>The Simplest way to manage your workplace</div>
    <ImageContainer {...imageContainerProps} className='flex  my-[8rem] justify-center items-center mb-4' />
    <InfiniteMovingCards className='mt-[6rem]' items={clients}/>
  </div>
</div>

     
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
