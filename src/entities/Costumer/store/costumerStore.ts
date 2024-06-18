import { defineStore } from 'pinia';
import CostumerApi from '../api/costumerApi';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { computed, ref } from 'vue';
import type { CustomerDraft } from '@commercetools/platform-sdk';
import { revokingToken } from '@/auth/api/revokeToken';
import { useNotificationStore } from '@shared/Store/AlertMessageStore';
import router from '@app/router';
import useCartStore from '@entities/Cart';

export const useCostumerStore = defineStore('costumer_store', () => {
  // State
  const costumerApi = new CostumerApi();

  const ls = useLocalStorage();
  const alert = useNotificationStore();
  const cartStore = useCartStore();

  const isLogined = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isExist = ref<boolean>(false);

  // Getters
  const getIsLoading = computed(() => isLoading.value);
  const getIsLogedin = computed(() => isLogined.value);
  const getIsExist = computed(() => isExist.value);

  // Actions
  async function AnonCostumer() {
    const anonCostumer = await costumerApi.anonCostumer();

    if (anonCostumer.statusCode === 200) {
      isExist.value = true;
      setNotificationSucces();
    } else {
      setNotificationError(anonCostumer.message);
    }

    return { isExist };
  }

  async function LoginExistigCostumer() {
    isLoading.value = true;
    const refresh_token = ls.load('refresh_token');

    if (refresh_token) {
      const existCostumer = await costumerApi.refreshCostumer(String(refresh_token));

      if (existCostumer?.statusCode === 200) {
        isLogined.value = true;
        isExist.value = true;
        setNotificationSucces();
      }
    }

    if (!isLogined.value && refresh_token) {
      const existAnonCostumre = await costumerApi.refreshAnonCostumer(String(refresh_token));

      if (existAnonCostumre?.statusCode === 200) {
        isExist.value = true;
        setNotificationSucces();
      }
    }

    if (!isExist.value) await AnonCostumer();

    isLoading.value = false;
  }

  async function LoginCostumer(email: string, password: string) {
    isLoading.value = true;

    const cart = cartStore.getData;

    const res = await costumerApi.loginCostumer(email, password, cart);

    if (res.statusCode === 200) {
      isExist.value = true;
      isLogined.value = true;
      setNotificationSucces();
    } else {
      setNotificationError(res.message);
    }

    isLoading.value = false;

    return { isLogined };
  }

  async function RegistrationCostumer(draft: CustomerDraft) {
    isLoading.value = true;

    const res = await costumerApi.regCostumer(draft);

    if (res.statusCode === 201) {
      const notification = {
        id: Date.now(),
        message: 'Registration was successful',
        type: 'success'
      };
      alert.addNotification(notification);
      if (draft.password) await LoginCostumer(draft.email, draft.password);
    } else {
      setNotificationError(res.message);
    }

    isLoading.value = false;

    return { isLogined };
  }

  async function LogoutCostumer() {
    isLoading.value = true;

    const accessToken = String(ls.load('access_token'));

    const res = await revokingToken(accessToken);
    costumerApi.logout();
    ls.remove('access_token');
    ls.remove('refresh_token');
    isLogined.value = false;
    isExist.value = false;

    if (res instanceof Error) {
      setNotificationError(res.message);
    } else {
      AnonCostumer();
      router.push({ name: 'login' });
    }

    isLoading.value = false;
  }

  // notification fns
  const setNotificationSucces = () => {
    const notification = {
      id: Date.now(),
      message: 'Login was successful' + ' ' + (isLogined.value ? 'Loginded user' : 'Anon user'),
      type: 'success'
    };
    alert.addNotification(notification);
  };

  const setNotificationError = (message: string) => {
    const notification = {
      id: Date.now(),
      message: message,
      type: 'error'
    };
    alert.addNotification(notification);
  };

  return {
    getIsLoading,
    getIsLogedin,
    getIsExist,
    AnonCostumer,
    LoginExistigCostumer,
    LoginCostumer,
    RegistrationCostumer,
    LogoutCostumer,
    isLogined,
    isLoading,
    isExist
  };
});
