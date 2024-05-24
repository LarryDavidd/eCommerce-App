<script setup lang="ts">
import Slider from '@vueform/slider';
import { ref, watch } from 'vue';
const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5000
  },
  step: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['update:rangeValue']);
const value = ref([props.min, props.max]);
watch(value, (newValue) => {
  emit('update:rangeValue', newValue);
});
const min = ref(props.min);
const max = ref(props.max);
watch(
  props,
  () => {
    value.value = [props.min, props.max];
  },
  { deep: true }
);
</script>
<template>
  <div class="range-slider">
    <Slider
      :lazy="false"
      :tooltips="false"
      :min="min"
      :max="max"
      v-model="value"
      :step="props.step"
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
