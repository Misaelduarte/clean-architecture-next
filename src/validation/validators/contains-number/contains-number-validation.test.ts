import { faker } from '@faker-js/faker';

import { ContainsNumberValidation } from './contains-number-validation';

const makeSut = (field: string, message?: string) => {
  return new ContainsNumberValidation(field, message);
};

describe('ContainsNumberValidation', () => {
  test('Should return error if field does not contain any number', () => {
    const field = 'any_field';
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: 'any_value' });
    expect(validation).toBe('Must contain at least one number');
  });

  test('Should return null if field contains at least one number', () => {
    const field = 'any_field';
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: 'any_value_1' });
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
    const field = 'any_field';
    const customErrorMessage = faker.random.words();
    const sut = makeSut(field, customErrorMessage);
    const validation = sut.validate({ [field]: 'any_value' });
    expect(validation).toBe(customErrorMessage);
  });
});
