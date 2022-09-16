import { createContext, useCallback, useContext, useState } from 'react';

import { Modal } from '@/presentation/components/modal';

type ModalProviderProps = {
  children: React.ReactNode;
};

type ModalProps = {
  title?: string | JSX.Element;
  content: React.ReactNode;
  size?: 'large' | 'default' | 'small';
  closeable?: boolean;
};

export type ModalContextProviderType = {
  isModalOpen: boolean;
  showModal: (props: ModalProps) => void;
  hideModal: () => void;
};

export const ModalContext = createContext({} as ModalContextProviderType);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestModalClose, setRequestModalClose] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>();

  const showModal = useCallback((props: ModalProps) => {
    setIsModalOpen(true);
    setModalProps(props);
  }, []);

  const hideModal = useCallback(() => {
    setRequestModalClose(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setRequestModalClose(false);
    setModalProps(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, showModal, hideModal }}>
      {children}
      {isModalOpen && (
        <Modal
          title={modalProps?.title}
          onClose={handleModalClose}
          size={modalProps?.size}
          requestModalClose={requestModalClose}
          closeable={modalProps?.closeable}
        >
          {modalProps?.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
