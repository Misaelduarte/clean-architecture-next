import { FieldValidation } from '@/validation/protocols/field-validation';
import { UPPERCASE_REGEX } from '@/validation/regex/regex';

export class ContainsUppercaseValidation implements FieldValidation {
  constructor(readonly field: string, readonly message = 'Must contain at least one uppercase') {}

  validate(formInputs: any): string | null {
    const fieldValue = formInputs[this.field];
    if (fieldValue) {
      return fieldValue.match(UPPERCASE_REGEX) ? null : this.message;
    }
    return null;
  }
}
