import type { $Type, Struct } from 'tcomb'

declare module 'tcomb-validation' {

  declare type Path = Array<string | number>;

  declare type ValidationErrorT = Struct<{
    actual: any,
    expected: $Type,
    path: Path,
    message: string
  }>;

  declare type ValidationResultT = Struct<{
    errors: Array<ValidationErrorT>,
    value: any
  }>;

  declare var exports: {
    ValidationError: ValidationErrorT,
    ValidationResult: ValidationResultT,
    validate(x: any, type: $Type, options?: Object): ValidationResultT
  };

}