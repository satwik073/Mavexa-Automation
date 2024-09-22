
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import UserLoginEnabled from './Auth/Logins/UserLoginEnabled';
import { ToastContainer } from 'react-toastify';
import { APP_CONFIG } from '.';
import { ROUTES_EXT } from './Constants/standard_routes';
import Product from './Network/Product';
import 'react-toastify/dist/ReactToastify.css';
import { RoutesConfiguration } from './Constants/structure';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token_captured = useSelector((state: any) => state.auth.token_for_authnetication);
  
  const isUserAuthenticated = () => !!localStorage.getItem('User-Settings') || !!token_captured;

  useEffect(() => {
    if (isUserAuthenticated()) {
      if (
        location.pathname === RoutesConfiguration.DEFAULT_PATH ||
        location.pathname === ROUTES_EXT.DEFAULT.PATH ||
        location.pathname === '/'
      ) {
        navigate(`${RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM}`, { replace: true });
      }
    } else {
      if (
        location.pathname !== RoutesConfiguration.DEFAULT_PATH &&
        location.pathname !== ROUTES_EXT.DEFAULT.PATH &&
        location.pathname !== '/'
      ) {
        navigate(`${ROUTES_EXT.DEFAULT.PATH || RoutesConfiguration.DEFAULT_PATH}`, { replace: true });
      }
    }
  }, [navigate, location, token_captured]);

  return (
    <Routes>
      <Route path={RoutesConfiguration.DEFAULT_PATH || ROUTES_EXT.DEFAULT.PATH} element={<UserLoginEnabled />} />
      <Route path={RoutesConfiguration.AUTH || ROUTES_EXT.AUTH_FLOW.ATM} element={isUserAuthenticated() ? <APP_CONFIG.MOD_T /> : <Navigate to="/" />} />
      <Route path="/products" element={<Product />} />
      <Route path="*" element={<Navigate to="/" />} />
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
