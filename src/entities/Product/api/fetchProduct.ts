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
    const limit = this.filterStore.getQueryArgs.limit;
    const categories = this.filterStore.getQueryArgs.categories;
    const sortNames = this.filterStore.getQueryArgs.sort;
    const text = this.filterStore.getQueryArgs.searchText;
    const language = this.appStore.getCurrentLang;
    const price = this.filterStore.getQueryArgs.price;
    const filter: string[] = [];
    const sort: string[] = [];
    if (categories.size > 0) {
      filter.push(
        `categories.id:${Array.from(categories)
          .map((id) => `subtree("${id}")`)
          .join(', ')}`
      );
    }
    if (sortNames.nameCondition !== 'none') {
      sort.push('name.' + this.appStore.getCurrentLang + ' ' + sortNames.nameCondition);
    }
    if (sortNames.priceCondition !== 'none') {
      sort.push('price' + ' ' + sortNames.priceCondition);
    }
    if (price.max) {
      filter.push(`variants.price.centAmount:range (${price.min ? price.min + '00' : 0} to ${price.max}00)`);
    }
    // if (price.max & price.min) filter += ``
    return await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          offset: 0,
          limit,
          filter,
          sort,
          facet: 'variants.price.centAmount',
          ['text.' + language]: text ? text : undefined
          // fuzzy: text ? undefined : true
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
