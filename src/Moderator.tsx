import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from 'next-themes';
import { InfiniteMovingCards } from './Animations/MovingCardsGlobalState';
import { clients, clients_inverted } from './lib/constants';
import { ThemeProviderOptions, ThemeSchema } from './Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { Helmet } from 'react-helmet-async'
import { FloatingDockDemo } from './Components/DockContainer/FloatingDock';
import SEO_Module_Optimizer from './providers/SEO_Optimizer';
import { APP_CONFIG } from '.';
const TransientLight = lazy(() => import('@/Pages/SpotLightCombined/SpotLightModuler').then(module => ({ default: module.SpotlightPreview })));
const GlobalAnnotations = lazy(() => import('@/Globals/GlobalSiteFooter/FooterAttributesWrapping/Components/PrimarySiteFooter'));
const PeriodicNavigation = lazy(() => import('@/Global/GlobalSiteNavigators/NavigationState/PrimarySiteNavigator'));
const AlignedGridConstants = lazy(() => import('@/Pages/GridContainer/GridTerminalLayout').then(module => ({ default: module.FeaturedSectionDemo })));
const PricingAndBillingAnnotations = lazy(() => import('@/Pages/CardWrapper/CardFlexContainers'));
const { VITE_APP_PRODUCT } = import.meta.env
const { VITE_APP_DEFAULT_IMAGE } = import.meta.env
const { VITE_APP_JSON_LD_ORG } = import.meta.env
const{ VITE_APP_HOSTED_SERVER } = import.meta.env

type Props = {};

const ThemeIdentifier = (theme_recognizer: string): string => {
  switch (theme_recognizer) {
    case 'light':
      return ThemeSchema.WHT_CL;
    case 'dark':
      return ThemeSchema.BLK_CL;
    default:
      return ThemeProviderOptions.DEFAULT;
  }
};

const useThemeHandler = (theme_recognizer: string) => {
  const [themeSwitcher, setThemeSwitcher] = useState<string>(ThemeSchema.BLK_CL);
  useEffect(() => {
    setThemeSwitcher(ThemeIdentifier(theme_recognizer));
  }, [theme_recognizer]);
  return themeSwitcher;
};
const SuspenseFallbackController = <T extends {}>(Collectives: React.ComponentType<T>, fallbackQueue: React.ReactNode) => {
  return (props: T) => (
    <Suspense fallback={fallbackQueue}>
      <Collectives {...props} />
    </Suspense>
  );
};

const ModeratorLazyLoader: React.FC<Props> = () => {
  const { theme } = useTheme();
  const logoColor = useThemeHandler(theme || 'light');

  const FallbackComponentProgress = useMemo(() => (
    <Box className='w-full h-screen flex items-center justify-center'>
      <CircularProgress color="inherit" size={54} />
    </Box>
  ), []);

  const MemoizedNavigation = useMemo(() => SuspenseFallbackController(PeriodicNavigation, FallbackComponentProgress), [FallbackComponentProgress]);
  const MemoizedLight = useMemo(() => SuspenseFallbackController(TransientLight, FallbackComponentProgress), [FallbackComponentProgress]);
  const MemoizedGridConstants = useMemo(() => SuspenseFallbackController(AlignedGridConstants, FallbackComponentProgress), [FallbackComponentProgress]);
  const MemoizedPricing = useMemo(() => SuspenseFallbackController(PricingAndBillingAnnotations, FallbackComponentProgress), [FallbackComponentProgress]);
  const MemoizedAnnotations = useMemo(() => SuspenseFallbackController(GlobalAnnotations, FallbackComponentProgress), [FallbackComponentProgress]);

  const clientRenderingItems = logoColor ? clients : clients_inverted;

  const renderMovingCards = useCallback(() => {
    return <InfiniteMovingCards
      items={clientRenderingItems}
      direction={'left'}
      speed={'slow'}
    />;
  }, [clientRenderingItems]);

  return (
    <React.Fragment>
      <APP_CONFIG.SEO_OPT
        primaryTitle={`${VITE_APP_PRODUCT} - Leading SaaS Automation Platform for Business`}
        primaryDescription="Mavexa is your top destination for quality tech solutions."
        canonicalURL={VITE_APP_HOSTED_SERVER}
        metaImageURL= {VITE_APP_DEFAULT_IMAGE}
        additionalKeywords="tech, solutions, Mavexa"
        schemaEntityType="Organization"
        contentAuthor="John Doe"
        contentPublisher="Mavexa Inc."
        publicationDate="2024-10-01"
        lastModifiedDate="2024-10-15"
        localizedLanguageRegion="en_US"
        twitterHandleAlias="@mavexa"
        facebookApplicationID="1234567890"
      />
      <Suspense fallback={FallbackComponentProgress}>
        <MemoizedNavigation />
        <MemoizedLight />
        {renderMovingCards()}
        <MemoizedGridConstants />
        <MemoizedPricing />
        <MemoizedAnnotations />
      </Suspense>

    </React.Fragment>
  );
};

export default ModeratorLazyLoader;
