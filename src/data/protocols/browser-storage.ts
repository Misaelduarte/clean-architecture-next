export type SetItemOptions = {
  domain?: string;
  expires?: Date;
};

export interface BrowserStorage {
  getItem: (key: string) => string | object | null;
  setItem: (key: string, value: any, options?: SetItemOptions) => void;
}
