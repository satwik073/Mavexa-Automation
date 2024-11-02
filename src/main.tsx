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

const container = document.getElementById('root');
createRoot(container!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CustomFontProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme={ThemeProviderOptions.DARK_TH} 
            themes={[ThemeProviderOptions.DARK_TH, ThemeProviderOptions.LIGHT_TH , ThemeProviderOptions.DEFAULT]}
          >
            <ThemeUpdater />
            <ModalProvider>
              <App />
            </ModalProvider>
          </ThemeProvider>
        </CustomFontProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
