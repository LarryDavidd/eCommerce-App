import Client from '@/shared/api/client/Client';
import { useLocalStorage } from '@/shared/lib/composables/useLocalStorage';
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

  public async credentialsCostumer() {
    return Client.getInstance()
      .clientCredentialsClient.me()
      .get()
      .execute()
      .then((data) => console.log(data));
  }

  public async refreshCostumer() {
    const refreshToken = useLocalStorage().load('refresh_token');
    if (refreshToken) {
      return Client.getInstance()
        .clientWithRefreshTokenFlow(String(refreshToken))
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

  public async existingCostumer() {
    const access_token = useLocalStorage().load('access_token');
    if (access_token) {
      return Client.getInstance()
        .clientWithExistTokenFlow(String(access_token))
        .me()
        .get()
        .execute()
        .then((data) => console.log(data));
    } else {
      return null;
    }
  }
}

export default CostumerApi;
