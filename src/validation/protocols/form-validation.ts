import { FieldValidation } from './field-validation';

export interface FormValidation {
  validate(fieldName: string, formInputs: any): string | null;

  getValidations(): FieldValidation[];
}
