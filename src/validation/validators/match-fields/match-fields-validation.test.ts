import { faker } from '@faker-js/faker';

import { MatchFieldsValidation } from './match-fields-validation';

const makeSut = (field: string, fieldToCompare: string, message?: string) => {
  return new MatchFieldsValidation(field, fieldToCompare, message);
};

describe('MatchFieldsValidation', () => {
  test('Should return error if compare is not valid', () => {
    const field = 'any_field';
    const fieldToCompare = 'other_field';
    const sut = makeSut(field, fieldToCompare);
    const validation = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value',
    });
    expect(validation).toBe('The values must match');
  });

  test('Should return null if compare is valid', () => {
    const field = 'any_field';
    const fieldToCompare = 'other_field';
    const sut = makeSut(field, fieldToCompare);
    const value = faker.random.word();
    const validation = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(validation).toBe(null);
  });

  test('Should return null if any field do not exist', () => {
    const field = faker.database.column();
    const fieldToCompare = 'other_field';
    const sut = makeSut(field, fieldToCompare);
    const nonExistentField = `${field}2`;
    const value = faker.random.word();
    const validation = sut.validate({
      [nonExistentField]: value,
      [fieldToCompare]: value,
    });
    expect(validation).toBe(null);
  });

  test('Should return custom error message if provided', () => {
    const field = 'any_field';
    const fieldToCompare = 'other_field';
    const customErrorMessage = faker.random.words();
    const sut = makeSut(field, fieldToCompare, customErrorMessage);
    const validation = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value',
    });
    expect(validation).toBe(customErrorMessage);
  });
});
