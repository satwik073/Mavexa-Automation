
import { remove_token } from "@/Store/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Images/External/UI/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../Images/External/UI/dropdown-menu"
import { CiMenuFries } from "react-icons/ci"
import { PRODUCTS_CONFIGURATIONS } from "@/Global/GlobalSiteNavigators/NavigationState/Constants";
import { PR_STY } from "@/Global/GlobalSiteNavigators/NavigationState/Constants/layout_controller";
import { Box, Grid, ListItem } from "@mui/material";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@radix-ui/react-tooltip";
import { List } from "lucide-react";
import { displaying_buttons } from "@/Constants/DataObjects";
import { BOX_COMPONENTS_SEPERATED } from "@/Constants/variants_data";
import { RoutesConfiguration } from "@/Constants/structure";
import { ROUTES_EXT } from "@/Constants/standard_routes";

export function MenuEvent() {
  const navigate = useNavigate();
  const [is_logged_in, setIsLoggedIn] = useState<boolean>(localStorage.getItem('User-Settings') ? true : false); // Check token presence
  const dispatch = useDispatch()
  const handle_clear = () => {
    localStorage.removeItem('User-Settings');
    setIsLoggedIn(false);
    dispatch(remove_token());
    navigate('/');
    console.log("User logged out and navigated to home");
  };


  const data = PRODUCTS_CONFIGURATIONS.LINKS_SETTINGS.properties
  useEffect(() => {
    const token = localStorage.getItem('User-Settings');
    setIsLoggedIn(!!token);
  }, []);
  return (
    <DropdownMenu>


      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='z-[1000] dark:text-white text-black' ><CiMenuFries className=" " /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-8 mx-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />


        {data.map((item, index) => (
          <DropdownMenuGroup key={index} className="flex flex-col items-start">
            <DropdownMenuItem className="flex flex-col text-sm text-left w-full">
              <Grid className="flex justify-between items-center w-full  capitalize">
                {item.route_link_staged}
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Grid>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.button} onClick={() => navigate(`${RoutesConfiguration.DASHBOARD || ROUTES_EXT.END_FLOW.DAS}`)}>
              {displaying_buttons['dashboard_classic']}
            </Box>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handle_clear}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
