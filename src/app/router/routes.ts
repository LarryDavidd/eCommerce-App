import { HomePage } from '@pages/HomePage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { LoginPage } from '@pages/LoginPage';
import { FavoritesPage } from '@pages/FavoritesPage';
import { CartPage } from '@pages/CartPage';

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: {
      requiresGuest: true
    }
  }
];
