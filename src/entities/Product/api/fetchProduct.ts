import Client from '@/shared/api/client/Client';

class ProductApi {
  async fetchQueryProductProjections(offset: number, limit: number) {
    const client = Client.getInstance().credentialsClient;
    return await client
      .productProjections()
      .get({
        queryArgs: {
          offset,
          limit
        }
      })
      .execute()
      .then((data) => data)
      .catch((err) => err);
    // console.log()
    // const urlEndpoint = `${URL}/product-projections?limit=${limit}&offset=${offset}`;

    // try {
    //   const res = await http.get<ProductProjectionPagedQueryResponseType>(urlEndpoint);
    //   const resOK = res.status >= 200 && res.status < 300;
    //   if (resOK) {
    //     const result = res.data;
    //     return result;
    //   }
    //   throw new Error('QueryProductProjections Response was not OK');
    // } catch (error) {
    //   return error as Error;
    // }
  }
}

export default ProductApi;
