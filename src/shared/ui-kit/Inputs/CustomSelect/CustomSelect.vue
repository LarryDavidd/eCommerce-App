<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    required: true,
    type: Array
  },
  icon: {
    type: Object,
    required: false,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: '#4e4d4d'
  }
});

const emits = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

const updateValue = (event) => {
  const value = event.target.value;
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
  <div class="select-container">
    <select
      @change="updateValue"
      v-model="selected"
    >
      <option
        class="defaultValue"
        disabled
        value=""
      >
        {{ title }}
      </option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <span
      v-if="icon && selected"
      class="icon-container"
    >
      <component
        :is="icon"
        width="20px"
        height="20px"
        :color="iconColor"
      />
    </span>
  </div>
</template>

<style scoped lang="scss">
.defaultValue {
  color: #ababab;
}

select {
  background-color: white;
  width: 120px;
  height: 30px;
  outline: none;
  font-size: 15px;
  color: #525252;
  padding: 0px 9px;
  border: 1px solid #dedede;
  border-radius: 10px;
}

.select-container {
  height: fit-content;
  position: relative;
  //display: inline-block;
}

.icon-container {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  pointer-events: none;
}
@media (max-width: 500px) {
  select {
    width: 100px;
  }
}
</style>
