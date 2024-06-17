import type { PersonalErrors } from '../ui/UserProfilePage.vue';
import type { AddressErrors } from '../components/AddressInfo.vue';
import type { Address, Personal } from '../model/useUserData';
import { validateBirthDate, validateName, validatePostalCode, validateStreet } from '@shared/validation/validation';

const ValidateAddress = (data: Address) => {
  const validations: Record<string, Function> = {
    city: validateName,
    street: validateStreet,
    postalCode: validatePostalCode
  };
  const errors: AddressErrors = {
    city: null,
    street: null,
    postalCode: null
  };
  for (const key in validations) {
    const validationFn = validations[key];
    let result = null;

    if (key === 'postalCode') result = validationFn(data[key as keyof AddressErrors], data.country);
    else result = validationFn(data[key as keyof AddressErrors]);

    if (result.errors) {
      const errorList = result.errors.map((error: any) => error.message).filter((message: any): message is string => message !== undefined);
      errors[key as keyof AddressErrors] = errorList.length > 0 ? errorList : null;
    } else {
      errors[key as keyof AddressErrors] = result.length > 0 ? result : null;
    }
  }
  return errors;
};

const ValidatePersonal = (data: Personal, validations: Record<string, Function>) => {
  const errors: PersonalErrors = {
    name: null,
    surname: null,
    email: null,
    password: null,
    dateOfBirth: null
  };
  for (const key in validations) {
    const validationFn = validations[key];
    if (validationFn && key !== 'dateOfBirth') {
      const result = validationFn(data[key as keyof Personal]);
      if (result.errors) {
        const errorList = result.errors.map((error: any) => error.message).filter((message: any): message is string => message !== undefined);
        errors[key as keyof Personal] = errorList.length > 0 ? errorList : null;
      } else {
        errors[key as keyof Personal] = null;
      }
    } else if (key === 'dateOfBirth') {
      if (!data.dateOfBirth) errors[key] = 'This field is required';
      else {
        const isValid = validateBirthDate(data[key]);
        errors[key] = isValid ? null : 'The user must be over 14 years old';
      }
    }
  }
  return errors;
};
export { ValidatePersonal, ValidateAddress };
