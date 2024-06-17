<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue';
import { type AddressErrors } from '../components/AddressInfo.vue';
import AddressInfo from '../components/AddressInfo.vue';
import type { Address } from '../model/useUserData';
import { ValidateAddress } from '../model/useValidate';
import { MainButton } from '@shared/ui-kit/Buttons';

const dataAddress: Ref<Address> = ref({
  id: '',
  street: '',
  postalCode: '',
  city: '',
  country: 'Russia',
  isBilling: false,
  isShipping: false,
  isBillingDefault: false,
  isShippingDefault: false
});

const emits = defineEmits(['addAddress']);
const hasErrors = ref(false);

const errorsAddress: Ref<AddressErrors> = ref({
  city: null,
  street: null,
  postalCode: null
});

const isValidInputData = computed(() => !hasErrors.value && dataAddress.value.street && dataAddress.value.city && dataAddress.value.postalCode);
watch(
  () => dataAddress,
  (newVal) => {
    errorsAddress.value = ValidateAddress(newVal.value);
  }
);
const isHasErrors = (flag: boolean) => {
  hasErrors.value = flag;
};
const saveData = () => {
  const data = dataAddress.value;
  emits('addAddress', {
    street: data.street,
    postalCode: data.postalCode,
    isBilling: data.isBilling,
    isShipping: data.isShipping,
    isBillingDefault: data.isBillingDefault,
    isShippingDefault: data.isShippingDefault,
    city: data.city,
    country: data.country
  });
};
</script>
<template>
  <AddressInfo
    title="New Address"
    v-model="dataAddress"
    :is-disabled="false"
    @update:hasAddressesErrors="isHasErrors"
  />
  <MainButton
    class="button"
    :disabled="!isValidInputData"
    :options="{ buttonStyle: 'dark-grey' }"
    name="Save Address"
    @click="saveData"
  >
  </MainButton>
</template>

<style scoped lang="scss">
.button:not(:disabled):hover {
  cursor: pointer;
}

.button {
  border-radius: 2px;
  margin: 20px 0;
  height: 40px;
}

.clarification {
  width: 100%;
}

.button-block {
  width: 100%;
  gap: 30px;
  display: flex;
  align-items: center;
}

.title-block {
  gap: 1px;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  @apply text-xl;
}

.link {
  @apply text-gray-600
  underline
  duration-200
  hover:text-gray-900;
}

.password-eye {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transform: translateY(-50%);
}

button:disabled {
  opacity: 0.5;
}
</style>
