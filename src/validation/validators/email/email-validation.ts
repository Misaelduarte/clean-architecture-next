import { FieldValidation } from '@/validation/protocols/field-validation';
import { EMAIL_REGEX } from '@/validation/regex/regex';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string, readonly message = 'This email is not valid') {}

  validate(formInputs: any): string | null {
    const fieldValue = formInputs[this.field];
    if (fieldValue !== undefined) {
      return !fieldValue || EMAIL_REGEX.test(fieldValue) ? null : this.message;
    }
    return null;
  }
}
