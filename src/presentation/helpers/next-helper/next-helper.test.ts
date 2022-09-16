import { NextHelper } from './next-helper';

describe('NextHelper', () => {
  test('Shoud return true if the application is on client side', () => {
    expect(NextHelper.isOnClientSide()).toBe(true);
  });
});
