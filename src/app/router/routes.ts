import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@pages/LoginPage';

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      requiresGuest: true
    }
  }
];
