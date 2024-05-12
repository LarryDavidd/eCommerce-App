<script setup lang="ts">
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import { computed, ref, watch } from 'vue';
import { validateName, validatePostalCode } from '@/utils/validation';
import FormWrapper from '@shared/ui-kit/FormWrapper/FormWrapper.vue';
// import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';
import { useRegistrationStore } from '@app/stores/registration';
import SelectInput from '@shared/ui-kit/Inputs/SelectInput/SelectInput.vue';
import CheckBox from '@shared/ui-kit/Inputs/CheckBox/CheckBox.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';

const store = useRegistrationStore();

const creds = ref({
  country: store.countryBilling,
  city: store.cityBilling,
  street: store.streetBilling,
  postalCode: store.postalCodeBilling,
  isDefault: store.isDefaultBilling,
  isTheSameAddresses: store.isSameAddresses
});
console.log('isTe', creds.value.isTheSameAddresses);
const errorsStreet = ref<null | string[]>(null);
const errorsCity = ref<null | string[]>(null);
const errorsCountry = ref<null | string[]>(null);
const errorsPostalCode = ref<null | string[]>(null);

watch(
  () => creds.value.street,
  (newValue: string) => {
    if (creds.value.street != store.streetShipping) {
      creds.value.isTheSameAddresses = false;
    }
    if (newValue) {
      let result = validateName(newValue);
      const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
      errorsStreet.value = errorList.length > 0 ? errorList : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => creds.value.city,
  (newValue: string) => {
    if (creds.value.city != store.cityShipping) {
      creds.value.isTheSameAddresses = false;
    }
    if (newValue) {
      let result = validateName(newValue);
      const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
      errorsCity.value = errorList.length > 0 ? errorList : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => creds.value.country,
  (newValue: string) => {
    if (creds.value.country != store.countryShipping) {
      creds.value.isTheSameAddresses = false;
    }
    if (creds.value.postalCode) {
      let result = validatePostalCode(creds.value.postalCode, newValue);
      errorsPostalCode.value = result.length > 0 ? result : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => creds.value.postalCode,
  (newValue: string) => {
    if (creds.value.postalCode != store.postalCodeShipping) {
      creds.value.isTheSameAddresses = false;
    }
    if (newValue) {
      let result = validatePostalCode(newValue, creds.value.country);
      errorsPostalCode.value = result.length > 0 ? result : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => creds.value.isTheSameAddresses,
  (isSame: boolean) => {
    console.log(isSame);
    if (isSame) enterData(false);
  },
  { deep: true, immediate: true }
);

function enterData(isClear: boolean) {
  creds.value.city = isClear ? '' : store.cityShipping;
  creds.value.street = isClear ? '' : store.streetShipping;
  creds.value.country = isClear ? 'Russia' : store.countryShipping;
  console.log('new country', creds.value.country);
  creds.value.postalCode = isClear ? '' : store.postalCodeShipping;
}
const isValidInputData = computed(
  () =>
    !errorsCity.value &&
    !errorsCountry.value &&
    !errorsStreet.value &&
    !errorsPostalCode.value &&
    creds.value.street &&
    creds.value.country &&
    creds.value.city &&
    creds.value.postalCode
);
const saveData = () => {
  store.countryBilling = creds.value.country;
  store.cityBilling = creds.value.city;
  store.streetBilling = creds.value.street;
  store.postalCodeBilling = creds.value.postalCode;
  store.isDefaultBilling = creds.value.isDefault;
  store.isSameAddresses = creds.value.isTheSameAddresses;
};

const nextStep = () => {
  saveData();
};

const prevStep = () => {
  store.prevStep();
  saveData();
};
</script>
<template>
  <FormWrapper>
    <template #content>
      <div class="title-block">
        <h2 class="clarification">Billing address</h2>
        <span class="title">Registration</span>
        <span>Step 4</span>
      </div>

      <SelectInput
        v-model="creds.country"
        :options="['Russia', 'United States']"
      ></SelectInput>
      <SimpleInput
        v-model="creds.postalCode"
        placeholder="Postal code"
        :error="errorsPostalCode"
      />
      <SimpleInput
        v-model="creds.street"
        placeholder="Street"
        :error="errorsStreet"
      />
      <SimpleInput
        v-model="creds.city"
        placeholder="City"
        :error="errorsCity"
      >
      </SimpleInput>
      <CheckBox
        label="set as default billing address"
        v-model="creds.isDefault"
      />
      <CheckBox
        label="set the same as the shipping address"
        v-model="creds.isTheSameAddresses"
      />
      <div class="button-block">
        <MainButton
          class="button"
          type="submit"
          :disabled="!isValidInputData"
          :options="{ buttonStyle: 'dark-grey' }"
          name="Prev"
          @click="prevStep"
        >
        </MainButton>
        <MainButton
          class="button"
          type="submit"
          :disabled="!isValidInputData"
          :options="{ buttonStyle: 'dark-grey' }"
          name="Submit"
          @click="nextStep"
        >
        </MainButton>
      </div>
    </template>
  </FormWrapper>
</template>

<style scoped lang="scss">
.button:not(:disabled):hover {
  cursor: pointer;
}
.button {
  border-radius: 2px;
  margin: 0;
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
