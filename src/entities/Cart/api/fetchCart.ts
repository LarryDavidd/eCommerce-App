import Client from '@shared/api/client/Client';

class CartApi {
  public async createCartForCustomer(refresh_token: string) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refresh_token);
    return client
      .me()
      .carts()
      .post({
        body: { currency: 'USD' }
      })
      .execute()
      .then((data) => data.body)
      .catch((err) => err);
  }

  public async getCart(refresh_token: string) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refresh_token);
    return client
      .me()
      .activeCart()
      .get()
      .execute()
      .then((data) => data.body)
      .catch((err) => err);
  }

  public async addProductToCart(cartId: string, cartVersion: number, productId: string) {
    const client = Client.getInstance().anonymousClient;

    return await client
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{ action: 'addLineItem', productId }]
        }
      })
      .execute()
      .then((data) => data.body)
      .catch((err) => err);
  }

  public async removeProductFromCart(cartId: string, cartVersion: number, lineItemId: string) {
    const client = Client.getInstance().anonymousClient;

    return await client
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{ action: 'removeLineItem', lineItemId }]
        }
      })
      .execute()
      .then((data) => data.body)
      .catch((err) => err);
  }

  public async changeProductQuantity(cartId: string, cartVersion: number, lineItemId: string, quantity: number) {
    const client = Client.getInstance().anonymousClient;

    return await client
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{ action: 'changeLineItemQuantity', lineItemId, quantity }]
        }
      })
      .execute()
      .then((data) => data.body)
      .catch((err) => err);
  }
}

export default CartApi;
