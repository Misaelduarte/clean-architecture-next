import { FieldValidation } from '@/validation/protocols/field-validation';

export class FieldValidationMock implements FieldValidation {
  errorMessage: string | null = null;

  constructor(readonly field: string, readonly message: string = 'Default error message') {}

  validate(): string | null {
    return this.errorMessage;
  }
}
