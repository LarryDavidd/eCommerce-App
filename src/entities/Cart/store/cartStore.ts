import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Cart } from '@commercetools/platform-sdk';
import CartApi from '../api/fetchCart';
import { useLocalStorage } from '@/shared/lib/composables/useLocalStorage';
import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';
import CostumerApi from '@/entities/Costumer/api/costumerApi';

const NAME_SPACE = 'CartStore';

export const useCartStore = defineStore(NAME_SPACE, () => {
  // State
  const cartApi = new CartApi();

  const customerStore = useCostumerStore();
  const data = ref<Cart | null>(null);
  const isLoading = ref<boolean>(false);
  const inProcess = ref<Set<string>>(new Set());

  // Getters
  const IsLoading = computed(() => isLoading.value);

  const getData = computed(() => data.value);

  const getInProcess = computed(() => inProcess.value);

  const getDataCount = computed(() => data.value?.lineItems.length);

  // Actions
  const requestCreateCart = async () => {
    const ls = useLocalStorage();
    const refresh_token = ls.load('refresh_token');

    isLoading.value = true;
    const cart = await cartApi.createCartForCustomer(String(refresh_token));

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

    if (cart.statusCode === 404) requestCreateCart();
    else data.value = cart;

    isLoading.value = false;
    return cart;
  };

  const requestAddProductToCart = async (productId: string) => {
    isLoading.value = true;
    inProcess.value.add(productId);
    const res = await cartApi.addProductToCart(data.value?.id, data.value?.version, productId);

    if (res instanceof Error) console.log(res);

    data.value = res;
    inProcess.value.delete(productId);
    isLoading.value = false;
    return res;
  };

  const requestRemoveProductFromCart = async (productId: string) => {
    isLoading.value = true;
    inProcess.value.add(productId);
    const lineItem = data.value?.lineItems.find((lineItem) => lineItem.productId === productId);
    const res = await cartApi.removeProductFromCart(data.value?.id, data.value?.version, lineItem?.id);

    if (res instanceof Error) console.log(res);

    data.value = res;
    inProcess.value.delete(productId);
    isLoading.value = false;
    return res;
  };

  // watcher
  watch(
    () => customerStore.getIsLogedin,
    () => customerStore.getIsExist,
    () => {
      if (customerStore.getIsExist) requestGetCart();
    }
  );

  return { requestGetCart, requestCreateCart, requestAddProductToCart, requestRemoveProductFromCart, getData, IsLoading, getInProcess, getDataCount };
});
