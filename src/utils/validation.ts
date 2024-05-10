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
