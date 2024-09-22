import React, { lazy, Suspense } from 'react';
// import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { MESSAGE_HANDLER, MessageConfiguration } from './Events/MessageDispatch';
// import { ThemeProviderOptions } from './Global/GlobalSiteNavigators/NavigationState/Constants/structure';

const SpotLight = lazy(() => import('@/Pages/SpotLightCombined/SpotLightModuler').then(module => ({ default: module.SpotlightPreview })));
const Periodic_Navigation = lazy(() => 
  import('@/Global/GlobalSiteNavigators/NavigationState/PrimarySiteNavigator')
);
type Props = {};

const ModeratorLazyLoader: React.FC<Props> = () => {


  return (
    <>
      <Periodic_Navigation/>
      <Suspense fallback={<div>Loading...</div>}>
        <SpotLight />
      </Suspense>
    </>
  );
};

export default ModeratorLazyLoader;
