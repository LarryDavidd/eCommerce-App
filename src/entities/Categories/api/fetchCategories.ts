import Client from '@/shared/api/client/Client';

class CategoriesApi {
  async getAllCategories() {
    const client = Client.getInstance().credentialsClient;
    return await client
      .categories()
      .get()
      .execute()
      .then((data) => data.body.results)
      .catch((err) => err);
  }
}

export default CategoriesApi;
