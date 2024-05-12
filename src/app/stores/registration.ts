import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

export const useRegistrationStore = defineStore('registration', () => {
  const step = ref(1);
  const name = ref('');
  const surname = ref('');
  const birthDate: Ref<null | Date> = ref(null);
  const email = ref('');
  const password = ref('');
  const countryShipping = ref('Russia');
  const cityShipping = ref('');
  const streetShipping = ref('');
  const postalCodeShipping = ref('');
  const countryBilling = ref('Russia');
  const cityBilling = ref('');
  const streetBilling = ref('');
  const postalCodeBilling = ref('');
  const isDefaultShipping = ref(false);
  const isDefaultBilling = ref(false);
  const isSameAddresses = ref(false);
  function nextStep() {
    step.value++;
  }

  function prevStep() {
    step.value--;
  }

  function clearStore() {
    step.value = 1;
    name.value = '';
    surname.value = '';
    email.value = '';
    password.value = '';
  }

  return {
    step,
    name,
    surname,
    birthDate,
    nextStep,
    prevStep,
    email,
    password,
    clearStore,
    countryShipping,
    cityShipping,
    streetShipping,
    postalCodeShipping,
    isSameAddresses,
    postalCodeBilling,
    cityBilling,
    countryBilling,
    streetBilling,
    isDefaultBilling,
    isDefaultShipping
  };
});
