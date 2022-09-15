import {
  MatchFieldsValidation,
  ContainsNumberValidation,
  ContainsUppercaseValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredValidation,
} from '@/validation/validators';

import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredValidation', () => {
    const fieldName = 'any_field';
    const validations = ValidationBuilder.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredValidation(fieldName)]);
  });

  test('Should return EmailValidation', () => {
    const fieldName = 'any_field';
    const validations = ValidationBuilder.field(fieldName).email().build();
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('Should return MinLengthValidation', () => {
    const fieldName = 'any_field';
    const length = 10;
    const validations = ValidationBuilder.field(fieldName).minLength(length).build();
    expect(validations).toEqual([new MinLengthValidation(fieldName, length)]);
  });

  test('Should return MatchFieldsValidation', () => {
    const fieldName = 'any_field';
    const fieldToCompare = 'any_field_to_compare';
    const validations = ValidationBuilder.field(fieldName).sameAs(fieldToCompare).build();
    expect(validations).toEqual([new MatchFieldsValidation(fieldName, fieldToCompare)]);
  });

  test('Should return ContainsNumberValidation', () => {
    const fieldName = 'any_field';
    const validations = ValidationBuilder.field(fieldName).mustContainNumber().build();
    expect(validations).toEqual([new ContainsNumberValidation(fieldName)]);
  });

  test('Should return ContainsUppercaseValidation', () => {
    const fieldName = 'any_field';
    const validations = ValidationBuilder.field(fieldName).mustContainUppercase().build();
    expect(validations).toEqual([new ContainsUppercaseValidation(fieldName)]);
  });

  test('Should return a list of validations', () => {
    const field = 'any_field';
    const length = 10;
    const validations = ValidationBuilder.field(field).required().minLength(length).email().build();
    expect(validations).toEqual([
      new RequiredValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
