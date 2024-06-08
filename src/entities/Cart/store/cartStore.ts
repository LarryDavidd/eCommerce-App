import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAppState } from '@/shared/Store/AppStore';
import type { CartDraft, Cart } from '@commercetools/platform-sdk';
import CartApi from '../api/fetchCart';
import { useLocalStorage } from '@/shared/lib/composables/useLocalStorage';

const NAME_SPACE = 'CartStore';

export const useCartStore = defineStore(NAME_SPACE, () => {
  const appState = useAppState();
  const cartApi = new CartApi();
  const data = ref<Cart | null>(null);
  const isLoading = ref<boolean>(false);

  // Getters
  const IsLoading = computed(() => isLoading.value);

  const getData = computed(() => data.value);

  // Actions
  const requestCreateAnonCart = async (cartDraft: CartDraft) => {
    const ls = useLocalStorage();
    const refresh_token = ls.load('refresh_token');

    isLoading.value = true;
    const cart = await cartApi.createCartForAnonymousCustomer(String(refresh_token), cartDraft);

    if (cart instanceof Error) return;

    data.value = cart;
    isLoading.value = false;
    return cart;
  };

  const requestGetCart = async () => {
    const ls = useLocalStorage();
    const refresh_token = ls.load('refresh_token');

    isLoading.value = true;
    const cart = await cartApi.getCart(String(refresh_token));

    if (cart instanceof Error) return;

    data.value = cart;
    isLoading.value = false;
    return cart;
  };

  const requestAddProductToCart = async (productId: string) => {
    isLoading.value = true;
    const res = await cartApi.addProductToCart(data.value?.id, data.value?.version, productId);

    if (res instanceof Error) return;

    data.value = res;
    isLoading.value = false;
    return res;
  };

  return { requestGetCart, requestCreateAnonCart, requestAddProductToCart, getData, IsLoading };
});
