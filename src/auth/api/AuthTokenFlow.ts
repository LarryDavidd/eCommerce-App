import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { config } from '@shared/api/config/config';
import fetcher from './fetcher';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import Token from './Token';

const { apiUrl, authUrl, clientId, projectKey, scopes, clientSecret } = config;

class AuthTokenFlow {
  private clientBuilder = new ClientBuilder();
  private tokenCashe = new Token();
  constructor() {}

  public createAnonUser() {
    return createApiBuilderFromCtpClient(this.clientBuilder.withAnonymousSessionFlow(this.getAnonOptions()).withHttpMiddleware(this.httpMiddlewareOptions).build()).withProjectKey({
      projectKey
    });
  }

  public createLoginedUser(username: string, password: string) {
    console.log(apiUrl, authUrl, clientId, projectKey, scopes, clientSecret);
    return createApiBuilderFromCtpClient(
      this.clientBuilder.withPasswordFlow(this.getLoginedOptions(username, password)).withHttpMiddleware(this.httpMiddlewareOptions).build()
    ).withProjectKey({ projectKey });
  }

  public createRefreshUser(refreshToken: string) {
    return createApiBuilderFromCtpClient(
      this.clientBuilder.withClientCredentialsFlow(this.getRefreshCostumerOptions(refreshToken)).withHttpMiddleware(this.httpMiddlewareOptions).build()
    ).withProjectKey({ projectKey });
  }

  public createCredentialsUser() {
    return createApiBuilderFromCtpClient(
      this.clientBuilder.withClientCredentialsFlow(this.getCredentialsCostumerOptions()).withHttpMiddleware(this.httpMiddlewareOptions).build()
    ).withProjectKey({ projectKey });
  }

  private getLoginedOptions(username: string, password: string): PasswordAuthMiddlewareOptions {
    const options: PasswordAuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      scopes: [scopes],
      fetch: fetcher,
      tokenCache: this.tokenCashe,
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
      tokenCache: this.tokenCashe,
      credentials: {
        clientId,
        clientSecret
      }
    };
    return options;
  }

  private getCredentialsCostumerOptions() {
    const options: AuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      scopes: [scopes],
      fetch: fetcher,
      tokenCache: this.tokenCashe,
      credentials: {
        clientId,
        clientSecret
      }
    };
    return options;
  }

  private getRefreshCostumerOptions(refreshToken: string) {
    const options: RefreshAuthMiddlewareOptions = {
      refreshToken,
      host: authUrl,
      projectKey,
      fetch: fetcher,
      tokenCache: this.tokenCashe,
      credentials: {
        clientId,
        clientSecret
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
