import { FormValidation } from '@/validation/protocols/form-validation';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class ValidationComposite implements FormValidation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, formInputs: any): string | null {
    const validators = this.validators.filter(validator => validator.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(formInputs);
      if (error) {
        return error;
      }
    }
    return null;
  }

  getValidations(): FieldValidation[] {
    return this.validators;
  }
}
