import { FieldValidation } from '@/validation/protocols/field-validation';

export class MatchFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string,
    readonly message = 'The values must match'
  ) {}

  validate(formInputs: any): string | null {
    const fieldValue = formInputs[this.field];
    const fieldToCompareValue = formInputs[this.fieldToCompare];
    if (fieldValue !== undefined && fieldToCompareValue !== undefined) {
      return fieldValue === fieldToCompareValue ? null : this.message;
    }
    return null;
  }
}
