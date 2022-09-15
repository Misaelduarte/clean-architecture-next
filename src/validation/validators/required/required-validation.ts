import { FieldValidation } from '@/validation/protocols/field-validation';

export class RequiredValidation implements FieldValidation {
  constructor(readonly field: string, readonly message: string = 'This field is required') {}

  validate(formInputs: any): string | null {
    const fieldValue = formInputs[this.field];
    if (fieldValue !== undefined) {
      return fieldValue.trim().length === 0 ? this.message : null;
    }
    return null;
  }
}
