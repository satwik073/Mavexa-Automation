import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APP_CONFIG } from '.';
import { ROUTES_EXT } from './Constants/standard_routes';
import 'react-toastify/dist/ReactToastify.css';
import { RoutesConfiguration } from './Constants/structure';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { updateAuthToken, updateUserVerified } from './Store/authSlice';
import { useTheme } from 'next-themes';
import { ThemeProviderOptions, ThemeSchema } from './Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { Toaster } from './Components/Images/External/UI/toaster';

interface ValidRoutesConfiguration {
  path: string;
}

const IncludedRoutesSettings: ValidRoutesConfiguration[] = [
  { path: RoutesConfiguration.AUTH },
  { path: RoutesConfiguration.DEFAULT_PATH }
];


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
      location.pathname === RoutesConfiguration.VERIFICATION ||
      [RoutesConfiguration.DEFAULT_PATH, ROUTES_EXT.DEFAULT.PATH, '/', RoutesConfiguration.REGISTRATION, RoutesConfiguration.LOGIN].includes(location.pathname);

    if (isUserAuthenticated && isUserVerified && isDefaultOrVerificationRoute) {
      navigate(RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM || RoutesConfiguration.CLIENTS, { replace: true });
    }
    else if (isUserAuthenticated && !isUserVerified && location.pathname !== RoutesConfiguration.VERIFICATION) {
      navigate(RoutesConfiguration.VERIFICATION, { replace: true });
    }
    else if (!isUserAuthenticated && ![RoutesConfiguration.DEFAULT_PATH, ROUTES_EXT.DEFAULT.PATH, '/', RoutesConfiguration.REGISTRATION, RoutesConfiguration.CLIENTS, RoutesConfiguration.RESOURCES, RoutesConfiguration.DOCUMENTATION, RoutesConfiguration.PRICING, RoutesConfiguration.LOGIN, RoutesConfiguration.ENTERPRISE, RoutesConfiguration.PRODUCTS].includes(location.pathname)) {
      navigate(RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH , { replace: true });
    }
  }, [isUserAuthenticated, isUserVerified, location.pathname, navigate]);



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
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress size={54} sx={{ color: theme === ThemeProviderOptions.LIGHT_TH ? ThemeSchema.BLK_CL : ThemeSchema.WHT_CL }} />
    </div>
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
      <Route path={RoutesConfiguration.VERIFICATION} element={<APP_CONFIG.OTP_TQ />} />
      <Route
        path={RoutesConfiguration.PRODUCTS || ROUTES_EXT.FEAT_CONFIG.PRD}
        element={<APP_CONFIG.PR_S />}
      />

      <Route
        path={RoutesConfiguration.REGISTRATION}
        element={<APP_CONFIG.RG_S />}
      />
      <Route
        path={RoutesConfiguration.DASHBOARD}
        element={<APP_CONFIG.DSH />}
      />
      <Route
        path={RoutesConfiguration.PRICING}
        element={<APP_CONFIG.PR_C />}
      />
      <Route
        path={RoutesConfiguration.CLIENTS}
        element={<APP_CONFIG.CL_N />}
      />
      <Route
        path={RoutesConfiguration.DOCUMENTATION}
        element={<APP_CONFIG.DOC_TN />}
      />
      <Route
        path={RoutesConfiguration.RESOURCES}
        element={<APP_CONFIG.RC_S />}
      />
      <Route path="*" element={<Navigate to={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH} />} />
    </Routes>
  );
};

function App() {
  return (
    <div>
    <Router>
      <AppRoutes />
      {/* //TODO */}
      {/* <div className='fixed bottom-0 right-0 -mb-40 z-50 mr-4'>
        <FloatingDockDemo />
      </div> */}
    </Router>
    <ToastContainer />
    <Toaster />
  </div>
  
  );
}

export default App;
