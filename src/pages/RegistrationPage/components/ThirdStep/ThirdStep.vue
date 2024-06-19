<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { validateName, validatePostalCode, validateStreet } from '@shared/validation/validation';
import { FormWrapper } from '@shared/ui-kit/Wrapper';
import { SimpleInput } from '@shared/ui-kit/Inputs';
import { SelectInput } from '@shared/ui-kit/Inputs';
import { CheckBox } from '@shared/ui-kit/Inputs';
import { MainButton } from '@shared/ui-kit/Buttons';

interface StepData {
  countryShipping: string;
  cityShipping: string;
  streetShipping: string;
  postalCodeShipping: string;
  isDefaultShipping: boolean;
}
const props = defineProps({
  data: { type: Object as () => StepData, required: true },
  cb: { type: Function, required: true }
});
const { data } = toRefs(props);

const errorsStreet = ref<null | string[]>(null);
const errorsCity = ref<null | string[]>(null);
const errorsCountry = ref<null | string[]>(null);
const errorsPostalCode = ref<null | string[]>(null);

watch(
  () => data.value.streetShipping,
  (newValue: string) => {
    let result = validateStreet(newValue);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    errorsStreet.value = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

watch(
  () => data.value.cityShipping,
  (newValue: string) => {
    let result = validateName(newValue);
    const errorList = result.errors.map((error) => error.message).filter((message): message is string => message !== undefined);
    errorsCity.value = errorList.length > 0 ? errorList : null;
  },
  { deep: true }
);

watch(
  () => data.value.countryShipping,
  (newValue: string) => {
    if (data.value.postalCodeShipping) {
      let result = validatePostalCode(data.value.postalCodeShipping, newValue);
      errorsPostalCode.value = result.length > 0 ? result : null;
    }
  },
  { deep: true }
);

watch(
  () => data.value.postalCodeShipping,
  (newValue: string) => {
    let result = validatePostalCode(newValue, data.value.countryShipping);
    errorsPostalCode.value = result.length > 0 ? result : null;
  },
  { deep: true }
);

const isValidInputData = computed(
  () =>
    !errorsCity.value &&
    !errorsCountry.value &&
    !errorsStreet.value &&
    !errorsPostalCode.value &&
    data.value.streetShipping &&
    data.value.countryShipping &&
    data.value.cityShipping &&
    data.value.postalCodeShipping
);

const nextStep = () => {
  props.cb();
};

const prevStep = () => {
  props.cb(false);
};
</script>
<template>
  <FormWrapper>
    <template #content>
      <div class="title-block">
        <h2 class="clarification">Shipping address</h2>
        <span class="title">Registration</span>
        <span>Step 3</span>
      </div>
      <SelectInput
        v-model="data.countryShipping"
        :options="['Russia', 'United States', 'United Kingdom']"
      ></SelectInput>
      <SimpleInput
        class="postal-code"
        v-model="data.postalCodeShipping"
        placeholder="Postal code"
        :error="errorsPostalCode"
      />
      <SimpleInput
        v-model="data.streetShipping"
        placeholder="Street"
        :error="errorsStreet"
      />
      <SimpleInput
        v-model="data.cityShipping"
        placeholder="City"
        :error="errorsCity"
      >
      </SimpleInput>
      <CheckBox
        label="set as default shipping address"
        v-model="data.isDefaultShipping"
      />
      <div class="button-block">
        <MainButton
          class="button prev-step"
          type="submit"
          :options="{ buttonStyle: 'dark-grey' }"
          name="Prev"
          @click="prevStep"
        >
        </MainButton>
        <MainButton
          class="button next-step"
          type="submit"
          :disabled="!isValidInputData"
          :options="{ buttonStyle: 'dark-grey' }"
          name="Next"
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
