import { useEffect } from 'react';

import { useAlertContext } from '@/presentation/contexts/alert-context';
import { useModalContext } from '@/presentation/contexts/modal-context';

import styles from './styles.module.scss';

export const AdminDashboard: React.FC = () => {
  const { showModal } = useModalContext();
  const { showSuccessAlert } = useAlertContext();

  const handleShowModal = () => {
    showModal({
      title: 'Modal example',
      content: <h1>Modal content</h1>,
    });
  };

  useEffect(() => {
    showSuccessAlert('Template loaded successfully');
  }, [showSuccessAlert]);

  return (
    <>
      <h1 className={styles.title}>Admin Dashboard page</h1>
      <button onClick={handleShowModal}>Show modal</button>
    </>
  );
};
