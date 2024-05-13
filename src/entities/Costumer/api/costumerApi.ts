import AuthTokenFlow from '@/auth/api/AuthTokenFlow';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Client } from '@commercetools/sdk-client-v2';

class CostumerApi {
  private authTokenFlow = new AuthTokenFlow();
  static clientBuilder: ByProjectKeyRequestBuilder;
  constructor() {}

  public async loginCostumer(username: string, password: string) {
    CostumerApi.clientBuilder = this.authTokenFlow.createLoginedUser(username, password);
    return CostumerApi.clientBuilder
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute()
      .then((data) => console.log(data));
  }

  public async anonCostumer() {
    const anonUserBuilder = this.authTokenFlow.createAnonUser();
    anonUserBuilder
      .products()
      .get()
      .execute()
      .then((data) => console.log(data));
    anonUserBuilder
      .me()
      .carts()
      .get()
      .execute()
      .then((data) => console.log(data));
    // .carts()
    // .post({ body: { currency: 'USD' } })
    // .execute()
    // .then((data) => console.log(data));
  }

  public async existingCostumer() {
    return this.authTokenFlow
      .createExistingUser()
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute()
      .then((data) => console.log(data));
  }
}

export default CostumerApi;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const loginCustommer = async (email: string, password: string) => {
// createApiBuilderFromCtpClient(getClient())
//   .withProjectKey({ projectKey: 'grka1007' })
//   .me()
//   .carts()
//   .post({ body: { currency: 'USD' } })
//   .execute();

// createApiBuilderFromCtpClient(getClient({ username: email, password }))
//   .withProjectKey({ projectKey: 'grka1007' })
//   .me()
//   .carts()
//   .post({ body: { currency: 'USD' } })
//   .execute();

// getApiRootForPasswordFlow(email, password);
// const anonRoot = getApiRootForAnonymousFlow();
// anonRoot.carts().get().execute();
// createApiBuilderFromCtpClient(anonRoot);
// return getApiRootForPasswordFlow(email, password)
//   .me()
//   .login()
//   .post({
//     body: {
//       email,
//       password,
//       updateProductData: true
//       // activeCartSignInMode: 'MergeWithExistingCustomerCart'
//     }
//   })
//   .execute()
//   .then((data) => {
//     console.log(data);
//     localStorage.setItem('id', data.body.customer.id);
//     const token = myToken.get().token;
//     localStorage.setItem('token', token);
//   });
// };
