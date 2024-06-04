import { defineStore } from 'pinia';
import CostumerApi from '../api/costumerApi';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { computed, ref } from 'vue';
import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { revokingToken } from '@/auth/api/revokeToken';
import { useNotificationStore } from '@/shared/Store/AlertMessageStore';
import router from '@/app/router';
import type { Client, ClientResponse } from '@commercetools/sdk-client-v2';

export const useCostumerStore = defineStore('costumer_store', () => {
  const costumerApi = new CostumerApi();
  const ls = useLocalStorage();
  const alert = useNotificationStore();

  const costumerCredentials = ref<Customer | null>(null);

  const isLogined = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isExist = ref<boolean>(false);

  const getIsLoading = computed(() => isLoading.value);

  const userAccessToken = ref<string>('');
  const userRefreshToken = ref<string>('');

  const getCostumerCredentials = computed(() => {
    if (costumerCredentials.value === null) return null;

    return costumerCredentials.value;
  });

  const setTokenToLs = () => {
    if (isLogined.value) {
      if (userRefreshToken.value) useLocalStorage().set('refresh_token', userRefreshToken.value);
      if (userAccessToken.value) useLocalStorage().set('access_token', userAccessToken.value);
    }
  };

  const setNotificationSucces = () => {
    const notification = {
      id: Date.now(),
      message: 'Login was successful' + ' ' + (isLogined.value ? 'Loginded user' : 'Anon user'),
      type: 'success'
    };
    alert.addNotification(notification);
  };

  async function AnonCostumer() {
    const anonCostumer = await costumerApi.anonCostumer();

    if (anonCostumer.statusCode === 200) {
      isExist.value = true;
      setNotificationSucces();
    } else {
      const notification = {
        id: Date.now(),
        message: 'Please reload page',
        type: 'error'
      };
      alert.addNotification(notification);
    }

    return { isExist };
  }

  async function LoginExistigCostumer() {
    isLoading.value = true;
    const refresh_token = ls.load('refresh_token');

    if (refresh_token) {
      const existCostumer = await costumerApi.refreshCostumer(String(refresh_token));
      console.log(String(refresh_token));

      if (existCostumer?.statusCode === 200) {
        isLogined.value = true;
        isExist.value = true;
        setNotificationSucces();
      }
    }

    if (!isLogined.value) await AnonCostumer();

    isLoading.value = false;

    setTokenToLs();
  }

  async function LoginCostumer(email: string, password: string) {
    isLoading.value = true;

    const res = await costumerApi.loginCostumer(email, password);
    console.log(res);

    if (res.statusCode === 200) {
      isExist.value = true;
      isLogined.value = true;
      setNotificationSucces();
    } else if (res.statusCode === 400) {
      const notification = {
        id: Date.now(),
        message: res.message,
        type: 'error'
      };
      alert.addNotification(notification);
    } else {
      const notification = {
        id: Date.now(),
        message: 'Please try again or reload page',
        type: 'error'
      };
      alert.addNotification(notification);
    }
    isLoading.value = false;

    setTokenToLs();

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
    } else if (res.statusCode >= 300) {
      const notification = {
        id: Date.now(),
        message: res.message,
        type: 'error'
      };
      alert.addNotification(notification);
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

    if (res instanceof Error) {
      alert.addNotification({ status: 'error', message: 'Please reload page' });
    } else {
      AnonCostumer();
      router.push({ name: 'login' });
    }

    isLoading.value = false;
  }

  const requestCostumer = async () => {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token');

    if (refresh_token) {
      const res = await costumerApi.refreshCostumer(String(refresh_token));

      if (res instanceof Error) {
        alert.addNotification({ status: 'error', message: 'Please reload page' });
      } else {
        console.log(res);
        costumerCredentials.value = res.body;
      }
    }

    isLoading.value = false;
  };

  return {
    getCostumerCredentials,
    getIsLoading,
    requestCostumer,
    AnonCostumer,
    LoginExistigCostumer,
    LoginCostumer,
    RegistrationCostumer,
    LogoutCostumer,
    isLogined,
    isLoading,
    isExist,
    userAccessToken,
    userRefreshToken
  };
});
