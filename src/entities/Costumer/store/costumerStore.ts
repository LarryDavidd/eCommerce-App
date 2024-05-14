import { defineStore } from 'pinia';
import CostumerApi from '../api/costumerApi';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { ref } from 'vue';
import type { CustomerDraft } from '@commercetools/platform-sdk';
import { revokingToken } from '@/auth/api/revokeToken';

export const useCostumerStore = defineStore('costumer_store', () => {
  const costumerApi = new CostumerApi();
  const ls = useLocalStorage();

  const isLogined = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isExist = ref<boolean>(false);

  async function AnonCostumer() {
    const anonCostumer = await costumerApi.anonCostumer();

    if (anonCostumer?.statusCode === 200) {
      isLogined.value = false;
      isExist.value = true;
    }
  }

  async function LoginExistigCostumer() {
    isLoading.value = true;
    const accessToken = ls.load('access_token');

    if (accessToken) {
      const existCostumer = await costumerApi.existingCostumer(String(accessToken));

      if (existCostumer?.statusCode === 200) {
        isLogined.value = true;
        isExist.value = true;
      } else {
        const refreshToken = ls.load('refresh_token');

        const refreshCostumer = await costumerApi.refreshCostumer(String(refreshToken));

        if (refreshCostumer?.statusCode === 200) {
          isLogined.value = true;
          isExist.value = true;
        }
      }
    } else {
      AnonCostumer();
    }
    isLoading.value = false;
  }

  async function LoginCostumer(email: string, password: string) {
    isLoading.value = true;
    const loginCostumer = await costumerApi.loginCostumer(email, password);

    if (loginCostumer.statusCode === 200) {
      isExist.value = true;
      isLogined.value = true;
    }
    isLoading.value = false;
  }

  async function RegistrationCostumer(draft: CustomerDraft) {
    isLoading.value = true;
    const regCostumer = await costumerApi.regCostumer(draft);

    if (regCostumer.statusCode === 200) {
      isExist.value = true;
      isLogined.value = true;
    }
    isLoading.value = false;
  }

  async function LogoutCostumer() {
    isLoading.value = true;

    const accessToken = String(ls.load('access_token'));

    const logoutCostumer = await revokingToken(accessToken);

    if (logoutCostumer instanceof Error) {
      console.log('alert with error about token');
    }

    AnonCostumer();

    isLoading.value = false;
  }

  return { LoginExistigCostumer, LoginCostumer, RegistrationCostumer, LogoutCostumer };
});
