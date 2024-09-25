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
export function SpotlightPreview() {

  const { theme } = useTheme();
  const [fill_color_after_theme_change, set_color_after_theme_change] = useState(ThemeSchema.BLK_CL);

  useEffect(() => {
    if (theme) {
      const is_light_theme = theme === 'light';
      set_color_after_theme_change(is_light_theme ? ThemeSchema.WHT_CL : ThemeSchema.SPT_LH);
    }
  }, [theme]);

  return (
    <Box component={BOX_COMPONENTS_SEPERATED.components_fetched.header} className={TCSS_CLASSES.spotlightMain}>
      <SPOT_LIGHT_PREVIEW_CONTENT_RAISED.splot_light_effects_emerald 
        className="-top-40 left-0 md:left-60 md:-top-20" 
        fill_valuable_color_blend={fill_color_after_theme_change} 
      />
      <Grid className={TCSS_CLASSES.gridItemsCombined}>
        <Typography variant={TYPOGRAPHY_VARIANTS_SEPERATED.headings_variant.h1} className={TCSS_CLASSES.variantHeadingTypography}>
          <SPOT_LIGHT_PREVIEW_CONTENT_RAISED.flip_words_component_attached />
        </Typography>
        <Typography className={TCSS_CLASSES.variantsParaTypography}>
          {SPOT_LIGHT_PREVIEW_CONTENT_RAISED.headline_fetched}
        </Typography>
        <Grid className={TCSS_CLASSES.buttonsParentGridIssues}>
          <Button className={TCSS_CLASSES.browseComponentFlexed}>
          {displaying_buttons['browse_components']}
          </Button>
          <Button className={TCSS_CLASSES.customComponentFlexed}>
            {displaying_buttons['custom_components']}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
