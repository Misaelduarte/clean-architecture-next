import { Sidebar } from '@/presentation/components/sidebar';

import styles from './styles.module.scss';

export const DashboardWrapper: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main>
        <header>
          <h1>Title</h1>
          <p>Header component</p>
        </header>
        <div>oi</div>
      </main>
    </div>
  );
};
