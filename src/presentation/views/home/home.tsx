import { useState } from 'react';

import { PHONE_MASK } from '@/main/constants/masks';
import { Input } from '@/presentation/components/input';

import styles from './styles.module.scss';

export const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className={styles.container}>
      <h1>Home view</h1>
      <Input label="Enter your name" name="name" value={name} onChange={value => setName(value)} />
      <Input
        mask={PHONE_MASK}
        label="Enter your phone number *"
        name="phone"
        value={phone}
        onChange={value => setPhone(value)}
      />
    </div>
  );
};
