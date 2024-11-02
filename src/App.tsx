import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APP_CONFIG } from '.';
import { ROUTES_EXT } from './Constants/standard_routes';
import _ from 'lodash'
import 'react-toastify/dist/ReactToastify.css';
import { RoutesConfiguration } from './Constants/structure';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { updateAuthToken, updateUserVerified } from './Store/authSlice';
import { useTheme } from 'next-themes';
import { ThemeProviderOptions, ThemeSchema } from './Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { Toaster } from './Components/Images/External/UI/toaster';
import CustomBox from './@types/Comp_BX';
import ModalProvider from './providers/ModalValueProvider';



const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const TOKEN_SEL = useSelector((state: any) => state.auth.token_for_authnetication);
  const VERIFIED_SELECTOR = useSelector((state: any) =>
    state.auth?.user_info?.is_user_verified ?? JSON.parse(localStorage.getItem('User-Verification') || 'false')
  );
  const [loading, setLoading] = useState<boolean>(true);
  const PERSISTED_TOKEN = useMemo(() => localStorage.getItem('User-Token'), []);
  const PERSISTED_VERIFICATION = useMemo(() => localStorage.getItem('User-Verified'), []);
  const isUserAuthenticated = useMemo(() => !!localStorage.getItem('User-Settings') || !!TOKEN_SEL, [TOKEN_SEL]);
  const isUserVerified = useMemo(() => !!VERIFIED_SELECTOR || PERSISTED_VERIFICATION === 'true', [VERIFIED_SELECTOR, PERSISTED_VERIFICATION])
  const { theme } = useTheme();
  useEffect(() => {
    const isDefaultOrVerificationRoute =
      location.pathname === RoutesConfiguration?.VERIFICATION ||
      [RoutesConfiguration?.DEFAULT_PATH, ROUTES_EXT?.DEFAULT?.PATH, '/', RoutesConfiguration?.REGISTRATION, RoutesConfiguration?.LOGIN].includes(location.pathname);

    if (isUserAuthenticated && isUserVerified && isDefaultOrVerificationRoute) {
      navigate(RoutesConfiguration?.AUTH || ROUTES_EXT?.AUTH_FLOW?.ATM || RoutesConfiguration?.CLIENTS, { replace: true });
    }
    else if (isUserAuthenticated && !isUserVerified && location.pathname !== RoutesConfiguration.VERIFICATION) {
      navigate(RoutesConfiguration.VERIFICATION, { replace: true });
    }
    else if (!isUserAuthenticated && ![RoutesConfiguration.DEFAULT_PATH, ROUTES_EXT.DEFAULT.PATH, '/', RoutesConfiguration.REGISTRATION, RoutesConfiguration.CLIENTS, RoutesConfiguration.RESOURCES, RoutesConfiguration.DOCUMENTATION, RoutesConfiguration.PRICING, RoutesConfiguration.LOGIN, RoutesConfiguration.ENTERPRISE, RoutesConfiguration.PRODUCTS].includes(location.pathname)) {
      navigate(RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH, { replace: true });
    }
  }, [isUserAuthenticated, isUserVerified, location.pathname, navigate]);

  const createRouteConfig = (routeKey: any, configKey: any, altKey?: any) => ({
    path: _.get(RoutesConfiguration, routeKey) || _.get(window, altKey),
    element: _.get(APP_CONFIG, configKey),
  });

  const routeDefinitions = [
    createRouteConfig('VERIFICATION', 'OTP_TQ'),
    createRouteConfig('PRODUCTS', 'PR_S', 'ROUTES_EXT.FEAT_CONFIG.PRD'),
    createRouteConfig('REGISTRATION', 'RG_S'),
    createRouteConfig('DASHBOARD', 'DSH'),
    createRouteConfig('PRICING', 'PR_C'),
    createRouteConfig('CLIENTS', 'CL_N'),
    createRouteConfig('DOCUMENTATION', 'DOC_TN'),
    createRouteConfig('RESOURCES', 'RC_S'),
  ];

  useEffect(() => {
    const handleTokenSync = () => {
      if (typeof PERSISTED_TOKEN === 'string' && !TOKEN_SEL) {
        dispatch(updateAuthToken(PERSISTED_TOKEN));
      }
    };

    const handleVerificationSync = () => {
      if (PERSISTED_VERIFICATION === 'true' && !VERIFIED_SELECTOR) {
        dispatch(updateUserVerified(true));
      } else if (PERSISTED_VERIFICATION === 'false' && !VERIFIED_SELECTOR) {
        dispatch(updateUserVerified(false));
      }
    };

    const conditionalExecution = async () => {
      await Promise.all([handleTokenSync(), handleVerificationSync()]);
      console.log('State synchronized successfully');
    };

    if (PERSISTED_TOKEN !== TOKEN_SEL || PERSISTED_VERIFICATION !== VERIFIED_SELECTOR) {
      conditionalExecution();
    }

    setLoading(false);
  }, [dispatch, PERSISTED_TOKEN, PERSISTED_VERIFICATION, TOKEN_SEL, VERIFIED_SELECTOR]);



  return loading ? (
    <CustomBox className="w-full h-screen flex items-center justify-center">
      <CircularProgress size={54} sx={{ color: theme === ThemeProviderOptions.LIGHT_TH ? ThemeSchema.BLK_CL : ThemeSchema.WHT_CL }} />
    </CustomBox>
  ) : (
    <Routes>
      <Route path={RoutesConfiguration.LOGIN} element={<APP_CONFIG.LG_AUTH />} />
      <Route
        path={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH}
        element={<APP_CONFIG.MOD_T />}
      />
      <Route
        path={RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM}
        element={
          isUserAuthenticated && isUserVerified ? (
            <APP_CONFIG.MOD_T />
          ) : isUserAuthenticated && !isUserVerified ? (
            <Navigate to={RoutesConfiguration.VERIFICATION} />
          ) : (
            <Navigate to={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH} />
          )
        }
      />
      {_.map(routeDefinitions, ({ path, element }, index) =>
        path && element ? (
          <Route key={index} path={path} Component={element} />
        ) : null
      )}

      <Route path="*" element={<Navigate to={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH} />} />
    </Routes>
  );
};

function App() {
  return (
    <div>
        <ModalProvider>
      <Router>
          <AppRoutes />
        {/* //TODO */}
        {/* <div className='fixed bottom-0 right-0 -mb-40 z-50 mr-4'>
        <FloatingDockDemo />
        </div> */}
      </Router>
        </ModalProvider>
      <ToastContainer />
      <Toaster />
    </div>

  );
}

export default App;
