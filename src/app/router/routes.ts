import { HomePage } from '@pages/HomePage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { LoginPage } from '@pages/LoginPage';
import { CartPage } from '@pages/CartPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { DetailedProductPage } from '@pages/DetailedProductPage';
import { CatalogPage } from '@pages/CatalopPage';
import { UserProfilePage } from '@pages/UserProfilePage';
import AboutUsPage from '@pages/AboutUsPage';

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
    component: CatalogPage
  },
  {
    path: '/product-page/:id',
    name: 'product-page',
    component: DetailedProductPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/detailed',
    name: 'detailed',
    component: DetailedProductPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfilePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUsPage
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
