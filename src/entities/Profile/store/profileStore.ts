import { defineStore } from 'pinia';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';
import { computed, ref, type Ref } from 'vue';
import type { Customer, CustomerDraft, ErrorResponse } from '@commercetools/platform-sdk';
import { useNotificationStore } from '@/shared/Store/AlertMessageStore';
import type { Client, ClientResponse } from '@commercetools/sdk-client-v2';
import ProfileApi from '../api/profileApi';
import { mapCountry, type Address, type UserData } from '@/pages/UserProfilePage/model/useUserData';
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

    return costumer.value;
  });

  const requestCostumer = async () => {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token');

    if (refresh_token) {
      const res = await costumerApi.refreshCostumer(String(refresh_token));
      if (res.statusCode >= 400) {
        alert.addNotification({ status: 'error', message: 'Please reload page' });
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
      setError(res.message);
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
      setNotificationAboutAddAdressSuccess();
    }

    isLoading.value = false;
  }

  async function setTagsToNewAddress(newAddressData: Address) {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.setTagsToNewAddress(newAddressData, costumer.value?.version, refresh_token, costumer.value?.addresses.at(-1).id);

    if (res?.statusCode >= 300) {
      setError(res.message);
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
      setError(res.message);
    } else {
      costumer.value = (res as ClientResponse<Customer>).body;
      setNotificationAboutRemoveAdressSuccess();
    }

    isLoading.value = false;
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    isLoading.value = true;

    const refresh_token = ls.load('refresh_token') as string;

    const res = await profileApi.updatePassword(costumer.value?.version, currentPassword, newPassword, refresh_token);

    if (res?.statusCode >= 300) {
      setError(res.message);
    } else {
      console.log(newPassword);
      costumer.value = (res as ClientResponse<Customer>).body;
      setNotificationAboutChangePasswordSuccess();
      await useCostumerStore().LoginCostumer(costumer.value?.email, newPassword);
    }

    isLoading.value = false;
  };

  async function updateCustomerData(formData: UserData) {
    isLoading.value = true;

    const refresh_token = localStorage.getItem('refresh_token') as string;

    const res = await profileApi.updateCustomerData(costumer.value, formData, refresh_token);

    if (res?.statusCode >= 300) {
      setError(res.message);
    } else {
      costumer.value = res.body;
      setNotificationAboutSavedUserDataSuccess();
    }

    isLoading.value = false;
  }

  const setNotificationAboutChangePasswordSuccess = () => {
    const notification = {
      id: Date.now(),
      message: 'Password has been successfully changed',
      type: 'success'
    };
    alert.addNotification(notification);
  };

  const setNotificationAboutAddAdressSuccess = () => {
    const notification = {
      id: Date.now(),
      message: 'Address has been added successfully',
      type: 'success'
    };
    alert.addNotification(notification);
  };

  const setNotificationAboutRemoveAdressSuccess = () => {
    const notification = {
      id: Date.now(),
      message: 'Address has been removed successfully',
      type: 'success'
    };
    alert.addNotification(notification);
  };

  const setNotificationAboutSavedUserDataSuccess = () => {
    const notification = {
      id: Date.now(),
      message: 'Data has been changed successfully',
      type: 'success'
    };
    alert.addNotification(notification);
  };

  const setError = (err: string) => {
    const notification = {
      id: Date.now(),
      message: err,
      type: 'error'
    };
    alert.addNotification(notification);
  };

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
