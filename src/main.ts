import '@app/styles/tailwind.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@app/App.vue';
import router from '@app/router';
import CostumerApi from './entities/Costumer/api/costumerApi';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');

// new CostumerApi().existingCostumer();
new CostumerApi().loginCostumer('seb@example.uk', 'asdfjkl1');

// import fetch from 'node-fetch';
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import {
//   ClientBuilder,

//   // Import middlewares
//   type AuthMiddlewareOptions, // Required for auth
//   type HttpMiddlewareOptions,
//   type Client,
//   type AnonymousAuthMiddlewareOptions
// } from '@commercetools/sdk-client-v2';

// // Configure httpMiddlewareOptions
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: 'https://api.europe-west1.gcp.commercetools.com',
//   fetch
// };

// // Configure authMiddlewareOptions
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: 'https://auth.europe-west1.gcp.commercetools.com',
//   projectKey: 'grka1007',
//   credentials: {
//     clientId: '2owzoZm-BNwMFzO2OOYvFsUx',
//     clientSecret: 'orOZpSq7L24ySz8op9kQbSehlnpLxz5z'
//   },
//   scopes: [
//     'manage_my_profile:grka1007 manage_my_orders:grka1007 manage_my_shopping_lists:grka1007 manage_my_payments:grka1007 create_anonymous_token:grka1007 manage_payments:grka1007 view_cart_discounts:grka1007 view_categories:grka1007 view_published_products:grka1007 manage_my_quote_requests:grka1007 manage_my_business_units:grka1007 view_orders:grka1007 view_discount_codes:grka1007 manage_products:grka1007 introspect_oauth_tokens:grka1007 manage_my_quotes:grka1007 manage_customers:grka1007'
//   ],
//   fetch
// };

// export const getCredentialFlowClient = (): Client => {
//   const ctpClient = new ClientBuilder()
//     .withProjectKey('grka1007')
//     .withClientCredentialsFlow(authMiddlewareOptions)
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withLoggerMiddleware()
//     .build();

//   return ctpClient;
// };

// const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
//   host: 'https://auth.europe-west1.gcp.commercetools.com',
//   projectKey: 'grka1007',
//   credentials: {
//     clientId: '2owzoZm-BNwMFzO2OOYvFsUx',
//     clientSecret: 'orOZpSq7L24ySz8op9kQbSehlnpLxz5z',
//     anonymousId: 'ANONYMOUS_ID'
//   },
//   scopes: [
//     'view_cart_discounts:grka1007 manage_orders:grka1007 view_project_settings:grka1007 manage_my_shopping_lists:grka1007 manage_customers:grka1007 view_messages:grka1007 view_published_products:grka1007 manage_my_profile:grka1007 view_shipping_methods:grka1007 manage_shopping_lists:grka1007 view_shopping_lists:grka1007 view_payments:grka1007 view_orders:grka1007 view_categories:grka1007 view_discount_codes:grka1007 manage_my_orders:grka1007'
//   ],
//   fetch
// };

// export const getAnonymousFlowClient = (): Client => {
//   const client = new ClientBuilder();
//   const withKeyClient = client.withProjectKey('grka1007');
//   const withSessionFlow = withKeyClient.withAnonymousSessionFlow(anonymousMiddlewareOptions);
//   const withMiddleware = withSessionFlow.withHttpMiddleware(httpMiddlewareOptions);
//   const build = withMiddleware.build();
//   console.log(client, withKeyClient, withSessionFlow, withMiddleware, build);
//   const ctpClient = new ClientBuilder().withProjectKey('grka1007').withAnonymousSessionFlow(anonymousMiddlewareOptions).withHttpMiddleware(httpMiddlewareOptions).build();

//   return ctpClient;
// };

// export const getApiRootForAnonymousFlow = () => {
//   const apiRootForAnonumousFlow = createApiBuilderFromCtpClient(getAnonymousFlowClient()).withProjectKey({
//     projectKey: 'grka1007'
//   });

//   return apiRootForAnonumousFlow;
// };

// console.log(getAnonymousFlowClient());
