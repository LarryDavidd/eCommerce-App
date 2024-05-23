import Client from '@/shared/api/client/Client';

class ProductApi {
  async fetchQueryProductProjections(offset: number, limit: number) {
    const client = Client.getInstance().credentialsClient;
    return await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          offset,
          limit
        }
      })
      .execute()
      .then((data) => data)
      .catch((err) => err);
  }

  async fetchGetProductProjectionByID(id: string) {
    const client = Client.getInstance().credentialsClient;
    return await client
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute()
      .then((data) => data)
      .catch((err) => err);
  }

  async fetchQueryProductProjectionsByCategory(ids: string[]) {
    const client = Client.getInstance().credentialsClient;
    return await client
      .productProjections()
      .search()
      .get({ queryArgs: { filter: ids.map((id) => `categories.id:"${id}"`) } })
      .execute()
      .then((data) => data)
      .catch((err) => err);
  }

  async fetchProductProjectionSearch(language: string, text: string) {
    const client = Client.getInstance().credentialsClient;
    return await client
      .productProjections()
      .search()
      .get({ queryArgs: { fuzzy: true, 'text.en': text } })
      .execute()
      .then((data) => data)
      .catch((err) => err);
  }
}

export default ProductApi;
