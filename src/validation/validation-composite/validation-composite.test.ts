import { faker } from '@faker-js/faker';

import { FieldValidationMock } from '@/validation/test/field-validation-mock';

import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationMock: FieldValidationMock[];
};

const makeSut = (field: string): SutTypes => {
  const validations = [
    new FieldValidationMock(field),
    new FieldValidationMock(field),
    new FieldValidationMock(field),
  ];
  return {
    sut: ValidationComposite.build(validations),
    fieldValidationMock: validations,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.random.word();
    const errorMessage = faker.random.words();
    const { sut, fieldValidationMock } = makeSut(fieldName);
    fieldValidationMock[1].errorMessage = errorMessage;
    const error = sut.validate(fieldName, '');
    expect(error).toBe(errorMessage);
  });

  test('Should return null if all validations pass', () => {
    const fieldName = faker.random.word();
    const fieldValue = faker.internet.email();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, fieldValue);
    expect(error).toBe(null);
  });
});
