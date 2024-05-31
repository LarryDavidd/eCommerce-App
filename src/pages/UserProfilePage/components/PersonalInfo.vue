<script setup lang="ts">
import type { PersonalErrors } from '@pages/UserProfilePage/ui/UserProfilePage.vue';
import SimpleInput from '@shared/ui-kit/Inputs/SimpleInput/SimpleInput.vue';
import DatePicker from '@shared/ui-kit/Inputs/DatePicker/DatePicker.vue';
import { ref, watch } from 'vue';
import type { Personal } from '@pages/UserProfilePage/model/useUserData';

const props = defineProps({
  modelValue: {
    type: Object as () => Personal,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: true
  },
  errors: {
    type: Object as () => PersonalErrors,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const localModelValue = ref({ ...props.modelValue });

watch(
  localModelValue,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
  { deep: true }
);
</script>

<template>
  <h2 class="title-block">Personal Info</h2>
  <template
    v-for="(_, title) in localModelValue"
    :key="title"
  >
    <div
      class="input-wrap"
      v-if="title !== 'password'"
    >
      <span class="title-input">{{ title }}</span>
      <DatePicker
        v-if="title === 'dateOfBirth'"
        placeholder="BirthDate"
        v-model="localModelValue[title]"
        :disabled="isDisabled"
        :error="errors[title]"
      />
      <SimpleInput
        v-else
        :disabled="isDisabled"
        v-model="localModelValue[title]"
        :placeholder="title"
        :label="title"
        :error="errors[title]"
      />
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
