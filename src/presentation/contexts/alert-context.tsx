import { createContext, useCallback, useContext, useState } from 'react';

import { Alert, AlertType } from '@/presentation/components/alert';

type AlertProviderProps = { children: React.ReactNode };

export type AlertContextType = {
  showErrorAlert: (text: string) => void;
  showSuccessAlert: (text: string) => void;
  hideAlert: () => void;
};

export const AlertContext = createContext({} as AlertContextType);

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [alertText, setAlertText] = useState('');

  const showAlert = useCallback((type: AlertType, text: string) => {
    setAlertType(type);
    setAlertText(text);
    setIsAlertOpen(true);
  }, []);

  const showErrorAlert = useCallback((text: string) => showAlert('error', text), [showAlert]);

  const showSuccessAlert = useCallback((text: string) => showAlert('success', text), [showAlert]);

  const hideAlert = useCallback(() => setIsAlertOpen(false), []);

  return (
    <AlertContext.Provider value={{ hideAlert, showErrorAlert, showSuccessAlert }}>
      {children}
      {isAlertOpen && <Alert type={alertType} text={alertText} onUnmountAlert={hideAlert} />}
    </AlertContext.Provider>
  );
};
