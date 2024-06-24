import Client from '@/shared/api/client/Client';
import { ByProjectKeyRequestBuilder, type Cart, type CustomerDraft, type CustomerSignInResult, type ErrorResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

class CostumerApi {
  static clientBuilder: ByProjectKeyRequestBuilder;
  constructor() {}

  public async loginCostumer(username: string, password: string, cart: Cart | null) {
    this.logout();
    const res = await Client.getInstance()
      .getPasswordFlowClient(username, password)
      // .me()
      .login()
      .post({
        body: {
          email: username,
          password,
          anonymousId: cart?.anonymousId,
          anonymousCartId: cart?.id,
          anonymousCartSignInMode: cart ? 'MergeWithExistingCustomerCart' : undefined,
          updateProductData: cart ? true : undefined
        }
      })
      .execute()
      .then((data) => data as ClientResponse<CustomerSignInResult>)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
    return res;
  }

  public async regCostumer(draft: CustomerDraft) {
    return await Client.getInstance()
      .credentialsClient.customers()
      .post({
        body: draft
      })
      .execute()
      .then((data) => data)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public async anonCostumer() {
    return Client.getInstance()
      .anonymousClient.get()
      .execute()
      .then((data) => data)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public async credentialsCostumer() {
    return Client.getInstance()
      .credentialsClient.get()
      .execute()
      .then((data) => data);
  }

  public async refreshCostumer(refreshToken: string) {
    return Client.getInstance()
      .clientWithRefreshTokenFlow(refreshToken)
      .me()
      .get()
      .execute()
      .then((data) => data)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public async refreshAnonCostumer(refreshToken: string) {
    return Client.getInstance()
      .clientWithRefreshTokenFlow(refreshToken)
      .get()
      .execute()
      .then((data) => data)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public async existingCostumer(access_token: string) {
    return Client.getInstance()
      .clientWithRefreshTokenFlow(access_token)
      .get()
      .execute()
      .then((data) => data)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public logout() {
    Client.getInstance().clearApiRoot();
    Client.getInstance().clearTokenCashe();
  }
}

export default CostumerApi;
