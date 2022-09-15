import { FieldValidation } from '@/validation/protocols/field-validation';
import {
  MatchFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredValidation,
  ContainsNumberValidation,
  ContainsUppercaseValidation,
} from '@/validation/validators';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validators: FieldValidation[]
  ) {}

  static field(fieldName: string) {
    return new ValidationBuilder(fieldName, []);
  }

  required(customMessage?: string): ValidationBuilder {
    this.validators.push(new RequiredValidation(this.fieldName, customMessage));
    return this;
  }

  email(customMessage?: string): ValidationBuilder {
    this.validators.push(new EmailValidation(this.fieldName, customMessage));
    return this;
  }

  minLength(length: number, customMessage?: string): ValidationBuilder {
    this.validators.push(new MinLengthValidation(this.fieldName, length, customMessage));
    return this;
  }

  sameAs(fieldToCompare: string, customMessage?: string): ValidationBuilder {
    this.validators.push(new MatchFieldsValidation(this.fieldName, fieldToCompare, customMessage));
    return this;
  }

  mustContainNumber(customMessage?: string): ValidationBuilder {
    this.validators.push(new ContainsNumberValidation(this.fieldName, customMessage));
    return this;
  }

  mustContainUppercase(customMessage?: string): ValidationBuilder {
    this.validators.push(new ContainsUppercaseValidation(this.fieldName, customMessage));
    return this;
  }

  build(): FieldValidation[] {
    return this.validators;
  }
}
