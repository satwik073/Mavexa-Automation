'use client'
import { useState, useEffect } from "react";
import { Button } from "@/Components/Images/External/UI/button";
import { displaying_buttons } from "@/Constants/DataObjects";
import { SPOT_LIGHT_PREVIEW_CONTENT_RAISED } from "./Constant";
import { TCSS_CLASSES } from "./Constant/layout_controlling";
import { Box, Grid, Typography } from "@mui/material";
import { BOX_COMPONENTS_SEPERATED, TYPOGRAPHY_VARIANTS_SEPERATED } from "@/Constants/variants_data";
import { ThemeProviderOptions, ThemeSchema } from "@/Global/GlobalSiteNavigators/NavigationState/Constants/structure";
import { useTheme } from 'next-themes';
import ImageContainer from "@/Components/Images/ImageContainer";

export function SpotlightPreview() {
  const { theme } = useTheme();
  const [fill_color_after_theme_change, set_color_after_theme_change] = useState(ThemeSchema.BLK_CL);
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);

  const imageContainerProps = {
    src: logoColor ? "/darkLogin.png" : "/lightLogin.png",
    width: 1000,
    height: 1000,
    alt: "SaaSy Logo",
    className: "shadow-sm",
  };

  useEffect(() => {
    if (theme) {
      const is_light_theme = theme === 'light';
      set_color_after_theme_change(is_light_theme ? ThemeSchema.WHT_CL : ThemeSchema.SPT_LH);
      setLogoColor(is_light_theme ? '' : ThemeSchema.BLK_CL);
    }
  }, [theme]);

  return (
    <Box
      component={BOX_COMPONENTS_SEPERATED.components_fetched.header}
      className={`${TCSS_CLASSES.spotlightMain} ${theme === ThemeProviderOptions.LIGHT_TH ? 'bg-white' : 'bg-blue-800'} flex flex-col lg:flex-row items-center justify-between`}
      sx={{ padding: '2rem' }}
    >

      <Grid
        item
        xs={12}
        lg={6}
        className="flex flex-col items-start justify-center md:px-0 px-6 py-20 w-full lg:w-1/2"
      >
        <Grid>
          <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.headings_variant.h1} className={TCSS_CLASSES.variantHeadingTypography}>
            <SPOT_LIGHT_PREVIEW_CONTENT_RAISED.flip_words_component_attached />
          </Typography>
          <Typography className={TCSS_CLASSES.variantsParaTypography}>
            {SPOT_LIGHT_PREVIEW_CONTENT_RAISED.headline_fetched}
          </Typography>
          <Grid  className={TCSS_CLASSES.buttonsParentGridIssues}>
            <Grid item>
              <Button className={TCSS_CLASSES.browseComponentFlexed}>
                {displaying_buttons['browse_components']}
              </Button>
            </Grid>
            <Grid item>
              <Button className={TCSS_CLASSES.customComponentFlexed}>
                {displaying_buttons['custom_components']}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        className="flex items-center justify-center p-6 w-full lg:w-1/2"
      >
        <ImageContainer {...imageContainerProps} />
      </Grid>
    </Box>
  );
}
