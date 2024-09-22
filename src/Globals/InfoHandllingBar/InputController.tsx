// 'use client'

// import { useState } from 'react'
// import {  Headphones, Search, Menu } from 'lucide-react'
// // import MenuSmallOptions from '../GlobalSidebarMenu/SideMenuWrapper/AdjustedSidebar'
// import { PlaceholdersAndVanishInputDemo } from './Animations/InputPlaceholder'
// import { Box, Typography, useMediaQuery } from '@mui/material'
// // import { MENU_OPTIONS_SCREEN_CONTENT } from '../GlobalSidebarMenu/Constants'
// import { BOX_COMPONENTS_SEPERATED, TYPOGRAPHY_VARIANTS_SEPERATED } from '@/Constants/variants_data'
// import { extended_classes } from '@/Constants/use_common_styling'
// // import { extended_classes } from '@/Constants/Config'


// // type Props = {}
// const InfoBar = () => {
//   const is_small_screen = useMediaQuery(`${extended_classes.media_queries.mobile_devices_below_600px}`);
//   const [is_drawer_open, set_is_drawer_open] = useState(false);

//   const toggle_menu_drawer = () => {
//     set_is_drawer_open(!is_drawer_open);
//   };

//   return (
//     <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.header} className="flex flex-row static top-0 justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
//       {is_small_screen && (
//         <button onClick={toggle_menu_drawer} className="mr-auto">
//           <Menu />
//         </button>
//       )}
//       <span className="flex items-center gap-2 font-bold">
//         <p className="text-sm font-light text-gray-300 md:block hidden">
//           Credits
//         </p>
//       </span>
//       <span className="flex items-center rounded-full bg-muted px-2">
//         <Search />
//         <PlaceholdersAndVanishInputDemo />
//       </span>
//       <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_provider>
//         <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section} className="flex items-center gap-4 py-3">
//           <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.drop_down_menu_content_wrapped />
//         </Box>
//         <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_wrapper delayDuration={0}>
//           <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_trigger>
//             <Headphones />
//           </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_trigger>
//           <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_content>
//             <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.body_variant.body1}>Contact Support</Typography>
//           </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_content>
//         </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_wrapper>
//       </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_provider>
//       <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_provider>
//         <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_wrapper delayDuration={0}>
//           <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_trigger>
//             <Headphones />
//           </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_trigger>
//           <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_content>
//             <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.body_variant.body1}>Guide</Typography>
//           </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_content>
//         </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_wrapper>
//       </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_provider>
//       {is_drawer_open && (
//         <Box className="fixed inset-0 z-50 flex">
//           <MenuSmallOptions is_drawer_open_success={is_drawer_open} on_close_drawer={toggle_menu_drawer} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default InfoBar;
