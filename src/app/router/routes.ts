import { HomePage } from '@pages/HomePage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { LoginPage } from '@pages/LoginPage';
import { FavoritesPage } from '@pages/FavoritesPage';
import { CartPage } from '@pages/CartPage';

import { NotFoundPage } from '@/pages/NotFoundPage';
import { DetailedProductPage } from '@pages/DetailedProductPage';
import CatalogPage from '@/pages/CatalopPage';
import { UserProfilePage } from '@pages/UserProfilePage';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
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
    path: '/catalog',
    name: 'catalog',
    component: CatalogPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/detailed',
    name: 'detailed',
    component: DetailedProductPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfilePage
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage
  }
];
