import { FieldValidation } from '@/validation/protocols/field-validation';
import { NUMBER_REGEX } from '@/validation/regex/regex';

export class ContainsNumberValidation implements FieldValidation {
  constructor(readonly field: string, readonly message = 'Must contain at least one number') {}

  validate(formInputs: any): string | null {
    const fieldValue = formInputs[this.field];
    if (fieldValue !== undefined) {
      return NUMBER_REGEX.test(fieldValue) ? null : this.message;
    }
    return null;
  }
}
