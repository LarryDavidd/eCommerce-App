<script lang="ts" setup>
type PropsType = {
  amount: number;
  currentPage: number;
};

const props = defineProps<PropsType>();

const emit = defineEmits(['update:modelValue']);

const changePaginationPage = (num: number) => {
  if (num >= 1 && num <= props.amount) emit('update:modelValue', num);
};
</script>

<template>
  <div class="inline-flex h-10 -space-x-px text-base">
    <button
      @click="() => changePaginationPage(currentPage - 1)"
      class="prev__button"
    >
      Previous
    </button>
    <button
      v-for="num in amount"
      @click="() => changePaginationPage(num)"
      :class="currentPage === num ? 'active__button' : 'unactive__button'"
      :key="num"
    >
      {{ num }}
    </button>
    <button
      @click="() => changePaginationPage(currentPage + 1)"
      class="next__button"
    >
      Next
    </button>
  </div>
</template>

<style scoped lang="scss">
.button-base {
  @apply flex h-10 items-center justify-center border border-gray-300 px-4 leading-tight dark:border-gray-700;
}

.button-base-light {
  @apply bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.button-base-dark {
  @apply dark:bg-gray-700 dark:text-white;
}

.prev__button {
  @apply ms-0 rounded-s-lg border-e-0;
  @extend .button-base, .button-base-light;
}

.next__button {
  @apply rounded-e-lg;
  @extend .button-base, .button-base-light;
}

.active__button {
  @apply bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700;
  @extend .button-base, .button-base-dark;
}

.unactive__button {
  @apply cursor-pointer;
  @extend .button-base, .button-base-light;
}
</style>
