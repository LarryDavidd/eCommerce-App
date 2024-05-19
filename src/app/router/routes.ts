import { HomePage } from '@pages/HomePage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { LoginPage } from '@pages/LoginPage';
import { FavoritesPage } from '@pages/FavoritesPage';
import { CartPage } from '@pages/CartPage';
import NotFoundPage from '@/pages/NotFoundPage/ui/NotFoundPage.vue';

export const routes = [
  {
    path: '/',
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
