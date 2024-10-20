import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme, useMediaQuery, Box, List, ListItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS_CONFIGURATIONS } from "./Constants";
import { PR_STY } from "./Constants/layout_controller";
import { BOX_COMPONENTS_SEPERATED } from "@/Constants/variants_data";
import { displaying_buttons } from "@/Constants/DataObjects";
import { RoutesConfiguration } from "@/Constants/structure";
import { ROUTES_EXT } from "@/Constants/standard_routes";
import ThemeSwitcher from "@/Hooks/useThemeSwitcher";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Globals/GlobalToolTips/TooltipContent";
import { MenuEvent } from "@/Components/MenuDropDown/MenuOpenEvent";
import { useSelector } from "react-redux";


const PrimarySiteNavigator = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const loginStatus = useSelector((state : any) => state?.auth?.isLoggedIn)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("User-Settings"));
  
  const getButtonComponent = useCallback(
    () => !loginStatus ? (
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button} onClick={() => navigate(RoutesConfiguration.DASHBOARD || ROUTES_EXT.END_FLOW.DAS)}>
        {displaying_buttons["dashboard_classic"]}
      </Box>
    ) : (
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button}>
        {displaying_buttons["get_started"]}
      </Box>
    ),
    [isLoggedIn, isSmallScreen, navigate]
  );

  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("User-Settings"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const memoizedMenuItems = useMemo(
    () => PRODUCTS_CONFIGURATIONS.LINKS_SETTINGS.properties.map(({ route_link_staged, path_controlled }) => ({
      key: route_link_staged,
      component: (
        <ListItem key={route_link_staged}>
          <Link to={path_controlled} className="links-attached capitalize">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="capitalize text-[16px]">
                  {route_link_staged}
                </TooltipTrigger>
                <TooltipContent>
                  {route_link_staged}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </ListItem>
      )
    })),
    []
  );

  return (
    <Box sx={{ top: 0, position: "fixed", zIndex: 1000, left: 0, right: 0 }}>
      <h1 className="text-center w-full text-white  bg-black py-4 px-4 leading-6 md:text-md text-sm">
        Check out the product updates we announced at MavexaConnect 2024! See what’s new.
      </h1>
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section} className={`${PR_STY.STLP.leftAside}`}>
        <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display />
        <List className={`${PR_STY.STLP.listItems} md:flex hidden text-sm`}>
          {memoizedMenuItems.map(({ key, component }) => (
            <React.Fragment key={key}>{component}</React.Fragment>
          ))}
        </List>
        {isSmallScreen && (
          <Box>
            <ThemeSwitcher />
            <MenuEvent />
          </Box>
        )}

        <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section}>
          <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.aside} className="items-center gap-4 md:flex hidden">
            <Link to={RoutesConfiguration.DASHBOARD || ROUTES_EXT.END_FLOW.DAS} className={PR_STY.STLP.buttonEffect}>
              <span className={PR_STY.STLP.spanOutline} />
              <span className={PR_STY.STLP.inlineSource}>
                {getButtonComponent()}
              </span>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(PrimarySiteNavigator);
