<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import SelectInput from '@shared/ui-kit/Inputs/SelectInput/SelectInput.vue';
import CheckBox from '@shared/ui-kit/Inputs/CheckBox/CheckBox.vue';
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import { ValidateAddress } from '@pages/UserProfilePage/model/useValidate';
import type { Address } from '@pages/UserProfilePage/model/useUserData';
import CheckBoxSimple from '@/shared/ui-kit/Inputs/CheckBoxSimple/CheckBoxSimple.vue';

export type AddressErrors = {
  street: string[] | null;
  city: string[] | null;
  postalCode: string[] | null;
};

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object as () => Address,
    required: true
  },
  hasAddressesErrors: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['update:modelValue', 'update:hasAddressesErrors', 'deleteAddress']);

const errorsAddress: Ref<AddressErrors> = ref({
  city: null,
  street: null,
  postalCode: null
});

const localModelValue = ref({ ...props.modelValue });

watch(
  localModelValue,
  (newValue) => {
    errorsAddress.value = ValidateAddress(newValue);
    if (Object.values(errorsAddress.value).some((value) => value !== null)) {
      emit('update:hasAddressesErrors', true);
    } else {
      emit('update:hasAddressesErrors', false);
    }
    emit('update:modelValue', newValue);
  },
  { deep: true }
);
</script>

<template>
  <div class="input-wrap">
    <h2 class="title-block">{{ props.title }}</h2>
    <template
      v-for="(value, title) in localModelValue"
      :key="title"
    >
      <template v-if="title !== 'id'">
        <span
          class="title-input"
          v-if="title !== 'isBilling' && title !== 'isShipping' && title !== 'isBillingDefault' && title !== 'isShippingDefault'"
          >{{ title }}</span
        >
        <CheckBox
          :disabled="isDisabled"
          v-if="title === 'isBilling' || title === 'isShipping' || title === 'isBillingDefault' || title === 'isShippingDefault'"
          :label="title"
          v-model="localModelValue[title]"
        />
        <SelectInput
          v-else-if="title === 'country' && !isDisabled"
          :options="['Russia', 'United States']"
          v-model="localModelValue[title]"
        />
        <SimpleInput
          :id="title + localModelValue[title]"
          v-else-if="title === 'country'"
          :placeholder="localModelValue[title]"
          v-model="localModelValue[title]"
          :disabled="isDisabled"
          :label="title"
        />
        <SimpleInput
          v-else
          :id="title + Math.random()"
          :disabled="isDisabled"
          v-model="localModelValue[title]"
          :placeholder="localModelValue[title]"
          :label="title"
          :error="errorsAddress[title]"
        />
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.input-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 7px;
}
</style>
