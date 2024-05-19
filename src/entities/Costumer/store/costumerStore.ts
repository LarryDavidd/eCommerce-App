import { defineStore } from 'pinia';
import CostumerApi from '../api/costumerApi';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { ref } from 'vue';
import type { CustomerDraft } from '@commercetools/platform-sdk';
import { revokingToken } from '@/auth/api/revokeToken';
import { useNotificationStore } from '@/shared/Store/AlertMessageStore';

export const useCostumerStore = defineStore('costumer_store', () => {
  const costumerApi = new CostumerApi();
  const ls = useLocalStorage();
  const alert = useNotificationStore();

  const isLogined = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isExist = ref<boolean>(false);

  async function AnonCostumer() {
    const anonCostumer = await costumerApi.anonCostumer();

    if (anonCostumer?.statusCode === 200) {
      isExist.value = true;
    }
  }

  async function LoginExistigCostumer() {
    isLoading.value = true;
    const accessToken = ls.load('access_token');
    const refreshToken = ls.load('refresh_token');

    if (accessToken) {
      const existCostumer = await costumerApi.existingCostumer(String(accessToken));

      if (existCostumer?.statusCode === 200) {
        isLogined.value = true;
        isExist.value = true;
      } else if (refreshToken) {
        const refreshCostumer = await costumerApi.refreshCostumer(String(refreshToken));

        if (refreshCostumer?.statusCode === 200) {
          isLogined.value = true;
          isExist.value = true;
        }
      } else {
        AnonCostumer();
      }
    } else {
      AnonCostumer();
    }
    isLoading.value = false;
  }

  async function LoginCostumer(email: string, password: string) {
    const res = await costumerApi.loginCostumer(email, password);

    if (res.statusCode === 200) {
      isExist.value = true;
      isLogined.value = true;
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

    return { isLogined };
  }

  async function RegistrationCostumer(draft: CustomerDraft) {
    isLoading.value = true;
    const res = await costumerApi.regCostumer(draft);

    if (res.statusCode === 201) {
      isExist.value = true;
      isLogined.value = true;
    } else if (res.statusCode >= 300) {
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
      alert.SetMessage({ status: 'error', message: 'Please reload page' });
    } else {
      AnonCostumer();
    }

    isLoading.value = false;
  }

  return { AnonCostumer, LoginExistigCostumer, LoginCostumer, RegistrationCostumer, LogoutCostumer, isLogined, isLoading, isExist };
});
