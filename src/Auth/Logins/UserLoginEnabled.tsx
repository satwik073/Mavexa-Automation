import React, { FC, useState } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { LOGIN_SESSION } from '@/Pipe/Auth/auth';
import { MESSAGE_HANDLER, MessageConfiguration } from '@/Events/MessageDispatch';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { AuthFlowIdentifier, DataTypeFormIdentifier, RolesIdentifier, RoutesConfiguration } from '@/Constants/structure';
import { TENANT_AUTHENTICATION } from '@/Events/Success/PredefinedError';
import { useDispatch } from 'react-redux';
import { set_token } from '@/Store/authSlice';
import DynamicForm from '@/Forms/DynamicAtttributes/DynamicReducer';
import * as Yup from 'yup';

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
  const dispatch = useDispatch();
  const [is_loading, set_is_loading] = useState(false);

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
      <h1>Login</h1>
      <div className='w-full flex'>
        <div className='w-1/2'>
          <DynamicForm
            allocated_form_data={initialValues}
            validation_schema_declaration={validationSchema}
            on_form_submit={handleSubmit}
            is_submit_button_loading={is_loading}
            form_title='Login'
            form_description='Get started'
            form_title_styling_configuration='text-white text-4xl'
            input_placeholder_settings={ DataTypeFormIdentifier.EM_L ? 'Enter your email ' : ' Enter your pword'}
            disable_auto_complete ={false}
          />
        </div>
        <div className='w-1/2 bg-white h-full'>
        <h1 className='text-7xl'>hi</h1></div>
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
