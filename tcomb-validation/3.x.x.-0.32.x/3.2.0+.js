import type { TypeT, Struct } from 'tcomb'

declare module 'tcomb-validation' {

  declare type Path = Array<string | number>;

  declare type ValidationErrorT = Struct<{
    actual: any,
    expected: TypeT<*>,
    path: Path,
    message: string
  }>;

  declare type ValidationResultT = Struct<{
    errors: Array<ValidationErrorT>,
    value: any
  }>;

  declare type ValidationOptions = {
    path?: Path,
    context?: any
  };

  declare type ExtendedValidationOptions = Path | ValidationOptions;

  declare var exports: {
    ValidationError: ValidationErrorT,
    ValidationResult: ValidationResultT,
    validate(x: any, type: TypeT<*>, options?: ExtendedValidationOptions): ValidationResultT
  };

}