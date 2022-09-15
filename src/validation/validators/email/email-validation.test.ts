import { faker } from '@faker-js/faker';

import { EmailValidation } from './email-validation';

const makeSut = (field: string, message?: string) => {
  return new EmailValidation(field, message);
};

describe('EmailValidation', () => {
  test('Should return error if email is not valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: faker.random.word() });
    expect(validation).toBe('This email is not valid');
  });

  test('Should return null if email is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: faker.internet.email() });
    expect(validation).toBe(null);
  });

  test('Should return null if email is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: '' });
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
    const validation = sut.validate({ [field]: faker.random.word() });
    expect(validation).toBe(customErrorMessage);
  });
});
