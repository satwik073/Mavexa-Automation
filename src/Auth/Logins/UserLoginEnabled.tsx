import React, { FC } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { LOGIN_SESSION } from '@/Pipe/Auth/auth';
import { MESSAGE_HANDLER, MessageConfiguration } from '@/Events/MessageDispatch';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { AuthFlowIdentifier, RolesIdentifier, RoutesConfiguration } from '@/Constants/structure';
import { TENANT_AUTHENTICATION } from '@/Events/Success/PredefinedError';
import { useDispatch } from 'react-redux';
import { set_token } from '@/Store/authSlice';
import DynamicForm from '@/Forms/DynamicAtttributes/DynamicReducer';
import * as Yup from 'yup';

const queryClient = new QueryClient();

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

  const initialValues: LoginCredentialProps = {
    registered_user_email: '',
    registered_user_password: '',
  };

  const validationSchema = Yup.object({
    registered_user_email: Yup.string().email('Invalid email').required('Email is required'),
    registered_user_password: Yup.string().min(1, 'Password must be at least 6 characters').required('Password is required'),
  });

  const mutation = useMutation({
    mutationFn: (userData: LoginCredentialProps) => LOGIN_CALLER(userData),
    onSuccess: (data) => {
      MESSAGE_HANDLER(TENANT_AUTHENTICATION(RolesIdentifier.USER, AuthFlowIdentifier.SIGN_IN), MessageConfiguration.SC_M, {
        hideProgressBar: true,
        autoClose: 5000,
        position:'bottom-right',
        theme: ThemeProviderOptions.DARK_TH,
      });
     
      dispatch(set_token({
        token: data.token,
        user_info: data.userInfo,
      }));
      navigate(`/${RoutesConfiguration.AUTH.substring(1)}`);
      localStorage.setItem('User-Settings', data.token)
    },
    onError: () => {
      const errorMessage = 'Login Unsuccessful. User does not exist.';
      MESSAGE_HANDLER(errorMessage, MessageConfiguration.ERR_M, {
        hideProgressBar: true,
        autoClose: 1000,
        theme: ThemeProviderOptions.DARK_TH,
      });
    },
  });

  const handleSubmit = (values: LoginCredentialProps) => {
    mutation.mutate(values);
  };

  return (
    <React.Fragment>
      <h1>User Login</h1>
      <DynamicForm
        form_allocated_data={initialValues}
        schema_declaration={validationSchema}
        onSubmit={handleSubmit}
        
      />
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
