import Client from '@/shared/api/client/Client';
import { ByProjectKeyRequestBuilder, type CustomerDraft } from '@commercetools/platform-sdk';

class CostumerApi {
  static clientBuilder: ByProjectKeyRequestBuilder;
  constructor() {}

  public async loginCostumer(username: string, password: string) {
    return Client.getInstance()
      .getPasswordFlowClient(username, password)
      .me()
      .get()
      .execute()
      .then((data) => data);
  }

  public async regCostumer(draft: CustomerDraft) {
    return Client.getInstance()
      .anonymousClient.customers()
      .post({
        body: draft
      })
      .execute();
  }

  public async anonCostumer() {
    return Client.getInstance()
      .anonymousClient.me()
      .get()
      .execute()
      .then((data) => data);
    // anonUserBuilder
    //   .products()
    //   .get()
    //   .execute()
    //   .then((data) => console.log(data));
    // anonUserBuilder
    //   .me()
    //   .carts()
    //   .get()
    //   .execute()
    //   .then((data) => console.log(data));
  }

  public async credentialsCostumer() {
    return Client.getInstance()
      .clientCredentialsClient.me()
      .get()
      .execute()
      .then((data) => data);
  }

  public async refreshCostumer(refreshToken: string) {
    return Client.getInstance()
      .clientWithRefreshTokenFlow(refreshToken)
      .me()
      .get()
      .execute()
      .then((data) => data);
    // .me()
    // .carts()
    // .post({ body: { currency: 'USD' } })
    // .execute()
    // .then((data) => console.log(data));
  }

  public async existingCostumer(access_token: string) {
    return Client.getInstance()
      .clientWithExistTokenFlow(access_token)
      .me()
      .get()
      .execute()
      .then((data) => data);
  }
}

export default CostumerApi;
