'use client';
import React, { useState, useEffect } from 'react';
import ImageContainer from '@/Components/Images/ImageContainer';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { PR_STY } from '../Constants/layout_controller';
import { BOX_COMPONENTS_SEPERATED, TYPOGRAPHY_VARIANTS_SEPERATED } from '@/Constants/variants_data';
import { ThemeProviderOptions, ThemeSchema } from '../Constants/structure';
import { PRODUCTS_CONFIGURATIONS } from '../Constants';
import { useTheme } from 'next-themes';
import { useTheme as useMuiTheme } from '@mui/material';
const SaaSyAutomationLogo: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme()
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);
  const is_small_screen = useMediaQuery(muiTheme.breakpoints.down('sm'))
  useEffect(() => {
    const isLightTheme = theme === 'light';
    setLogoColor(isLightTheme ? '' : ThemeSchema.BLK_CL);
  }, [theme]);

  const imageContainerProps = {
    src: logoColor ? "/test2.png" : "/test.png",
    width: 45,
    height: 45,
    alt: "SaaSy Logo",
  };

  return (
    <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.nav}>
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.aside} className={PR_STY.STLP.headedTextLogo}>
        <ImageContainer {...imageContainerProps} />
        {
          !is_small_screen && (
            <span className={`${PR_STY.STLP.headedText}`}>
              {PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.initials}
            </span>
          )
        }
      </Box>
    </Box>
  );
};

export default SaaSyAutomationLogo;
