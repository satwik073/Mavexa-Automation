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
import Dashboard from './Network/Dashboard';
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
  const tokenSelector = useSelector((state: any) => state.auth.token_for_authnetication);
  const verifiedSelector = useSelector((state: any) => 
    state.auth?.user_info?.is_user_verified ?? JSON.parse(localStorage.getItem('User-Verification') || 'false')
  );  
  const [loading, setLoading] = useState<boolean>(true);
  const persistedToken = useMemo(() => localStorage.getItem('User-Token'), []);
  const persistedVerification = useMemo(() => localStorage.getItem('User-Verified'), []);
  const isUserAuthenticated = useMemo(() => !!localStorage.getItem('User-Settings') || !!tokenSelector, [tokenSelector]);
  const isUserVerified = useMemo(() => !!verifiedSelector || persistedVerification === 'true', [verifiedSelector, persistedVerification])
  const { theme } = useTheme();
  useEffect(() => {
    const isDefaultOrVerificationRoute =
      location.pathname === RoutesConfiguration.VERIFICATION ||
      [RoutesConfiguration.DEFAULT_PATH, ROUTES_EXT.DEFAULT.PATH, '/', RoutesConfiguration.REGISTRATION].includes(location.pathname);
  
    if (isUserAuthenticated && isUserVerified && isDefaultOrVerificationRoute) {
      navigate(RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM, { replace: true });
    } 
    else if (isUserAuthenticated && !isUserVerified && location.pathname !== RoutesConfiguration.VERIFICATION) {
      navigate(RoutesConfiguration.VERIFICATION, { replace: true });
    } 
    else if (!isUserAuthenticated && ![RoutesConfiguration.DEFAULT_PATH, ROUTES_EXT.DEFAULT.PATH, '/', RoutesConfiguration.REGISTRATION].includes(location.pathname)) {
      navigate(RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH, { replace: true });
    }
  }, [isUserAuthenticated, isUserVerified, location.pathname, navigate]);
  


  useEffect(() => {
    const handleTokenSync = () => {
      if (typeof persistedToken === 'string' && !tokenSelector) {
        dispatch(updateAuthToken(persistedToken));
      }
    };

    const handleVerificationSync = () => {
      if (persistedVerification === 'true' && !verifiedSelector) {
        dispatch(updateUserVerified(true));
      } else if (persistedVerification === 'false' && !verifiedSelector) {
        dispatch(updateUserVerified(false));
      }
    };

    const conditionalExecution = async () => {
      await Promise.all([handleTokenSync(), handleVerificationSync()]);
      console.log('State synchronized successfully');
    };

    if (persistedToken !== tokenSelector || persistedVerification !== verifiedSelector) {
      conditionalExecution();
    }

    setLoading(false);
  }, [dispatch, persistedToken, persistedVerification, tokenSelector, verifiedSelector]);



  return loading ? (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress size={54} sx={{ color: theme === ThemeProviderOptions.LIGHT_TH ? ThemeSchema.BLK_CL : ThemeSchema.WHT_CL }} />
    </div>
  ) : (
    <Routes>
      <Route
        path={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH}
        element={<APP_CONFIG.LG_AUTH />}
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
        element={<APP_CONFIG.RG_S/>}
      />
      <Route
        path={RoutesConfiguration.REGISTRATION}
        element={<APP_CONFIG.RG_S/>}
      />
      <Route
        path={RoutesConfiguration.DASHBOARD}
        element={<Dashboard/>}
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
      </Router>
      <ToastContainer />
      <Toaster/>
    </div>
  );
}

export default App;
