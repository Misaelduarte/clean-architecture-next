import { faker } from '@faker-js/faker';

import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation';

const makeSut = (fieldName: string, minLength = 5, message?: string) => {
  return new MinLengthValidation(fieldName, minLength, message);
};

describe('MinLengthValidation', () => {
  test('Should return error if field length is less than min length', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const validation = sut.validate({ [field]: faker.random.alphaNumeric(4) });
    expect(validation).toBe('Minimum of 5 characters');
  });

  test('Should return null if field length bigger or equal min length', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 6);
    const validation = sut.validate({ [field]: faker.random.alphaNumeric(6) });
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
    const sut = makeSut(field, 5, customErrorMessage);
    const validation = sut.validate({ [field]: faker.random.alphaNumeric(4) });
    expect(validation).toBe(customErrorMessage);
  });
});
