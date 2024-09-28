import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APP_CONFIG } from '.';
import { ROUTES_EXT } from './Constants/standard_routes';
import 'react-toastify/dist/ReactToastify.css';
import { RoutesConfiguration } from './Constants/structure';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token_captured = useSelector((state: any) => state.auth.token_for_authnetication);
  const is_user_verified = useSelector((state: any) => state.auth?.token_for_authnetication?.user_info?.is_user_verified);
  const [loading, setLoading] = useState(true);
  
  const isUserAuthenticated = () => !!localStorage.getItem('User-Settings') || !!token_captured;
  const isUserVerified = () => !!localStorage.getItem('User-Verification') && !!is_user_verified;

  useEffect(() => {
    setLoading(true);

    if (isUserAuthenticated()) {
      if (!isUserVerified() && location.pathname !== RoutesConfiguration.VERIFICATION) {
        navigate(RoutesConfiguration.VERIFICATION, { replace: true });
      } else if (isUserVerified() && 
        (location.pathname === RoutesConfiguration.DEFAULT_PATH || 
         location.pathname === ROUTES_EXT.DEFAULT.PATH || 
         location.pathname === '/')) {
        navigate(RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM, { replace: true });
      }
    } else {
      if (location.pathname !== RoutesConfiguration.DEFAULT_PATH &&
          location.pathname !== ROUTES_EXT.DEFAULT.PATH &&
          location.pathname !== '/') {
        navigate(ROUTES_EXT.DEFAULT.PATH || RoutesConfiguration.DEFAULT_PATH, { replace: true });
      }
    }

    setLoading(false);
  }, [navigate, location.pathname, token_captured, is_user_verified]);

  if (loading) {
    return <div className='w-full h-full flex items-center justify-center'><CircularProgress size={124} color={'secondary'} /></div>; 
  }

  return (
    <Routes>
      <Route path={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH} element={<APP_CONFIG.LG_AUTH />} />
      <Route path={RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM} element={
        isUserAuthenticated() && isUserVerified() ? (
          <APP_CONFIG.MOD_T />
        ) : isUserAuthenticated() && !isUserVerified() ? (
          <Navigate to={RoutesConfiguration.VERIFICATION} />
        ) : (
          <Navigate to={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH} />
        )
      } />
      <Route path={RoutesConfiguration.VERIFICATION} element={<APP_CONFIG.OTP_TQ />} />
      <Route path={RoutesConfiguration.PRODUCTS || ROUTES_EXT.FEAT_CONFIG.PRD} element={<APP_CONFIG.PR_S />} />
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
    </div>
  );
}

export default App;
