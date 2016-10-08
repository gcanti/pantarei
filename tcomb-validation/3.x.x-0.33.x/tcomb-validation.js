declare module 'tcomb-validation' {

  declare type Path = Array<string | number>;

  declare interface ValidationError {
    actual: any;
    expected: Tcomb$Type<*>;
    path: Path;
    message: string;
  }

  declare interface ValidationResult<T> {
    errors: Array<ValidationError>;
    value: T;
  }

  declare type ValidationOptions = {
    path?: Path,
    context?: any
  };

  declare var exports: {
    validate<T>(x: any, type: Tcomb$Type<T>, options?: ValidationOptions): ValidationResult<T>
  };

}
