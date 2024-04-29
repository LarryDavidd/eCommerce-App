<template>
  <button
    class="btn btn-neutral h-14 rounded-xl px-6 py-2 font-semibold"
    :disabled="isLoading"
    @click="clickButton"
  >
    <div
      v-show="isLoading"
      class="flex"
    >
      <span class="loading loading-spinner"></span>
      <div class="ml-2 self-center">{{ props.buttonText ? 'Loading' : '' }}</div>
    </div>
    <div
      v-show="!isLoading"
      class="flex"
    >
      <img
        :src="imageSrc"
        alt=""
      />
      <div class="ml-2 self-center">{{ props.buttonText }}</div>
    </div>
  </button>
</template>

<script lang="ts" setup>
type PropsType = {
  buttonText: string;
  imageSrc: string;
  isLoading: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  buttonText: '',
  imageSrc: '',
  isLoading: false
});

const emit = defineEmits(['event:click']);

const clickButton = () => {
  emit('event:click');
};
</script>
