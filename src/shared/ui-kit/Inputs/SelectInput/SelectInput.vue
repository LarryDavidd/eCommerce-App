<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    required: true,
    type: Array as () => string[]
  }
});

const emits = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

const updateValue = (value: string) => {
  emits('update:modelValue', value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue;
  }
);
</script>

<template>
  <select
    @change="updateValue(selected)"
    v-model="selected"
  >
    <option
      class="defaultValue"
      disabled
      value=""
    >
      Please select country
    </option>
    <option
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<style scoped>
.defaultValue {
  color: #ababab;
}

select {
  background-color: white;
  width: 100%;
  height: 40px;
  outline: none;
  font-size: 18px;
  color: #525252;
  padding: 0px 9px;
  border: 1px solid #dedede;
}

select.error-input {
  border: 2px solid #fd304a;
}
</style>
