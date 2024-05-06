import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  Client,
  AnonymousAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch
};

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'grka1007',
  credentials: {
    clientId: '2owzoZm-BNwMFzO2OOYvFsUx',
    clientSecret: 'orOZpSq7L24ySz8op9kQbSehlnpLxz5z'
  },
  scopes: [
    'manage_my_profile:grka1007 manage_my_orders:grka1007 manage_my_shopping_lists:grka1007 manage_my_payments:grka1007 create_anonymous_token:grka1007 manage_payments:grka1007 view_cart_discounts:grka1007 view_categories:grka1007 view_published_products:grka1007 manage_my_quote_requests:grka1007 manage_my_business_units:grka1007 view_orders:grka1007 view_discount_codes:grka1007 manage_products:grka1007 introspect_oauth_tokens:grka1007 manage_my_quotes:grka1007 manage_customers:grka1007'
  ],
  fetch
};

export const getCredentialFlowClient = (): Client => {
  const ctpClient = new ClientBuilder()
    .withProjectKey('grka1007')
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
};

const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecom_app',
  credentials: {
    clientId: '2owzoZm-BNwMFzO2OOYvFsUx',
    clientSecret: 'orOZpSq7L24ySz8op9kQbSehlnpLxz5z',
    anonymousId: 'ANONYMOUS_ID'
  },
  scopes: [
    'view_cart_discounts:ecom_app manage_orders:ecom_app view_project_settings:ecom_app manage_my_shopping_lists:ecom_app manage_customers:ecom_app view_messages:ecom_app view_published_products:ecom_app manage_my_profile:ecom_app view_shipping_methods:ecom_app manage_shopping_lists:ecom_app view_shopping_lists:ecom_app view_payments:ecom_app view_orders:ecom_app view_categories:ecom_app view_discount_codes:ecom_app manage_my_orders:ecom_app'
  ],
  fetch
};

export const getAnonymousFlowClient = (): Client => {
  const ctpClient = new ClientBuilder().withProjectKey('grka1007').withAnonymousSessionFlow(anonymousMiddlewareOptions).withHttpMiddleware(httpMiddlewareOptions).build();

  return ctpClient;
};

console.log(getAnonymousFlowClient());
