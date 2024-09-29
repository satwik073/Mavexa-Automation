import { REUSABLE_CONFIG } from "@/Constants/globalStyles";

interface SpotLightStylingAttributes {
  browseComponentFlexed: string;
  customComponentFlexed: string;
  spotlightMain: string;
  variantHeadingTypography: string;
  variantsParaTypography: string;
  buttonsParentGridIssues: string;
  gridItemsCombined: string;
}

export const TCSS_CLASSES: SpotLightStylingAttributes = {
  browseComponentFlexed: `
    bg-black dark:bg-white dark:text-black no-underline mb-3
    ${REUSABLE_CONFIG.flexCenterCommon} space-x-2 group cursor-pointer relative 
    hover:shadow-2xl ${REUSABLE_CONFIG.transitionCommon} shadow-zinc-900 p-px 
    font-semibold text-white ${REUSABLE_CONFIG.commonPadding} w-full sm:w-52 h-14 
    ${REUSABLE_CONFIG.roundedxlCommon} ${REUSABLE_CONFIG.commonTextSm} text-center
  `,

  customComponentFlexed: `
    w-full sm:w-52 z-10 ${REUSABLE_CONFIG.commonTextSm} text-black bg-white 
    dark:bg-black h-14 border-2 bg-white border-neutral-300 ${REUSABLE_CONFIG.darkModeText} 
    dark:border-emerald-500 ${REUSABLE_CONFIG.flexCenterCommon} 
    hover:border-emerald-500 hover:text-black hover:bg-white
    ${REUSABLE_CONFIG.roundedxlCommon} ${REUSABLE_CONFIG.transitionCommon} ${REUSABLE_CONFIG.commonShadow}
  `,

  spotlightMain: `
   h-full md:mt-12 z-20 mt-9 w-full rounded-md flex md:items-center antialiased bg-grid-black/[0.06] dark:bg-grid-white/[0.08] 
   relative overflow-hidden
  `,

  variantHeadingTypography: `
    text-4xl md:text-7xl font-bold bg-clip-text text-transparent 
    bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50
  `,

  variantsParaTypography: `
    relative ${REUSABLE_CONFIG.commonTextSm} sm:text-xl text-zinc-500 
    dark:text-zinc-300 tracking-wide mb-8 text-left 
    max-w-2xl antialiased leading-loose
  `,

  buttonsParentGridIssues: `
    sm:flex md:mt-8 mt-6 gap-5  w-full
  `,

  gridItemsCombined: `
    p-4 max-w-7xl md:mx-12 relative z-10 w-full 
    pt-20 md:pt-0
  `
};

