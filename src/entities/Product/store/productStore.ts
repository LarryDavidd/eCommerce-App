import { defineStore } from 'pinia';
import ProductApi from '../api/fetchProduct';
import { computed, ref, watch, watchEffect } from 'vue';
import type { Price, ProductProjection, ProductProjectionPagedQueryResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { useAppState } from '@shared/Store/AppStore';
import { useFilterStore } from './filterStore';

const findPriceInCurrency = (prices?: Price[], currencyCode?: string) => {
  if (prices === undefined || currencyCode === undefined) return;

  const find = prices.find((price) => price.value.currencyCode === currencyCode);

  if (find === undefined) return;

  let symbolCurrency = '$';
  if (find.value.currencyCode === 'RUB') symbolCurrency = 'P';
  if (find.value.currencyCode === 'EUR') symbolCurrency = 'Э';
  const resultPrice = ` ${find.value.centAmount / 100}`;

  return { price: resultPrice, currency: symbolCurrency };
};

export const useProductStore = defineStore('product_store', () => {
  const appState = useAppState();
  const filterStore = useFilterStore();
  const productApi = new ProductApi();
  const data = ref<ProductProjectionPagedSearchResponse | null>(null);
  const product = ref<ProductProjection | null>(null);
  const isLoading = ref<boolean>(false);

  watch(
    () => filterStore.getQueryArgs,
    () => requestGetProduct(),
    { deep: true }
  );

  // Getters
  const IsLoading = computed(() => isLoading.value);

  const GetData = computed(() => data.value);

  const Product = computed(() => product.value);

  const GetProduct = computed(() => {
    if (product.value === null) return null;

    const findPriceData = findPriceInCurrency(product.value.masterVariant.prices, appState.getState.currencyCode);

    const result = {
      id: product.value.id,
      name: product.value.name[appState.getState.language],
      descriptions: product.value.description ? product.value.description[appState.getState.language] : '',
      urlImages: product.value.masterVariant.images?.map((img) => img.url),
      priceData: {
        price: findPriceData?.price,
        currency: findPriceData?.currency
      }
    };

    return result;
  });

  const GetProducts = computed(() => {
    if (data.value) {
      return data.value.results.map((product) => {
        const id = product.id;
        const name = product.name[appState.getState.language];
        const description = product.description ? product.description[appState.getState.language] : '';
        const urlImage = product.masterVariant.images ? product.masterVariant.images[0].url : ''; // Берем первый попавшийся Image
        const findCurrencyPrice = product.masterVariant.prices?.find((_price) => {
          if (_price.value.currencyCode === appState.getState.currencyCode) {
            return _price.value;
          }
          return null;
        });
        let symbolCurrency = '$';
        let price = '';
        if (findCurrencyPrice) {
          if (findCurrencyPrice.value.currencyCode === 'RUB') symbolCurrency = 'P';
          if (findCurrencyPrice.value.currencyCode === 'EUR') symbolCurrency = 'Э';
          price = `${symbolCurrency} ${findCurrencyPrice.value.centAmount / 100}`;
        }
        return {
          id,
          name,
          description,
          urlImage,
          price
        };
      });
    }
    return null;
  });

  const GetTotalPaginationNumber = computed(() => {
    if (data.value === null) return 0;
    if (data.value.total === undefined) return 0;
    return Math.ceil(data.value.total / data.value.limit);
  });

  // Actions
  const requestGetProduct = async (offset = 0, limit = 10) => {
    if (offset <= 0) offset = 0;
    isLoading.value = true;
    const products = await productApi.fetchQueryProductProjections(offset, limit);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
    console.log(data.value);
  };

  const requestGetProductById = async (id: string) => {
    isLoading.value = true;
    const res = await productApi.fetchGetProductProjectionByID(id);

    if (res instanceof Error) return;

    product.value = res;
    isLoading.value = false;
    return res;
  };

  const requestGetProductsByCategory = async (ids: string[]) => {
    isLoading.value = true;
    const products = await productApi.fetchQueryProductProjectionsByCategory(ids);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
    return products;
  };

  const requestProductSearch = async (text: string) => {
    isLoading.value = true;
    const products = await productApi.fetchProductProjectionSearch(appState.getState.language, text);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
    return products;
  };

  return { requestGetProduct, requestGetProductsByCategory, requestProductSearch, requestGetProductById, GetProducts, isLoading };
});
