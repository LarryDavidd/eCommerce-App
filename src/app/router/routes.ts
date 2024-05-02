import { LoginPage } from '@pages/LoginPage';

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      requiresGuest: true
    }
  }
];
