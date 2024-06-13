import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Cart, DiscountCodeReference } from '@commercetools/platform-sdk';
import CartApi from '../api/fetchCart';
import { useLocalStorage } from '@/shared/lib/composables/useLocalStorage';
import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';
import { useNotificationStore } from '@/shared/Store/AlertMessageStore';
import { useAppState } from '@/shared/Store/AppStore';

const NAME_SPACE = 'CartStore';

export const useCartStore = defineStore(NAME_SPACE, () => {
  // State
  const cartApi = new CartApi();

  const appState = useAppState();
  const customerStore = useCostumerStore();
  const alert = useNotificationStore();
  const ls = useLocalStorage();

  const data = ref<Cart | null>(null);
  const isLoading = ref<boolean>(false);
  const inProcess = ref<Set<string>>(new Set());

  // Getters
  const IsLoading = computed(() => isLoading.value);

  const getData = computed(() => data.value);

  const getInProcess = computed(() => inProcess.value);

  const getDataCount = computed(() => data.value?.lineItems.length);

  const getLineItems = computed(() => {
    if (!data.value?.lineItems && !data.value) return;

    return data.value?.lineItems.map((lineItem) => {
      const productId = lineItem.productId;
      const lineItemId = lineItem.id;
      const quantity = lineItem.quantity;
      const name = lineItem.name[appState.getState.language];
      const urlImages = lineItem.variant.images?.map((image) => image.url) ?? [];

      const discountObj = lineItem.variant.prices?.find((_price) => {
        if (_price.discounted?.value.currencyCode === appState.getState.currencyCode && _price.value.centAmount !== _price.discounted?.value.centAmount) {
          return _price.discounted.value;
        }
        return null;
      });
      const findCurrencyPrice = lineItem.variant.prices?.find((_price) => {
        if (_price.value.currencyCode === appState.getState.currencyCode) {
          return _price.value;
        }
        return null;
      });
      let sizeValues = [];
      const idxSizes = lineItem.variant?.attributes?.findIndex((el) => el.name === 'size');
      if (idxSizes !== -1 && idxSizes !== undefined && lineItem.variant.attributes) {
        sizeValues = lineItem.variant.attributes[idxSizes].value.map((elem: string) => elem.label);
      }

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
        lineItemId,
        productId,
        name,
        price,
        quantity,
        urlImages,
        discount,
        sizeValues
      };
    });
  });

  const getTotalPrice = computed(() => {
    if (!data.value) return;

    return data.value.totalPrice.centAmount / 100;
  });

  const getTotalCount = computed(() => {
    if (!data.value) return;

    return data.value.totalLineItemQuantity;
  });

  const getTotalPriceWithotDiscount = computed(() => {
    if (!data.value) return;

    return data.value.lineItems.reduce((accum, lineItem) => (accum += lineItem.price.value.centAmount * lineItem.quantity), 0) / 100;
  });

  const getDiscountOnTotalPrice = computed(() => {
    if (!data.value) return;
    if (!data.value.discountOnTotalPrice) return;

    return data.value.discountOnTotalPrice.discountedAmount.centAmount / 100;
  });

  const getDiscountCodes = computed(() => {
    if (!data.value) return;
    if (!data.value.discountCodes) return;

    return data.value.discountCodes;
  });

  // Actions
  const requestCreateCart = async () => {
    const refresh_token = ls.load('refresh_token');

    isLoading.value = true;
    const cart = await cartApi.createCartForCustomer(String(refresh_token));

    if (cart instanceof Error) {
      alert.addErrorNotification('Please reload page!');
    } else {
      data.value = cart;
    }

    isLoading.value = false;
    return cart;
  };

  const requestGetCart = async () => {
    const ls = useLocalStorage();
    const refresh_token = ls.load('refresh_token');

    isLoading.value = true;
    const cart = await cartApi.getCart(String(refresh_token));

    if (cart.statusCode === 404) {
      requestCreateCart();
    } else {
      data.value = cart;
    }

    isLoading.value = false;
    return cart;
  };

  const requestAddProductToCart = async (productId: string) => {
    isLoading.value = true;
    inProcess.value.add(productId);
    const res = await cartApi.addProductToCart(data.value?.id, data.value?.version, productId);

    if (res instanceof Error) {
      alert.addErrorNotification('Something went wrong, please try again!');
    } else {
      alert.addSuccesNotification('Product added successful!');
      data.value = res;
    }

    inProcess.value.delete(productId);
    isLoading.value = false;
    return res;
  };

  const requestRemoveProductFromCart = async (productId: string) => {
    isLoading.value = true;
    inProcess.value.add(productId);
    const lineItem = data.value?.lineItems.find((lineItem) => lineItem.productId === productId);
    const res = await cartApi.removeProductFromCart(data.value?.id, data.value?.version, lineItem?.id);

    if (res instanceof Error) {
      alert.addErrorNotification('Something went wrong, please try again!');
    } else {
      alert.addSuccesNotification('Product removed successful!');
      data.value = res;
    }

    inProcess.value.delete(productId);
    isLoading.value = false;
    return res;
  };

  const requestChangeProductQuantity = async (productId: string, quantity: number) => {
    isLoading.value = true;
    inProcess.value.add(productId);
    const lineItem = data.value?.lineItems.find((lineItem) => lineItem.productId === productId);
    const res = await cartApi.changeProductQuantity(data.value?.id, data.value?.version, lineItem?.id, quantity);

    if (res instanceof Error) {
      alert.addErrorNotification('Something went wrong, please try again!');
    } else {
      data.value = res;
    }

    inProcess.value.delete(productId);
    isLoading.value = false;
    return res;
  };

  const requestAddDiscountCode = async (promoCode: string) => {
    isLoading.value = true;

    const res = await cartApi.addDiscountCode(data.value?.id, data.value?.version, promoCode);

    if (res instanceof Error) {
      alert.addErrorNotification('Something went wrong, please try again!');
    } else {
      alert.addSuccesNotification('Promo code added succesful');
      data.value = res;
    }

    isLoading.value = false;
    return res;
  };

  const requestRemoveDiscountCode = async (discountCode: DiscountCodeReference) => {
    isLoading.value = true;

    const res = await cartApi.removeDiscountCode(data.value?.id, data.value?.version, discountCode);

    if (res instanceof Error) {
      alert.addErrorNotification('Something went wrong, please try again!');
    } else {
      alert.addSuccesNotification('Promo code removed succesful');
      data.value = res;
    }

    isLoading.value = false;
    return res;
  };

  // watcher
  watch([() => customerStore.getIsLogedin, () => customerStore.getIsExist], () => {
    if (customerStore.getIsExist) requestGetCart();
  });

  return {
    requestGetCart,
    requestCreateCart,
    requestAddProductToCart,
    requestRemoveProductFromCart,
    requestChangeProductQuantity,
    requestAddDiscountCode,
    requestRemoveDiscountCode,
    getLineItems,
    getData,
    IsLoading,
    getInProcess,
    getDataCount,
    getTotalPrice,
    getTotalCount,
    getTotalPriceWithotDiscount,
    getDiscountOnTotalPrice,
    getDiscountCodes
  };
});
