import { PRODUCTS_CONFIGURATIONS } from './Constants';
import { Link, useNavigate } from 'react-router-dom';
import { PR_STY } from './Constants/layout_controller';
import { Box, List, ListItem } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { BOX_COMPONENTS_SEPERATED } from '@/Constants/variants_data';
import { displaying_buttons } from '@/Constants/DataObjects';
import { CiMenuFries } from 'react-icons/ci';
import { RoutesConfiguration } from '@/Constants/structure';
import { useState, useEffect } from 'react';
import { ROUTES_EXT } from '@/Constants/standard_routes';
import { Button } from '@/Components/Images/External/UI/button';
import { useDispatch } from 'react-redux';
import { set_token } from '@/Store/authSlice';
import ThemeSwitcher from '@/Hooks/useThemeSwitcher';

const PrimarySiteNavigator: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [is_logged_in, setIsLoggedIn] = useState<boolean>(localStorage.getItem('User-Settings') ? true : false); // Check token presence
  const dispatch = useDispatch()
  const is_small_screen = useMediaQuery(theme.breakpoints.down('sm'));

  const handle_clear = () => {
    localStorage.removeItem('User-Settings');
    setIsLoggedIn(false); 
    dispatch(set_token(null))
    navigate('/');
    console.log("Clicked Logout");
  };

  useEffect(() => {
    const token = localStorage.getItem('User-Settings');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section} className={PR_STY.STLP.leftAside}>
      <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display />
      <List className={`${PR_STY.STLP.listItems} md:flex hidden text-sm`}>
        {PRODUCTS_CONFIGURATIONS.LINKS_SETTINGS.properties.map((index_value_rendering) => (
          <ListItem key={index_value_rendering.route_link_staged}>
            <Link to={index_value_rendering.path_controlled} className='links-attached capitalize'>
              {index_value_rendering.route_link_staged}
            </Link>
          </ListItem>
        ))}
      </List>

      <Button onClick={handle_clear}>Logout</Button>

            <ThemeSwitcher/>
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section}>
        <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.aside} className="flex items-center gap-4">
          <Link to={RoutesConfiguration.DASHBOARD || ROUTES_EXT.END_FLOW.DAS} className={PR_STY.STLP.buttonEffect}>
            <span className={PR_STY.STLP.spanOutline} />
            <span className={PR_STY.STLP.inlineSource}>
              {is_logged_in && !is_small_screen ? (
                <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button}>
                  {displaying_buttons['dashboard_classic']}
                </Box>
              ) : (
                <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button}>
                  {displaying_buttons['get_started']}
                </Box>
              )}
            </span>
          </Link>
          <CiMenuFries className='md:hidden' />
        </Box>
      </Box>
    </Box>
  );
};

export default PrimarySiteNavigator;
