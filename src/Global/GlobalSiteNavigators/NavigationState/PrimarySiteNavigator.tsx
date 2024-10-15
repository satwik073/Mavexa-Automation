import { PRODUCTS_CONFIGURATIONS } from './Constants';
import { Link, useNavigate } from 'react-router-dom';
import { PR_STY } from './Constants/layout_controller';
import { Box, List, ListItem } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { BOX_COMPONENTS_SEPERATED } from '@/Constants/variants_data';
import { displaying_buttons } from '@/Constants/DataObjects';
import { RoutesConfiguration } from '@/Constants/structure';
import { useState, useEffect } from 'react';
import { ROUTES_EXT } from '@/Constants/standard_routes';
import ThemeSwitcher from '@/Hooks/useThemeSwitcher';
import { Tooltip, TooltipContent, TooltipProvider } from '@/Globals/GlobalToolTips/TooltipContent';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { MenuEvent } from '@/Components/MenuDropDown/MenuOpenEvent';
import { ToastDemo } from '@/Components/Images/External/UI/toastButton';

const PrimarySiteNavigator: React.FC = () => {
  const theme = useTheme();
  const [is_logged_in, setIsLoggedIn] = useState<boolean>(localStorage.getItem('User-Settings') ? true : false); // Check token presence
  const is_small_screen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('User-Settings');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box sx={{top:0 , position:'fixed' , zIndex:1000 , left:0 , right:0
    }}>
       
    <h1  className={` text-center w-full text-white bg-black py-4 px-4 leading-6 md:text-md text-sm`}>Check out the product updates we announced at MavexaConnect 2024! See what’s new.</h1>
    <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section} className={`${PR_STY.STLP.leftAside}`}>
        <ToastDemo/>
      <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display />
      <List className={`${PR_STY.STLP.listItems} md:flex hidden text-sm`}>
        {PRODUCTS_CONFIGURATIONS.LINKS_SETTINGS.properties.map((index_value_rendering) => (
          <ListItem key={index_value_rendering.route_link_staged}>
            <Link to={index_value_rendering.path_controlled} className='links-attached capitalize'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className='capitalize text-[16px]'>
                    {index_value_rendering.route_link_staged}
                  </TooltipTrigger>
                  <TooltipContent>
                    {index_value_rendering.route_link_staged}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </ListItem>
        ))}
      </List>

      {/* <Button className='lg:flex hidden' onClick={handle_clear}>Logout</Button> */}
     <ThemeSwitcher/>
      <MenuEvent />
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section}>
        <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.aside} className=" items-center gap-4 md:flex hidden">
          <Link to={RoutesConfiguration.DASHBOARD || ROUTES_EXT.END_FLOW.DAS} className={PR_STY.STLP.buttonEffect}>
            <span className={PR_STY.STLP.spanOutline} />
            <span className={PR_STY.STLP.inlineSource}>
              {is_logged_in && !is_small_screen ? (
                <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button} onClick={() => navigate(`${RoutesConfiguration.DASHBOARD || ROUTES_EXT.END_FLOW.DAS}`)}>
                  {displaying_buttons['dashboard_classic']}
                </Box>
              ) : (
                <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button}>
                  {displaying_buttons['get_started']}
                </Box>
              )}
            </span>
          </Link>
          {/* <CiMenuFries className='md:hidden' /> */}
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default PrimarySiteNavigator;
