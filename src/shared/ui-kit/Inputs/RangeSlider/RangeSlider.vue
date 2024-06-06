<script setup lang="ts">
import Slider from '@vueform/slider';
import { ref, watch } from 'vue';
import type { RangeFilter } from '@features/store/useFilter';
const props = defineProps({
  modelValue: {
    type: Object as () => RangeFilter,
    default: () => ({ min: 0, max: 500, title: '' })
  }
});
const emit = defineEmits(['update:modelValue']);
const value = ref([props.modelValue.min, props.modelValue.max]);
watch(value, (newValue) => {
  emit('update:modelValue', { min: newValue[0], max: newValue[1] });
});

watch(
  () => props.modelValue,
  () => (value.value = [props.modelValue.min, props.modelValue.max]),
  { deep: true }
);
// const min = ref(props.modelValue.min);
// const max = ref(props.modelValue.max);
// const changePrice = () => {
//   emit('update:modelValue', { min: newValue[0], max: newValue[1], title: props.modelValue.title });
// }
// watch(
//   props,
//   () => {
//     value.value = [props.modelValue.min, props.modelValue.max];
//   },
//   { deep: true }
// );
</script>
<template>
  <div class="range-slider">
    <Slider
      :lazy="true"
      :tooltips="false"
      :min="0"
      :max="500"
      v-model="value"
    />
  </div>
  <div class="price-inputs">
    <div class="field">
      <span>Min</span>
      <input
        class="price min-price"
        type="number"
        v-model="value[0]"
      />
    </div>
    <div class="field">
      <span>Max</span>
      <input
        class="price max-price"
        type="number"
        v-model="value[1]"
      />
    </div>
  </div>
</template>
<style src="@vueform/slider/themes/default.css" />
<style scoped>
.range-slider {
  font-size: 15px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.price-inputs {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
}
.price-inputs,
.field {
  display: inline-block;
}
.price-inputs {
  color: #525252;
  display: flex;
  gap: 5px;
}
.field {
  display: flex;
  gap: 10px;
}
.price {
  border: 1px solid grey;
  max-width: 50px;
  text-align: center;
  background-color: white;
}
</style>
