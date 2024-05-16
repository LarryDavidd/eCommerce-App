import AuthTokenFlow from '@/auth/api/AuthTokenFlow';
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

class Client {
  private static instance: Client;
  private authTokenFlow = new AuthTokenFlow();

  private cachedClients: {
    clientCredentials?: ByProjectKeyRequestBuilder;
    passwordFlow?: ByProjectKeyRequestBuilder;
    anonymous?: ByProjectKeyRequestBuilder;
    existingTokenClient?: ByProjectKeyRequestBuilder;
  } = {};

  constructor() {}

  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }

  get credentialsClient() {
    if (!this.cachedClients.clientCredentials) {
      this.cachedClients.clientCredentials = this.authTokenFlow.createCredentialsUser();
    }

    return this.cachedClients.clientCredentials;
  }

  getPasswordFlowClient(email: string, password: string) {
    if (!this.cachedClients.passwordFlow) {
      this.cachedClients.passwordFlow = this.authTokenFlow.createLoginedUser(email, password);
    }

    return this.cachedClients.passwordFlow;
  }

  get anonymousClient() {
    if (!this.cachedClients.anonymous) {
      this.cachedClients.anonymous = this.authTokenFlow.createAnonUser();
    }

    return this.cachedClients.anonymous;
  }

  clientWithRefreshTokenFlow(refreshToken: string) {
    if (!this.cachedClients.existingTokenClient) {
      this.cachedClients.existingTokenClient = this.authTokenFlow.createRefreshUser(refreshToken);
    }

    return this.cachedClients.existingTokenClient;
  }

  clientWithExistTokenFlow(accessToken: string) {
    if (!this.cachedClients.existingTokenClient) {
      this.cachedClients.existingTokenClient = this.authTokenFlow.createExistUser(accessToken);
    }

    return this.cachedClients.existingTokenClient;
  }

  clearApiRoot() {
    this.cachedClients = { ...this.cachedClients, passwordFlow: undefined, existingTokenClient: undefined };
  }
}

export default Client;
