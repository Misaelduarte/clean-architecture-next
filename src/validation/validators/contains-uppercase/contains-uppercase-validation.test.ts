import { faker } from '@faker-js/faker';

import { ContainsUppercaseValidation } from './contains-uppercase-validation';

const makeSut = (field: string, message?: string) => {
  return new ContainsUppercaseValidation(field, message);
};

describe('ContainsUppercaseValidation', () => {
  test('Should return error if field does not cointain any uppercase', () => {
    const field = 'any_field';
    const sut = makeSut('any_field');
    const validation = sut.validate({ [field]: 'any_value' });
    expect(validation).toBe('Must contain at least one uppercase');
  });

  test('Should return null if field contains at least one uppercase', () => {
    const field = 'any_field';
    const sut = makeSut('any_field');
    const validation = sut.validate({ [field]: 'any_Value' });
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
    const sut = makeSut('any_field', customErrorMessage);
    const validation = sut.validate({ [field]: 'any_value' });
    expect(validation).toBe(customErrorMessage);
  });
});
