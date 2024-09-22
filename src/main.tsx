
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// import { ThemeProvider } from './providers/ComplexionsProvider.tsx';
// import { ThemeProviderOptions } from "./Global/GlobalSiteNavigators/NavigationState/Constants/structure.ts";
import { Provider } from 'react-redux';
import { store } from "./Store/store.ts";

const container = document.getElementById('root');
createRoot(container!).render(
  // <ThemeProvider defaultTheme={ThemeProviderOptions.DARK_TH}>
    <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </StrictMode>
  // </ThemeProvider>
);
