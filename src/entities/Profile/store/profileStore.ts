import { defineStore } from 'pinia';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { computed, ref, type Ref } from 'vue';
import type { Customer, CustomerDraft, ErrorResponse } from '@commercetools/platform-sdk';
import { useNotificationStore } from '@/shared/Store/AlertMessageStore';
import type { Client, ClientResponse } from '@commercetools/sdk-client-v2';
import ProfileApi from '../api/profileApi';
import { mapCountry, type Address } from '@/pages/UserProfilePage/model/useUserData';
import CostumerApi from '@/entities/Costumer/api/costumerApi';
import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';

export const useProfileStore = defineStore('profileStore', () => {
  const costumerApi = new CostumerApi();
  const profileApi = new ProfileApi();
  const ls = useLocalStorage();
  const alert = useNotificationStore();

  const isLoading = ref<boolean>(false);

  const costumer = ref<Customer | null>(null);

  const getIsLoading = computed(() => isLoading.value);

  const getCostumer = computed(() => {
    if (costumer.value === null) return null;

    console.log(costumer);

    return costumer.value;
  });

  const requestCostumer = async () => {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token');

    if (refresh_token) {
      const res = await costumerApi.refreshCostumer(String(refresh_token));
      console.log(res instanceof Error, res);
      if (res.statusCode >= 400) {
        alert.addNotification({ status: 'error', message: 'Please reload page' });
      } else {
        console.log(res);
        costumer.value = res.body;
      }
    }

    isLoading.value = false;
  };

  async function addNewCustomerAddress(newAddressData: Address) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.addNewCustomerAddress(newAddressData, costumer.value?.version, refresh_token);
    console.log(res);

    if (res instanceof Error) {
      alert.addNotification({ status: 'error', message: (res as ClientResponse<ErrorResponse>).message });
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
    }

    isLoading.value = false;
  }

  async function setTagsToNewAddress(newAddressData: Address) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.setTagsToNewAddress(newAddressData, costumer.value?.version, refresh_token, costumer.value?.addresses.at(-1).id);
    console.log(res);
    if (res instanceof Error) {
      alert.addNotification({ status: 'error', message: (res as ClientResponse<ErrorResponse>).message });
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
    }

    isLoading.value = false;
  }

  async function removeAddress(addressId: string) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.removeAddress(costumer.value?.version, addressId, refresh_token);

    if (res instanceof Error) {
      alert.addNotification({ status: 'error', message: (res as ClientResponse<ErrorResponse>).message });
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
    }

    isLoading.value = false;
  }

  async function updatePassword(currentPassword: string, newPassword: strin) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.updatePassword(costumer.value?.version, currentPassword, newPassword, refresh_token);
    console.log(res);
    if (res instanceof Error) {
      alert.addNotification({ status: 'error', message: (res as ClientResponse<ErrorResponse>).message });
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
      costumerApi.logout();
      await useCostumerStore().LoginCostumer(costumer.value?.email, newPassword);
    }

    isLoading.value = false;
  }

  return {
    getIsLoading,
    getCostumer,
    requestCostumer,
    addNewCustomerAddress,
    setTagsToNewAddress,
    removeAddress,
    updatePassword
  };
});
