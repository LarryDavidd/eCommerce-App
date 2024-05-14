// validation.ts
import { create, test, enforce } from 'vest';

export const validateEmail = create((email: string) => {
  test('email', 'Email is required', () => {
    enforce(email).isNotEmpty();
  });

  test('email', 'Email must be a valid email address', () => {
    enforce(email).matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  test('email', 'Email must not contain leading or trailing whitespace', () => {
    enforce(email).matches(/^\S.*\S$/);
  });
});

export const validatePassword = create((password: string) => {
  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });

  test('password', 'Password must be at least 8 characters long', () => {
    enforce(password).longerThan(7);
  });

  test('password', 'Password must contain at least one digit', () => {
    enforce(password).matches(/[0-9]/);
  });

  test('password', 'Password must contain at least one uppercase letter', () => {
    enforce(password).matches(/[A-Z]/);
  });

  test('password', 'Password must contain at least one lowercase letter', () => {
    enforce(password).matches(/[a-z]/);
  });

  test('password', 'Password must contain at least one special character(!@#$%^&*)', () => {
    enforce(password).matches(/[!@#$%^&*]/);
  });

  test('password', 'Password must not contain leading or trailing whitespace', () => {
    enforce(password).matches(/^\S.*\S$/);
  });
});
export const validateBirthDate = (birthDate: Date) => {
  const currentDate = new Date();
  const minAgeDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDate());
  return birthDate <= minAgeDate;
};
export const validateName = create((name: string) => {
  test('username', 'Field must contain at least one character and no special characters or numbers', () => {
    enforce(name).matches(/^[a-zA-Z]+$/);
  });
});
export const validatePostalCode = (code: string, country: string) => {
  if (code == '') return ['Postal code is required'];
  if (country == 'Russia') {
    const codeRusFormat = /^\d{6}$/;
    if (!code.match(codeRusFormat)) {
      return ['The postal code does not correspond to the postal code of Russia (e.g 123456)'];
    }
  } else if (country == 'United States') {
    const codeAmericanFormat = /^\d{5}(?:[-\s]\d{4})?$/;
    if (!code.match(codeAmericanFormat)) {
      return ['The postal code does not match the postal code of the United States (e.g 12345)'];
    }
  }
  return [];
};
