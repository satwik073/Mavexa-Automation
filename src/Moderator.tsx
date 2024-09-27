import React, { lazy, Suspense, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import { useTheme } from 'next-themes';

const SpotLight = lazy(() => import('@/Pages/SpotLightCombined/SpotLightModuler').then(module => ({ default: module.SpotlightPreview })));
const Periodic_Navigation = lazy(() => import('@/Global/GlobalSiteNavigators/NavigationState/PrimarySiteNavigator'));

type Props = {};

const ModeratorLazyLoader: React.FC<Props> = () => {
  const { theme } = useTheme(); // Get current theme

  return (
    <>
      <Suspense fallback={
        <div className='w-full h-screen flex items-center justify-center'>
          {/* Change color directly based on theme */}
          <CircularProgress size={54} sx={{ color: theme === 'light' ? 'black' : 'white' }} />
        </div>
      }>
        <Periodic_Navigation />
        <SpotLight />
      </Suspense>
    </>
  );
};

export default ModeratorLazyLoader;
