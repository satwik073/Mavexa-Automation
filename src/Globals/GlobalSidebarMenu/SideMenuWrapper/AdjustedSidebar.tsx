// 'use client'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { menuOptions } from '@/Constants'
// import clsx from 'clsx'
// // import DropdownMenuComponent from '@/Globals/GlobalSiteNavigation/Components/DropdownMenu'
// // import { TRANSLATING_NAVIGATION_TEXT } from '@/Globals/GlobalSiteNavigation/NavigationWrapping/Constant'
// import { Box, Button, List, ListItem, Typography, useMediaQuery } from '@mui/material'
// import { MENU_OPTIONS_CREATED } from '../Constants/layout_controlling'
// import { BOX_COMPONENTS_SEPERATED, TYPOGRAPHY_VARIANTS_SEPERATED } from '@/Constants/variants_data'
// import { MENU_OPTIONS_SCREEN_CONTENT } from '../Constants'
// // import { extended_classes } from '@/Constants/Config'
// // import { defualt_and_defined_routes } from '@/Constants/standard_routes'
// // import { INFINITE_MOVING_CARDS_ATTRIBUTES } from '@/Pages/InfiniteScrollers/Constants'

// interface ContainerAttributes {
//   is_drawer_open_success?: boolean;
//   on_close_drawer?: () => void;
// }
// interface ContainerExtended extends ContainerAttributes {
//   children?: React.ReactNode;
//   className?: string;
//   is_drawer_open?: boolean;
//   is_drawer_open_success?: boolean;
// }
// const MenuSmallOptions: React.FC<ContainerExtended> = ({ is_drawer_open_success, on_close_drawer, className, children }) => {
//   const is_small_screen_area = useMediaQuery(`${extended_classes.media_queries.mobile_devices_below_600px}`);
//   const [fill_transition_color, set_transition_fill_color] = useState<string>(`${MENU_OPTIONS_SCREEN_CONTENT.CONTENT.empty_state}`);
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const theme = localStorage.getItem('theme');
//       set_transition_fill_color(
//         theme === TRANSLATING_NAVIGATION_TEXT.drop_down_light_connecting_content
//           ? ''
//           : TRANSLATING_NAVIGATION_TEXT.web_page_current_dark_theme_color
//       );
//     }
//   }, []);
//   const path_name_specified = usePathname()
//   return (
//     <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.nav}
//       className={clsx(
//         MENU_OPTIONS_CREATED.FLEXED_CONTAINERS.sidebar_overall_content,
//         {
//           [MENU_OPTIONS_CREATED.FLEXED_CONTAINERS.equilant_to_sidebar]: !is_small_screen_area,
//           [MENU_OPTIONS_CREATED.FLEXED_CONTAINERS.ternary_operating_container]: is_small_screen_area && is_drawer_open_success,
//           [extended_classes.hiding_element]: is_small_screen_area && !is_drawer_open_success,
//         }
//       )}
//     >

//       <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.section} className="flex flex-col items-center gap-8">
//         {is_small_screen_area && is_drawer_open_success && (
//           <Button onClick={on_close_drawer} className="self-end text-white">
//             <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.drawer_exit_enabled />
//           </Button>
//         )}
//         <Link href={`${defualt_and_defined_routes.default_ciphers}`} className="font-bold block text-center">
//           <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.logo_icon_setteled size={24} className="dark:text-white text-black" />
//         </Link>
//         <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_provider>
//           <List className="flex flex-col items-center gap-7">
//             {menuOptions.map((menu_items_controller) => (
//               <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_wrapper key={menu_items_controller.naming_determined} delayDuration={0}>
//                 <MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_trigger>
//                   <ListItem className={extended_classes.block_element}>
//                     <Link
//                       href={menu_items_controller.href_routes_enabled}
//                       className={clsx(`hover:${extended_classes.primary_textures} transition-colors`, {
//                         [extended_classes.primary_textures]: path_name_specified === menu_items_controller.href_routes_enabled,
//                       })}
//                     >
//                       <Box className="text-md flex">
//                         <menu_items_controller.Component size={22} fontWeight={'bold'} />
//                         <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.body_variant.body1}>{menu_items_controller.naming_determined}</Typography>
//                       </Box>
//                     </Link>
//                   </ListItem>
//                 </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_trigger>
//               </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_wrapper>
//             ))}
//           </List>
//         </MENU_OPTIONS_SCREEN_CONTENT.CONTENT.tool_tip_provider>
//       </Box>
//     </Box>
//   );
// };

// export default MenuSmallOptions;
