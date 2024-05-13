import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type Client,
  type ExistingTokenMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { config } from '@shared/api/config/config';
import fetcher from './fetcher';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const { apiUrl, authUrl, clientId, projectKey, scopes, clientSecret } = config;

class AuthTokenFlow {
  private clientBuilder: ClientBuilder = new ClientBuilder();
  constructor() {}

  public createAnonUser() {
    return createApiBuilderFromCtpClient(this.clientBuilder.withAnonymousSessionFlow(this.getAnonOptions()).withHttpMiddleware(this.httpMiddlewareOptions).build()).withProjectKey({
      projectKey
    });
  }

  public createLoginedUser(username: string, password: string) {
    return createApiBuilderFromCtpClient(
      this.clientBuilder.withPasswordFlow(this.getLoginedOptions(username, password)).withHttpMiddleware(this.httpMiddlewareOptions).build()
    ).withProjectKey({ projectKey });
  }

  public createExistingUser() {
    const authorization = `Bearer ${localStorage.getItem('access_token')}`;
    console.log(localStorage.getItem('access_token'));

    const options: ExistingTokenMiddlewareOptions = {
      force: true
    };
    return createApiBuilderFromCtpClient(this.clientBuilder.withExistingTokenFlow(authorization, options).withHttpMiddleware(this.httpMiddlewareOptions).build()).withProjectKey({
      projectKey
    });
  }

  private getLoginedOptions(username: string, password: string): PasswordAuthMiddlewareOptions {
    const options: PasswordAuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      scopes: [scopes],
      fetch: fetcher,
      credentials: {
        clientId,
        clientSecret,
        user: { password, username }
      }
    };
    return options;
  }

  private getAnonOptions() {
    const options: AnonymousAuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      scopes: [scopes],
      fetch: fetcher,
      credentials: {
        clientId,
        clientSecret,
        anonymousId: `anon-${Date.now()}-id`
      }
    };
    return options;
  }

  private get httpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: apiUrl,
      fetch
    };
  }
}

export default AuthTokenFlow;

// // import { config } from '@shared/api/config/config';
// import fetch from 'node-fetch';
// import { createApiBuilderFromCtpClient, type CartDraft } from '@commercetools/platform-sdk';
// import {
//   ClientBuilder,

//   // Import middlewares
//   type AuthMiddlewareOptions, // Required for auth
//   type HttpMiddlewareOptions,
//   type PasswordAuthMiddlewareOptions,
//   type Client,
//   type AnonymousAuthMiddlewareOptions,
//   type RefreshAuthMiddlewareOptions
// } from '@commercetools/sdk-client-v2';

// const CTP_PROJECT_KEY = 'grka1007';
// const CTP_CLIENT_SECRET = 'orOZpSq7L24ySz8op9kQbSehlnpLxz5z';
// const CTP_CLIENT_ID = '2owzoZm-BNwMFzO2OOYvFsUx';
// const CTP_AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
// const CTP_API_URL = 'https://api.europe-west1.gcp.commercetools.com';
// const CTP_SCOPES =
//   'manage_my_profile:grka1007 manage_my_orders:grka1007 manage_my_shopping_lists:grka1007 manage_my_payments:grka1007 create_anonymous_token:grka1007 manage_payments:grka1007 view_cart_discounts:grka1007 view_categories:grka1007 view_published_products:grka1007 manage_my_quote_requests:grka1007 manage_my_business_units:grka1007 view_orders:grka1007 view_discount_codes:grka1007 manage_products:grka1007 introspect_oauth_tokens:grka1007 manage_my_quotes:grka1007 manage_customers:grka1007';
// const env = import.meta.env;

// const ANONYMOUS_ID = 'ANONYMOUS_ID';

// import fetch from 'node-fetch';
// import {
//   ClientBuilder,
//   type AnonymousAuthMiddlewareOptions,

//   // Import middlewares
//   type AuthMiddlewareOptions, // Required for auth
//   type HttpMiddlewareOptions // Required for sending HTTP requests
// } from '@commercetools/sdk-client-v2';

// const projectKey = CTP_PROJECT_KEY;
// const scopes = [CTP_SCOPES];

// async function fetcher(...args: Parameters<typeof fetch>): Promise<Response> {
//   const response = await fetch(...args);
//   const clone = response.clone();
//   const data: TokenResponse = await clone.json();

//   console.log(data);

//   return response;
// }

// Configure authMiddlewareOptions
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: CTP_AUTH_URL,
//   projectKey: projectKey,
//   credentials: {
//     clientId: CTP_CLIENT_ID,
//     clientSecret: CTP_CLIENT_SECRET
//   },
//   scopes,
//   fetch: fetcher
// };

// Configure httpMiddlewareOptions
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: CTP_API_URL,
//   fetch
// };

// Export the ClientBuilder
// export const ctpClient = new ClientBuilder()
//   .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware() // Include middleware for logging
//   .build();

// import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import type { TokenResponse } from './build-client';

// Create apiRoot from the imported ClientBuilder and include your Project key
// const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: CTP_PROJECT_KEY });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// export const getProject = async () => {
//   return apiRoot
//     .carts()
//     .post({ body: { currency: 'USD' } })
//     .execute()
//     .then((data) => localStorage.setItem('here', JSON.stringify(data)));
// };

// Retrieve Project information and output the result to the log

// import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

// export default class MyToken implements TokenCache {
//   private cache: TokenStore = {
//     token: '',
//     expirationTime: 0,
//     refreshToken: undefined
//   };

//   get(): TokenStore {
//     return this.cache;
//   }

//   set(cache: TokenStore): void {
//     this.cache = cache;
//   }
// }

// export const myToken = new MyToken();

// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: CTP_AUTH_URL,
//   projectKey: CTP_PROJECT_KEY,
//   credentials: {
//     clientId: CTP_CLIENT_ID,
//     clientSecret: CTP_CLIENT_SECRET
//   },
//   scopes: [CTP_SCOPES],
//   fetch
// };

// // Configure httpMiddlewareOptions
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: CTP_API_URL,
//   fetch
// };

// const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
//   host: CTP_AUTH_URL,
//   projectKey: CTP_PROJECT_KEY,
//   credentials: {
//     clientId: CTP_CLIENT_ID,
//     clientSecret: CTP_CLIENT_SECRET,
//     anonymousId: ANONYMOUS_ID
//   },
//   scopes: [CTP_SCOPES],
//   fetch
// };

// function getPasswordFlowOptions(username: string, password: string) {
//   const options: PasswordAuthMiddlewareOptions = {
//     host: CTP_AUTH_URL,
//     projectKey: CTP_PROJECT_KEY,
//     credentials: {
//       clientId: CTP_CLIENT_ID,
//       clientSecret: CTP_CLIENT_SECRET,
//       user: {
//         username: username,
//         password: password
//       }
//     },
//     tokenCache: myToken,
//     scopes: [CTP_SCOPES],
//     fetch
//   };
//   return options;
// }
// export const getCredentialFlowClient = (): Client => {
//   const ctpClient = new ClientBuilder()
//     .withProjectKey(CTP_PROJECT_KEY)
//     .withClientCredentialsFlow(authMiddlewareOptions)
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withLoggerMiddleware()
//     .build();

//   return ctpClient;
// };

// export const getAnonymousFlowClient = (): Client => {
//   const ctpClient = new ClientBuilder().withProjectKey(CTP_PROJECT_KEY).withAnonymousSessionFlow(anonymousMiddlewareOptions).withHttpMiddleware(httpMiddlewareOptions).build();

//   return ctpClient;
// };

// export const getPasswordFlowClient = (username: string, password: string): Client => {
//   const ctpClient = new ClientBuilder()
//     .withProjectKey(CTP_PROJECT_KEY)
//     .withClientCredentialsFlow(authMiddlewareOptions)
//     .withPasswordFlow(getPasswordFlowOptions(username, password))
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withLoggerMiddleware() // Include middleware for logging
//     .build();

//   return ctpClient;
// };

// export const getApiRootForCredentialFlow = () => {
//   const apiRootForAnonumousFlow = createApiBuilderFromCtpClient(getCredentialFlowClient()).withProjectKey({
//     projectKey: CTP_PROJECT_KEY
//   });

//   return apiRootForAnonumousFlow;
// };

// export const getApiRootForAnonymousFlow = () => {
//   const apiRootForAnonumousFlow = createApiBuilderFromCtpClient(getAnonymousFlowClient()).withProjectKey({
//     projectKey: CTP_PROJECT_KEY
//   });

//   return apiRootForAnonumousFlow.get().execute();
// };

// export const getApiRootForPasswordFlow = (username: string, password: string) => {
//   const apiRootForPasswordFlow = createApiBuilderFromCtpClient(getPasswordFlowClient(username, password)).withProjectKey({
//     projectKey: CTP_PROJECT_KEY
//   });

//   return apiRootForPasswordFlow;
// };

// type ExistingTokenMiddlewareOptions = {
//   force?: boolean;
// };

// export const getExistingTokenFlowClient = (): Client => {
//   const authorization = `Bearer ${localStorage.getItem('token')}`;

//   const options: ExistingTokenMiddlewareOptions = {
//     force: true
//   };
//   const ctpClient = new ClientBuilder().withProjectKey(CTP_PROJECT_KEY).withHttpMiddleware(httpMiddlewareOptions).withExistingTokenFlow(authorization, options).build();

//   return ctpClient;
// };

// export const getAPIRootWithExistingTokenFlow = () => {
//   const apiRootWithExistingTokenFlow = createApiBuilderFromCtpClient(getExistingTokenFlowClient()).withProjectKey({
//     projectKey: CTP_PROJECT_KEY
//   });
//   return apiRootWithExistingTokenFlow;
// };

// export const getApiRefreshTokenRoot = () => {
//   const refreshOptions: RefreshAuthMiddlewareOptions = {
//     ...authMiddlewareOptions,
//     refreshToken: myToken.get().token
//   };
//   const ctpClient = new ClientBuilder()
//     .withProjectKey(CTP_PROJECT_KEY)
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withRefreshTokenFlow(refreshOptions)
//     .withLoggerMiddleware()
//     .build();

//   return ctpClient;
// };
