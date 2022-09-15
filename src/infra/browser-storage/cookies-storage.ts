import { Cookies } from 'react-cookie';

import { BrowserStorage, SetItemOptions } from '@/data/protocols/browser-storage';

const cookies = new Cookies();
export class CookiesStorage implements BrowserStorage {
  getItem(key: string): string | object | null {
    try {
      const value = cookies.get(key);
      return value || null;
    } catch (error) {
      return null;
    }
  }

  setItem(key: string, value: string | object | null, options?: SetItemOptions): void {
    if (value) {
      cookies.set(key, value, options);
    } else {
      cookies.remove(key, options);
    }
  }
}
