'use client'
import React, { useState, useEffect } from 'react';
import ImageContainer from '@/Components/Images/ImageContainer';
import { Box, Typography } from '@mui/material';
import { PR_STY } from '../Constants/layout_controller';
import { BOX_COMPONENTS_SEPERATED, TYPOGRAPHY_VARIANTS_SEPERATED } from '@/Constants/variants_data';
import { ThemeProviderOptions, ThemeSchema } from '../Constants/structure';
import { PRODUCTS_CONFIGURATIONS } from '../Constants';

interface ImageContainerProps {
  width: number;
  height: number;
  alt: string;
  src: string;
  className?: string;
}

const SaaSyAutomationLogo: React.FC = () => {
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem('theme');
      setLogoColor(currentTheme === ThemeProviderOptions.LIGHT_TH.toLowerCase() ? '' : ThemeSchema.BLK_CL);
    }
  }, []);

  const imageContainerProps: ImageContainerProps = {
    src: logoColor ? "/fuzzieLogo.png" : "/image.png",
    width: 15,
    height: 15,
    alt: "SaaSy Logo",
    className: "shadow-sm",
  };

  return (
    <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.nav}>
      <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.aside} className={PR_STY.STLP.headedTextLogo}>
        <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.headings_variant.h5} className={PR_STY.STLP.headedText}>
          {PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.initials}
        </Typography>
        <ImageContainer {...imageContainerProps} />
        <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.headings_variant.h5} className={PR_STY.STLP.tailedText}>
          {PRODUCTS_CONFIGURATIONS.LOGO_SETTINGS.trailing_constants}
        </Typography>
      </Box>
    </Box>
  );
};

export default SaaSyAutomationLogo;
