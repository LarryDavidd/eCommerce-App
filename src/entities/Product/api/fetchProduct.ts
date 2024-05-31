import Client from '@/shared/api/client/Client';
import { useFilterStore } from '../store/filterStore';
import { useAppState } from '@/shared/Store/AppStore';

class ProductApi {
  private filterStore = useFilterStore();
  private appStore = useAppState();
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

  async fetchQueryProductProjectionsByQP() {
    const client = Client.getInstance().credentialsClient;
    const categories = this.filterStore.getQueryArgs.categories;
    const text = this.filterStore.getQueryArgs.searchText;
    const language = this.appStore.getCurrentLang;
    // const price = this.filterStore.getQueryArgs.price;
    console.log(categories);
    const filter =
      categories.size > 0
        ? `categories.id:${Array.from(categories)
            .map((id) => `subtree("${id}")`)
            .join(', ')}`
        : undefined;
    // if (price.max & price.min) filter += ``
    return await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          offset: 0,
          limit: 10,
          filter,
          'filter.query': 'variants.price.centAmount:range (0 to 5000)',
          facet: 'variants.price.centAmount',
          ['text.' + language]: text,
          fuzzy: true
        }
      })
      .execute()
      .then((data) => data.body)
      .catch((err) => err);
  }
  // https://api.europe-west1.gcp.commercetools.com/grka1007/product-projections/search?offset=0&limit=10&filter=categories.id%3Asubtree%28%220d7ea4a5-a08d-45a3-b80b-ce3b65227455%22%29%26filter%3Dvariants.price.centAmount%3Arange+%280+to+5000%29
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
