import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from 'next-themes';
import { InfiniteMovingCards } from './Animations/MovingCardsGlobalState';
import { clients, clients_inverted } from './lib/constants';
import { ThemeProviderOptions, ThemeSchema } from './Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { Helmet } from 'react-helmet-async'
import { FloatingDockDemo } from './Components/DockContainer/FloatingDock';
const TransientLight = lazy(() => import('@/Pages/SpotLightCombined/SpotLightModuler').then(module => ({ default: module.SpotlightPreview })));
const GlobalAnnotations = lazy(() => import('@/Globals/GlobalSiteFooter/FooterAttributesWrapping/Components/PrimarySiteFooter'));
const PeriodicNavigation = lazy(() => import('@/Global/GlobalSiteNavigators/NavigationState/PrimarySiteNavigator'));
const AlignedGridConstants = lazy(() => import('@/Pages/GridContainer/GridTerminalLayout').then(module => ({ default: module.FeaturedSectionDemo })));
const PricingAndBillingAnnotations = lazy(() => import('@/Pages/CardWrapper/CardFlexContainers'));

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
    <>
      <Helmet>
        {/* Standard Meta Tags */}
        <title>Mavexa - Leading SaaS Automation Platform for Business</title>

        <meta name="description" content="Mavexa offers innovative SaaS automation solutions to streamline business processes, boost operational efficiency, and scale with ease." />

   
        <meta property="og:title" content="Mavexa - SaaS Automation Solutions for Business Efficiency" />
        <meta property="og:description" content="Transform your business operations with Mavexa's SaaS automation tools. Get insights, automate workflows, and scale efficiently." />
        <meta property="og:image" content="https://mavexa.vercel.app/test2.png" />
        <meta property="og:url" content="https://mavexa.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mavexa" />
        <meta property="og:locale" content="en_US" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mavexa - Leading SaaS Automation Platform" />
        <meta name="twitter:description" content="Boost your business with Mavexa's leading SaaS automation platform. Automate, optimize, and scale seamlessly with real-time insights." />
        <meta name="twitter:image" content="https://mavexa.vercel.app/test2.png" />
        <meta name="twitter:site" content="@mavexa" />
        <meta name="twitter:creator" content="@mavexa" />

        <meta property="og:title" content="Mavexa - SaaS Automation Platform" />
        <meta property="og:description" content="Streamline your business operations with Mavexa's cutting-edge SaaS automation platform." />
        <meta property="og:image" content="https://mavexa.vercel.app/test2.png" />
        <meta property="og:url" content="https://mavexa.vercel.app" />
        <meta property="og:type" content="website" />


        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="SaaS automation, business automation, workflow automation, streamline business processes, real-time insights, scale business, Mavexa" />

        <link rel="canonical" href="https://mavexa.vercel.app" />

      </Helmet>
      {/* <SEO_Module_Optimizer
        primaryTitle="Amazing Product - Mavexa"
        primaryDescription="Discover Mavexa's latest amazing product that can transform your life."
        canonicalURL="https://www.mavexa.com/amazing-product"
        metaImageURL="https://www.mavexa.com/images/amazing-product.jpg"
        additionalKeywords="Mavexa, amazing product, life transformation, innovation"
        schemaEntityType="Product"
        contentAuthor="John Doe"
        contentPublisher="Mavexa Inc."
        publicationDate="2024-10-29"
        lastModifiedDate="2024-10-29"
        localizedLanguageRegion="en_US"
        twitterHandleAlias="@mavexa"
        facebookApplicationID="1234567890" */}
      {/* /> */}
      {/* <SEO_Module_Optimizer
        primaryTitle="Welcome to Mavexa"
        primaryDescription="Mavexa is your top destination for quality tech solutions."
        canonicalURL="https://mavexa.com"
        metaImageURL="https://mavexa.com/logo.png"
        additionalKeywords="tech, solutions, Mavexa"
        schemaEntityType="Organization"
        contentAuthor="John Doe"
        contentPublisher="Mavexa Inc."
        publicationDate="2024-10-01"
        lastModifiedDate="2024-10-15"
        localizedLanguageRegion="en_US"
        twitterHandleAlias="@mavexa"
        facebookApplicationID="1234567890"
      /> */}
      <Suspense fallback={FallbackComponentProgress}>
        <MemoizedNavigation />
        <MemoizedLight />
        {renderMovingCards()}
        <MemoizedGridConstants />
        <MemoizedPricing />
        <MemoizedAnnotations />
        {/* <FloatingDockDemo/> */}
      </Suspense>
 
    </>
  );
};

export default ModeratorLazyLoader;
