import React, { lazy, Suspense, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import { useTheme } from 'next-themes';

const SpotLight = lazy(() => import('@/Pages/SpotLightCombined/SpotLightModuler').then(module => ({ default: module.SpotlightPreview })));
const GlobalAnnotations = lazy(() => import('@/Globals/GlobalSiteFooter/FooterAttributesWrapping/Components/PrimarySiteFooter'))
const Periodic_Navigation = lazy(() => import('@/Global/GlobalSiteNavigators/NavigationState/PrimarySiteNavigator'));

type Props = {};

const ModeratorLazyLoader: React.FC<Props> = () => {
  const { theme } = useTheme();

  return (
    <>
      <Suspense fallback={
        <div className='w-full h-screen flex items-center justify-center'>
          <CircularProgress size={54} sx={{ color: theme === 'light' ? 'black' : 'white' }} />
        </div>
      }>
        <Periodic_Navigation />
        <SpotLight />
      </Suspense>

        <GlobalAnnotations/>
    </>
  );
};

export default ModeratorLazyLoader;
