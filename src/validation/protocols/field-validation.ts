export interface FieldValidation {
  field: string;
  message: string;
  validate: (formInputs: any) => string | null;
}
