import React from 'react';

import Box from '@mui/material/Box';
import { TRANSLATING_FOOTER_TEXT } from '../Constant'
import { Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FOOTER_SYLING_ATTACHED } from '../Constant/layouts_controlling';
import { BOX_COMPONENTS_SEPERATED, TYPOGRAPHY_VARIANTS_SEPERATED } from '@/Constants/variants_data';
import SaaSyAutomationLogo from '@/Global/GlobalSiteNavigators/NavigationState/SaasySeparator/SaasyAutomationLogo';
import { PRODUCTS_CONFIGURATIONS } from '@/Global/GlobalSiteNavigators/NavigationState/Constants';
const PrimarySiteFooter = () => {
    return (
        <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.header} className=" w-full bg-gray-50 dark:bg-black">
            <Grid container className={FOOTER_SYLING_ATTACHED.resposnive_properties_padding}>
                <Grid item lg={12} container className={FOOTER_SYLING_ATTACHED.grid_containers}>
                    <Grid item lg={5} className="w-full lg:w-1/3 ">
                        <Box className="w-full">
                            {/* <SaaSyAutomationLogo/> */}
                            <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display/>
                            <Typography className={FOOTER_SYLING_ATTACHED.footer_headlines_bolded}>
                                {TRANSLATING_FOOTER_TEXT.footer_headlines}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid className="w-full sm:flex mt-10">
                        {TRANSLATING_FOOTER_TEXT.footer_fetched_headings_attached_links.map((data_fetched: { fetched_headings_attached: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; links_estaiblished: any[]; }, index: React.Key | null | undefined) => (
                            <Grid item xs={12} sm={12} md={4} key={index} className="w-full px-6">
                               
                                         <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.body_variant.body1} className={FOOTER_SYLING_ATTACHED.data_headlines}>
                                         {/* {data_fetched.links_estaiblishe} */}
                                     </Typography>
                                <List className="mt-6 space-y-4 text-sm">
                                    {data_fetched.links_estaiblished.map((links_data_fetched, index_links) => (
                                        <div>
                                        <ListItem key={index_links} className="p-0">
                                            <Link to={links_data_fetched.path_specified} className={FOOTER_SYLING_ATTACHED.links_attached_beautified}>
                                                {links_data_fetched.text_fields}
                                            </Link>
                                        </ListItem>
                                        </div>
                                    ))}
                                </List>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <div className='w-full justify-center items-center '>
                    <h1 className="text-center text-5xl md:text-9xl lg:text-[18rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">MAVEXA</h1>
                </div>
            </Grid>
            <Divider className={FOOTER_SYLING_ATTACHED.divider_remastered} />
            <Box className={FOOTER_SYLING_ATTACHED.box_stylings_defined}>
                <Box className={FOOTER_SYLING_ATTACHED.inner_box}>
                    <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.body_variant.body1} className={FOOTER_SYLING_ATTACHED.copyright_text}>
                        &copy; {TRANSLATING_FOOTER_TEXT.footer_copyright_issue_marked}
                    </Typography>
                </Box>
                <Box className="flex justify-center items-center gap-4">
                    {TRANSLATING_FOOTER_TEXT.social_media_connections.map((links_data_fetched, indexed_value: React.Key | null | undefined) => (
                        <Link
                            key={indexed_value}
                            to={links_data_fetched.path_specified}
                            rel={links_data_fetched.rel}
                            target={links_data_fetched.target_window}
                            className={FOOTER_SYLING_ATTACHED.social_media_links_fetched}
                        >
                            <span className="sr-only">{links_data_fetched.label}</span>
                            <links_data_fetched.icons_from_react />
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default PrimarySiteFooter;
