<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';
import { validateName, validatePostalCode, validateStreet } from '@shared/validation/validation';
import { FormWrapper } from '@shared/ui-kit/Wrapper';
import { SimpleInput } from '@shared/ui-kit/Inputs';
import { SelectInput } from '@shared/ui-kit/Inputs';
import { CheckBox } from '@shared/ui-kit/Inputs';
import { MainButton } from '@shared/ui-kit/Buttons';

const costumerStore = useCostumerStore();

interface StepData {
  countryBilling: string;
  cityBilling: string;
  streetBilling: string;
  postalCodeBilling: string;
  isDefaultBilling: boolean;
  isSameAddresses: boolean;
}
const props = defineProps({
  data: { type: Object as () => StepData, required: true },
  cb: { type: Function, required: true }
});
const emits = defineEmits(['updateBilling', 'setSameValues', 'submitForm']);
const { data } = toRefs(props);

const errorsStreet = ref<null | string[]>(null);
const errorsCity = ref<null | string[]>(null);
const errorsCountry = ref<null | string[]>(null);
const errorsPostalCode = ref<null | string[]>(null);
watch(
  () => data.value.streetBilling,
  (newValue: string) => {
    emits('updateBilling');
    if (newValue) {
      let result = validateStreet(newValue);
      const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
      errorsStreet.value = errorList.length > 0 ? errorList : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => data.value.cityBilling,
  (newValue: string) => {
    emits('updateBilling');
    if (newValue) {
      let result = validateName(newValue);
      const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
      errorsCity.value = errorList.length > 0 ? errorList : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => data.value.countryBilling,
  (newValue: string) => {
    emits('updateBilling');
    emits('updateBilling');
    if (data.value.postalCodeBilling) {
      let result = validatePostalCode(data.value.postalCodeBilling, newValue);
      errorsPostalCode.value = result.length > 0 ? result : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => data.value.postalCodeBilling,
  (newValue: string) => {
    emits('updateBilling');
    if (newValue) {
      let result = validatePostalCode(newValue, data.value.countryBilling);
      errorsPostalCode.value = result.length > 0 ? result : null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => data.value.isSameAddresses,
  (isSame: boolean) => {
    if (isSame) emits('setSameValues');
  },
  { deep: true, immediate: true }
);

const isValidInputData = computed(
  () =>
    !errorsCity.value &&
    !errorsCountry.value &&
    !errorsStreet.value &&
    !errorsPostalCode.value &&
    data.value.streetBilling &&
    data.value.countryBilling &&
    data.value.cityBilling &&
    data.value.postalCodeBilling
);

const nextStep = () => {
  emits('submitForm');
};

const prevStep = () => {
  props.cb(false);
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
        v-model="data.countryBilling"
        :options="['Russia', 'United States', 'United Kingdom']"
      ></SelectInput>

      <SimpleInput
        v-model="data.postalCodeBilling"
        placeholder="Postal code"
        :error="errorsPostalCode"
      />

      <SimpleInput
        v-model="data.streetBilling"
        placeholder="Street"
        :error="errorsStreet"
      />
      <SimpleInput
        v-model="data.cityBilling"
        placeholder="City"
        :error="errorsCity"
      >
      </SimpleInput>
      <CheckBox
        class="checkbox"
        label="set as default billing address"
        v-model="data.isDefaultBilling"
      />
      <CheckBox
        class="checkbox"
        label="set the same as the shipping address"
        v-model="data.isSameAddresses"
      />
      <div class="button-block">
        <MainButton
          class="button prev-step"
          type="submit"
          :options="{ buttonStyle: 'dark-grey' }"
          :isLoading="costumerStore.isLoading"
          name="Prev"
          @click="prevStep"
        >
        </MainButton>
        <MainButton
          class="button submit"
          type="submit"
          :disabled="!isValidInputData"
          :isLoading="costumerStore.isLoading"
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
@media screen and (max-width: 600px) {
  .checkbox {
    font-size: 13px;
  }
}
</style>
