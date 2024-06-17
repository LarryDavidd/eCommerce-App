import { useFilterStore } from '../store/filterStore';
import Client from '@shared/api/client/Client';
import { useAppState } from '@shared/Store/AppStore';

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
    const sortNames = this.filterStore.getQueryArgs.sort;
    const text = this.filterStore.getQueryArgs.searchText;
    const price = this.filterStore.getQueryArgs.price;
    const limit = this.filterStore.getQueryArgs.limit;
    const offset = this.filterStore.getQueryArgs.offset;

    const language = this.appStore.getCurrentLang;

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
      sort.push('name.' + language + ' ' + sortNames.nameCondition);
    }
    if (sortNames.priceCondition !== 'none') {
      sort.push('price' + ' ' + sortNames.priceCondition);
    }
    if (price.max) {
      filter.push(`variants.price.centAmount:range (${price.min ? price.min + '00' : 0} to ${price.max}00)`);
    }

    return await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          offset,
          limit,
          filter,
          sort,
          ['text.' + language]: text ? text : undefined
          // fuzzy: text ? undefined : true
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
}

export default ProductApi;
