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
                    <Grid item lg={5} className="w-full md:max-w-2xl ">
                        <Box className="w-full">
                            {/* <SaaSyAutomationLogo/> */}
                            <PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.product_display/>
                            <Typography className={FOOTER_SYLING_ATTACHED.footer_headlines_bolded}>
                                {TRANSLATING_FOOTER_TEXT.footer_headlines}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <div className='w-full justify-center items-center '>
                    <h1 className="text-center text-5xl md:text-9xl lg:text-[16rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">MAVEXA</h1>
                </div>
            </Grid>
            <Divider className={FOOTER_SYLING_ATTACHED.divider_remastered} />
            <Box className={FOOTER_SYLING_ATTACHED.box_stylings_defined}>
                <Box className={FOOTER_SYLING_ATTACHED.inner_box}>
                    <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.body_variant.body1} className={FOOTER_SYLING_ATTACHED.copyright_text}>
                        &copy; {TRANSLATING_FOOTER_TEXT.footer_copyright_issue_marked}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PrimarySiteFooter;
