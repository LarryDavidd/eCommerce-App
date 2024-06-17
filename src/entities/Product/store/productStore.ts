import { defineStore } from 'pinia';
import ProductApi from '../api/fetchProduct';
import { computed, ref, watch } from 'vue';
import type { ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { useAppState } from '@shared/Store/AppStore';
import { useFilterStore } from './filterStore';
import findPriceInCurrency from '../lib/priceInCurrency';

export const useProductStore = defineStore('product_store', () => {
  const appState = useAppState();
  const filterStore = useFilterStore();
  const productApi = new ProductApi();
  const data = ref<ProductProjectionPagedSearchResponse | null>(null);
  const product = ref<ProductProjection | null>(null);
  const isLoading = ref<boolean>(false);

  watch(
    () => filterStore.getQueryArgs,
    () => requestGetProductByQueryParams(),
    { deep: true }
  );

  // Getters
  const GetProduct = computed(() => {
    if (product.value === null) return null;

    const findPriceData = findPriceInCurrency(product.value.masterVariant.prices, appState.getState.currencyCode);

    let discount = '';

    const discountObj = product.value.masterVariant.prices?.find((_price) => {
      if (_price.discounted?.value.currencyCode === appState.getState.currencyCode && _price.value.centAmount !== _price.discounted?.value.centAmount) {
        return _price.discounted.value;
      }
      return null;
    });

    if (discountObj) {
      if (discountObj?.discounted?.value?.centAmount) discount = `${discountObj?.discounted?.value?.centAmount / 100} ${findPriceData?.currency}`;
    }

    let sizeValues: string[] = [];

    const idxSizes = product.value.masterVariant.attributes?.findIndex((el) => el.name === 'size');

    if (idxSizes !== -1 && idxSizes !== undefined && product.value.masterVariant.attributes) {
      sizeValues = product.value.masterVariant.attributes[idxSizes].value.map((elem: { key: string; label: string }) => elem.label);
    }

    const variants = product.value.variants;

    const result = {
      id: product.value.id,
      name: product.value.name[appState.getState.language],
      descriptions: product.value.description ? product.value.description[appState.getState.language] : '',
      urlImages: product.value.masterVariant.images?.map((img) => img.url),
      priceData: {
        price: findPriceData?.price,
        currency: findPriceData?.currency
      },
      discount: discount,
      sizes: sizeValues,
      variants
    };
    return result;
  });

  const GetProducts = computed(() => {
    if (data.value) {
      return data.value.results.map((product) => {
        const id = product.id;
        const name = product.name[appState.getState.language];
        const description = product.description ? product.description[appState.getState.language] : '';
        const urlImage = product.masterVariant.images ?? [];
        const discountObj = product.masterVariant.prices?.find((_price) => {
          if (_price.discounted?.value.currencyCode === appState.getState.currencyCode && _price.value.centAmount !== _price.discounted?.value.centAmount) {
            return _price.discounted.value;
          }
          return null;
        });
        const findCurrencyPrice = product.masterVariant.prices?.find((_price) => {
          if (_price.value.currencyCode === appState.getState.currencyCode) {
            return _price.value;
          }
          return null;
        });
        let sizeValues = [];
        const idxSizes = product.masterVariant?.attributes?.findIndex((el) => el.name === 'size');
        if (idxSizes !== -1 && idxSizes !== undefined && product.masterVariant.attributes) {
          sizeValues = product.masterVariant.attributes[idxSizes].value.map((elem: string) => elem.label);
        }

        const variants = product.variants;

        let symbolCurrency = '$';
        let price = '';
        let discount = '';
        if (findCurrencyPrice) {
          if (findCurrencyPrice.value.currencyCode === 'RUB') symbolCurrency = 'P';
          if (findCurrencyPrice.value.currencyCode === 'EUR') symbolCurrency = 'Э';
          price = `${symbolCurrency} ${findCurrencyPrice.value.centAmount / 100}`;
        }
        if (discountObj) {
          if (discountObj?.discounted?.value.currencyCode === 'RUB') symbolCurrency = 'P';
          if (discountObj?.discounted?.value.currencyCode === 'EUR') symbolCurrency = 'Э';
          if (discountObj?.discounted?.value?.centAmount) discount = `${symbolCurrency} ${discountObj?.discounted?.value?.centAmount / 100}`;
        }
        return {
          id,
          name,
          description,
          urlImage,
          price,
          discount,
          sizeValues,
          variants
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

  const GetCurrentPaginationNum = computed(() => {
    if (data.value === null) return 0;
    if (data.value.offset === undefined) return 0;
    return Math.ceil(data.value.offset / data.value.limit);
  });

  // Actions
  const requestGetProduct = async (offset = 0, limit = 10) => {
    if (offset <= 0) offset = 0;
    isLoading.value = true;
    const products = await productApi.fetchQueryProductProjections(offset, limit);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
  };

  const requestGetProductByQueryParams = async () => {
    isLoading.value = true;
    const products = await productApi.fetchQueryProductProjectionsByQP();

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
  };

  const requestGetProductById = async (id: string) => {
    isLoading.value = true;
    const res = await productApi.fetchGetProductProjectionByID(id);

    if (res instanceof Error) return;

    product.value = res.body;
    isLoading.value = false;
    return res.body;
  };

  return {
    requestGetProduct,
    requestGetProductByQueryParams,
    requestGetProductById,
    GetTotalPaginationNumber,
    GetCurrentPaginationNum,
    GetProducts,
    GetProduct,
    isLoading
  };
});
