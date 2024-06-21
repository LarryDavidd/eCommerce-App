import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import ProfileApi from '../api/profileApi';
import type { Customer } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';
import { type Address, type UserData } from '@pages/UserProfilePage/model/useUserData';
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';
import CostumerApi from '@entities/Costumer/api/costumerApi';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { useNotificationStore } from '@shared/Store/AlertMessageStore';

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

    return costumer.value;
  });

  const requestCostumer = async () => {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token');

    if (refresh_token) {
      const res = await costumerApi.refreshCostumer(String(refresh_token));
      if (res.statusCode >= 400) {
        alert.addErrorNotification(res.message);
      } else {
        costumer.value = res.body;
      }
    }

    isLoading.value = false;
  };

  async function addNewCustomerAddress(newAddressData: Address) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.addNewCustomerAddress(newAddressData, costumer.value?.version, refresh_token);

    if (res?.statusCode >= 300) {
      alert.addErrorNotification(res.message);
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
      alert.addSuccesNotification('Address has been added successfully');
    }

    isLoading.value = false;
  }

  async function setTagsToNewAddress(newAddressData: Address) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.setTagsToNewAddress(newAddressData, costumer.value?.version, refresh_token, costumer.value?.addresses.at(-1).id);

    if (res?.statusCode >= 300) {
      alert.addErrorNotification(res.message);
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
    }

    isLoading.value = false;
  }

  async function removeAddress(addressId: string) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.removeAddress(costumer.value?.version, addressId, refresh_token);

    if (res?.statusCode >= 300) {
      alert.addErrorNotification(res.message);
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
      alert.addSuccesNotification('Address has been removed successfully');
    }

    isLoading.value = false;
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.updatePassword(costumer.value?.version, currentPassword, newPassword, refresh_token);

    if (res?.statusCode >= 300) {
      alert.addErrorNotification(res.message);
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
      alert.addSuccesNotification('Password has been successfully changed');
      await useCostumerStore().LoginCostumer(costumer.value?.email, newPassword);
    }

    isLoading.value = false;
  };

  async function updateCustomerData(formData: UserData) {
    isLoading.value = true;

    const refresh_token = localStorage.getItem('refresh_token') as string;

    const res = await profileApi.updateCustomerData(costumer.value, formData, refresh_token);

    if (res?.statusCode >= 300) {
      alert.addErrorNotification(res.message);
    } else {
      costumer.value = res.body;
      alert.addSuccesNotification('Data has been changed successfully');
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
    updatePassword,
    updateCustomerData
  };
});
