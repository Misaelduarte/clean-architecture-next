import { AlertProvider } from './alert-context';
import { ModalProvider } from './modal-context';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => (
  <AlertProvider>
    <ModalProvider>{children}</ModalProvider>
  </AlertProvider>
);
