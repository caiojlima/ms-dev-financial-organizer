import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotZero', async: false })
export class IsNotZeroConstraint implements ValidatorConstraintInterface {
  validate(value: number): boolean {
    return value !== 0;
  }

  defaultMessage(): string {
    return 'O valor não pode ser 0';
  }
}

export function IsNotZero(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotZero',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotZeroConstraint,
    });
  };
}
