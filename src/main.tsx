import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './Store/store.ts';
import { CustomFontProvider } from './providers/FontController.tsx';
import { ThemeProvider } from 'next-themes';
import { ThemeProviderOptions } from './Global/GlobalSiteNavigators/NavigationState/Constants/structure.ts';
import ThemeUpdater from './Hooks/useThemeProvider.tsx';
import { HelmetProvider } from 'react-helmet-async';
import ModalProvider from './providers/ModalValueProvider.tsx';
import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { matchRoutes } from 'react-router-dom'; 
import { SpeedInsights } from '@vercel/speed-insights/next';

initializeFaro({
  url: import.meta.env.VITE_API_KEY_GRAFANA,
  app: {
    name:  `${import.meta.env.VITE_APP_PRODUCT} Automation`,
    version: '1.0.0',
    environment: 'production',
  },
  instrumentations: [
    ...getWebInstrumentations(), 
    new TracingInstrumentation(),
    new ReactIntegration({
      router: createReactRouterV6DataOptions({
        matchRoutes,
      }),
    }),
  ],
});

const container = document.getElementById('root');
createRoot(container!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CustomFontProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme={ThemeProviderOptions.DEFAULT} 
            themes={[ThemeProviderOptions.DARK_TH, ThemeProviderOptions.LIGHT_TH , ThemeProviderOptions.DEFAULT]}
          >
            <ThemeUpdater />
            <ModalProvider>
              <App />
              <SpeedInsights/>
            </ModalProvider>
          </ThemeProvider>
        </CustomFontProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
