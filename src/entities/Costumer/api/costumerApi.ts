import Client from '@/shared/api/client/Client';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

class CostumerApi {
  static clientBuilder: ByProjectKeyRequestBuilder;
  constructor() {}

  public async loginCostumer(username: string, password: string) {
    return Client.getInstance()
      .getPasswordFlowClient(username, password)
      .me()
      .get()
      .execute()
      .then((data) => console.log(data));
  }

  public async anonCostumer() {
    return Client.getInstance()
      .anonymousClient.me()
      .get()
      .execute()
      .then((data) => console.log(data));
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

  public async existingCostumer() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return Client.getInstance()
        .clientWithRefreshTokenFlow(refreshToken)
        .me()
        .get()
        .execute()
        .then((data) => console.log(data));
      // .me()
      // .carts()
      // .post({ body: { currency: 'USD' } })
      // .execute()
      // .then((data) => console.log(data));
    } else {
      return null;
    }
  }
}

export default CostumerApi;
