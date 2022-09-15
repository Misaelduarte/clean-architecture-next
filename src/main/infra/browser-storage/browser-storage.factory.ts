import { BrowserStorage } from '@/data/protocols/browser-storage';
import { CookiesStorage } from '@/infra/browser-storage/cookies-storage';

export function makeBrowserStorage(): BrowserStorage {
  return new CookiesStorage();
}
