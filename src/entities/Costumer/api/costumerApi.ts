import Client from '@/shared/api/client/Client';
import { ByProjectKeyRequestBuilder, type CustomerDraft, type ErrorResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

class CostumerApi {
  static clientBuilder: ByProjectKeyRequestBuilder;
  constructor() {}

  public async loginCostumer(username: string, password: string) {
    const res = await Client.getInstance()
      .getPasswordFlowClient(username, password)
      .me()
      .get()
      .execute()
      .then((data) => data)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
    return res;
  }

  public async regCostumer(draft: CustomerDraft) {
    return await Client.getInstance()
      .anonymousClient.customers()
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
      .then((data) => data);
  }

  public async credentialsCostumer() {
    return Client.getInstance()
      .credentialsClient.me()
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
