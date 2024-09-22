
import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';
import { toast, Slide, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum MessageConfiguration {
    ERR_M = 'error',
    SC_M = 'success'
}
interface NotificationsHandler {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  pauseOnHover?: boolean;
  theme?: string;
}


export const MESSAGE_HANDLER = (
  message_options: string,
  type_declaration: MessageConfiguration.ERR_M | MessageConfiguration.SC_M,
  options?: NotificationsHandler
) => {
  const defaultOptions: NotificationsHandler = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    theme: ThemeProviderOptions.LIGHT_TH,
    ...options,
  };

  if (type_declaration === MessageConfiguration.SC_M) {
    toast.success(message_options, {
      ...defaultOptions,
      transition: Slide,
    });
  } else if (type_declaration === MessageConfiguration.ERR_M) {
    toast.error(message_options, {
      ...defaultOptions,
      transition: Slide,
    });
  }
};
