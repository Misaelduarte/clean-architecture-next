import { faker } from '@faker-js/faker';

import { RequiredValidation } from './required-validation';

const makeSut = (field: string, message?: string) => {
  return new RequiredValidation(field, message);
};

describe('RequiredValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: '' });
    expect(validation).toBe('This field is required');
  });

  test('Should return null if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: faker.random.word() });
    expect(validation).toBe(null);
  });

  test('Should return null if field does not exist', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const nonExistentField = `${field}2`;
    const validation = sut.validate({ [nonExistentField]: faker.random.word() });
    expect(validation).toBe(null);
  });

  test('Should return custom error message if provided', () => {
    const field = faker.database.column();
    const customErrorMessage = faker.random.words();
    const sut = makeSut(field, customErrorMessage);
    const validation = sut.validate({ [field]: '' });
    expect(validation).toBe(customErrorMessage);
  });
});
