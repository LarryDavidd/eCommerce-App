import { defineStore } from 'pinia';
import ProductApi from '../api/fetchProduct';
import { ref } from 'vue';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export const useProductStore = defineStore('product_store', () => {
  const productApi = new ProductApi();
  const data = ref<ProductProjectionPagedQueryResponse | null>(null);
  const isLoading = ref<boolean>(false);

  const requestGetProduct = async (offset = 0, limit = 10) => {
    if (offset <= 0) offset = 0;
    isLoading.value = true;
    const products = await productApi.fetchQueryProductProjections(offset, limit);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
    return products;
  };

  const requestGetProductsByCategory = async (ids: string[]) => {
    isLoading.value = true;
    const products = await productApi.fetchQueryProductProjectionsByCategory(ids);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
    return products;
  };

  const requestProductSearch = async (language: string, text: string) => {
    isLoading.value = true;
    const products = await productApi.fetchProductProjectionSearch(language, text);

    if (products instanceof Error) return;

    data.value = products;
    isLoading.value = false;
    return products;
  };

  return { requestGetProduct, requestGetProductsByCategory, requestProductSearch };
});
