<script setup lang="ts">
import { computed, reactive, type Ref, ref, watch } from 'vue';
import ToggleInput from '@shared/ui-kit/Inputs/ToggleInput/ToggleInput.vue';
import PersonalInfo from '@pages/UserProfilePage/components/PersonalInfo.vue';
import { validateBirthDate, validateEmail, validateName, validatePostalCode, validateStreet } from '@shared/utils/validation';
import { ValidateAddress, ValidatePersonal } from '@pages/UserProfilePage/model/useValidate';
import AddressInfo from '@pages/UserProfilePage/components/AddressInfo.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';
import ModalWrapper from '@shared/ui-kit/ModalWrapper/ModalWrapper.vue';
import PasswordChangeModal from '@pages/UserProfilePage/components/PasswordChangeModal.vue';
import { type Address, ConvertDataForServer, type UserData, useUserData } from '@pages/UserProfilePage/model/useUserData';
import AddAddressModal from '@pages/UserProfilePage/components/AddAddressModal.vue';
import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';

export type PersonalErrors = {
  name: string[] | null;
  surname: string[] | null;
  email: string[] | null;
  password: string[] | null;
  dateOfBirth: string | null;
};

const isEditMode = ref(false);

const passwordWindowIsOpen = ref(false);
const addAddressWindowIsOpen = ref(false);
const errorsPersonal: Ref<PersonalErrors> = ref({
  name: null,
  surname: null,
  email: null,
  password: null,
  dateOfBirth: null
});

// const costumerStore = useCostumerStore();
// costumerStore.requestCredentialsCostumer();

const userData: UserData = {
  email: 'seb@example.com',
  firstName: 'Sebastian',
  lastName: 'Franklin',
  password: '****+po=',
  dateOfBirth: new Date(2003, 1, 17),
  addresses: [
    {
      id: 'h3lwu1In',
      streetName: 'South Road',
      postalCode: '27517',
      city: 'Durham',
      country: 'US'
    },
    {
      id: 'AeOy_U0W',
      streetName: 'Leningradskaya',
      postalCode: '123456',
      city: 'Moscow',
      country: 'RU'
    }
  ],
  defaultShippingAddressId: 'AeOy_U0W',
  defaultBillingAddressId: 'h3lwu1In',
  shippingAddressIds: ['AeOy_U0W'],
  billingAddressIds: ['h3lwu1In']
};

const { personal, addresses } = useUserData(userData);

const validationsPersonal = {
  name: validateName,
  email: validateEmail,
  surname: validateName,
  dateOfBirth: validateBirthDate
};

watch(
  () => personal,
  () => {
    errorsPersonal.value = ValidatePersonal(personal.value, validationsPersonal);
  },
  { deep: true }
);

const hasAddressesErrors = ref(false);

watch(
  () => addresses,
  () => {
    let flag = false;
    for (let i = 0; i < addresses.value.length; i++) {
      const res = ValidateAddress(addresses.value[i]);
      if (Object.values(res).some((value) => value !== null)) {
        flag = true;
        hasAddressesErrors.value = true;
        break;
      }
    }
    if (!flag) {
      hasAddressesErrors.value = false;
    }
  },
  { deep: true }
);

const isValidData = computed(() => {
  return Object.values(errorsPersonal.value).every((value) => value === null) && !hasAddressesErrors.value;
});

const saveData = () => {
  console.log('save data', ConvertDataForServer(personal.value, addresses.value));
};

const changePassword = (data: { currentPassword: string; newPassword: string }) => {
  passwordWindowIsOpen.value = false;
  console.log('received password data', data);
};

const deleteAddress = (id: string) => {
  console.log('Delete id', id);
};

const addNewAddress = (newAddress: Omit<Address, 'id'>) => {
  addAddressWindowIsOpen.value = false;
  console.log('new address', newAddress);
};
const openAddAddressWindow = () => {
  addAddressWindowIsOpen.value = true;
};
</script>

<template>
  <div class="profile-page">
    <div class="wrapper">
      <ToggleInput
        class="toggle-input"
        v-model="isEditMode"
        text="Edit mode"
      />
      <div class="data-blocks">
        <div class="data-block">
          <PersonalInfo
            :errors="errorsPersonal"
            v-model="personal"
            :is-disabled="!isEditMode"
          />
        </div>
        <div
          class="data-block"
          v-for="(address, idx) in addresses"
          :key="idx"
        >
          <AddressInfo
            title="Address"
            v-model="addresses[idx]"
            v-model:hasAddressesErrors="hasAddressesErrors"
            :is-disabled="!isEditMode"
          />
          <MainButton
            :disabled="!isEditMode"
            class="delete"
            :options="{ buttonStyle: 'dark-grey' }"
            name="Delete"
            @click="deleteAddress(addresses[idx].id)"
          />
        </div>
      </div>
      <ModalWrapper
        :is-open="passwordWindowIsOpen"
        @close="passwordWindowIsOpen = false"
      >
        <PasswordChangeModal @update:changePassword="changePassword" />
      </ModalWrapper>
      <ModalWrapper
        :is-open="addAddressWindowIsOpen"
        @close="addAddressWindowIsOpen = false"
      >
        <AddAddressModal @add-address="addNewAddress" />
      </ModalWrapper>
      <div class="buttons-cont">
        <MainButton
          v-if="isEditMode"
          class="but edit-but"
          name="Edit Password"
          :options="{ buttonStyle: 'light-grey--font-light' }"
          @click="passwordWindowIsOpen = true"
        />
        <MainButton
          v-if="isEditMode"
          class="but save-but"
          name="Save Data"
          :is-disabled="!isValidData"
          :options="{ buttonStyle: 'light-grey--font-light' }"
          @click="saveData"
        />
        <MainButton
          class="but"
          v-if="isEditMode"
          :options="{ buttonStyle: 'light-grey--font-light' }"
          name="Add Address"
          @click="openAddAddressWindow"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.delete {
  font-weight: normal;
  font-family: 'Montserrat', sans-serif;
  text-transform: lowercase;
  margin: 5px 0;
  max-height: 35px;
  width: fit-content;
  padding: 5px 20px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #666666;
  }
}

.buttons-cont {
  gap: 20px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
}

.but {
  display: inline-block;
  margin: 10px auto;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: #c6c6c6;
  }
}

.personal-block,
.toggle-input,
.address-block,
.data-block {
  width: fit-content;
}

.data-blocks {
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  display: grid;
  justify-content: center;
}

.toggle-input {
  margin-bottom: 10px;
}

.profile-page {
  padding: 20px;
  display: flex;
  justify-content: center;
  min-height: 500px;
  background-color: white;
}

.wrapper {
  background-color: #f3f2f2;
  width: 90%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.data-block {
  max-width: 300px;
  justify-self: center;
  padding: 15px 20px;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 20px;
}

.input-wrap {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.title-block {
  font-size: 20px;
}
</style>
