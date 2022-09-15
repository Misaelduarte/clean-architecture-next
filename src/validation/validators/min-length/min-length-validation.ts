import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    readonly minLength: number,
    readonly message = `Minimum of ${minLength} characters`
  ) {}

  validate(formInputs: any): string | null {
    const fieldValue = formInputs[this.field];
    if (fieldValue !== undefined) {
      return fieldValue.trim().length >= this.minLength ? null : this.message;
    }
    return null;
  }
}
