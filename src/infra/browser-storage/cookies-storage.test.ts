import { faker } from '@faker-js/faker';
import { Cookies } from 'react-cookie';

import { CookiesStorage } from './cookies-storage';

type SutTypes = {
  cookiesStorageAdapter: CookiesStorage;
};

const makeSut = (): SutTypes => {
  const cookiesStorageAdapter = new CookiesStorage();
  return { cookiesStorageAdapter };
};

describe('CookiesStorageAdapter', () => {
  test('Should call Cookies.set with correct values', () => {
    jest.spyOn(Cookies.prototype, 'set');
    const { cookiesStorageAdapter } = makeSut();
    const key = faker.random.word();
    const value = faker.random.word();
    cookiesStorageAdapter.setItem(key, value);
    expect(Cookies.prototype.set).toHaveBeenCalledWith(key, value, undefined);
  });

  test('Should return null if getItem key is not set', () => {
    const { cookiesStorageAdapter } = makeSut();
    const key = faker.random.word();
    const value = cookiesStorageAdapter.getItem(key);
    expect(value).toBe(null);
  });

  test('Should return the correct value if getItem key is set', () => {
    const { cookiesStorageAdapter } = makeSut();
    const keyString = faker.random.word();
    const valueString = faker.random.word();
    cookiesStorageAdapter.setItem(keyString, valueString);
    expect(cookiesStorageAdapter.getItem(keyString)).toBe(valueString);
    const keyObject = faker.random.word();
    const valueObject = { [faker.database.column()]: faker.random.word() };
    cookiesStorageAdapter.setItem(keyObject, valueObject);
    expect(cookiesStorageAdapter.getItem(keyObject)).toEqual(valueObject);
  });
});
