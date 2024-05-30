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
      .then((data) => data.body)
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
      .get({ queryArgs: { filter: `categories.id:${ids.map((id) => `subtree("${id}")`).join(', ')}` } })
      .execute()
      .then((data) => data)
      .catch((err) => err);
  }

  async fetchProductProjectionSearch(language: string, text: string) {
    const client = Client.getInstance().credentialsClient;
    return await client
      .productProjections()
      .search()
      .get({ queryArgs: { ['text.' + language]: text, fuzzy: true } })
      .execute()
      .then((data) => data)
      .catch((err) => err);
  }
}

export default ProductApi;