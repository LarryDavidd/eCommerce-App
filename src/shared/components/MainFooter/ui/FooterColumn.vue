<script setup lang="ts">
import { ref } from 'vue';

type PropsType = {
  name: string;
  links?: Links[];
};
type Links = {
  title: string;
  path: string;
};

const isOpen = ref<boolean>(false);

const props = defineProps<PropsType>();
</script>

<template>
  <div class="max-col-with">
    <h2
      @click="isOpen = !isOpen"
      class="mb-4 max-w-xs cursor-pointer text-center text-base font-medium leading-7 text-black sm:cursor-default md:text-left"
    >
      {{ props.name }}
    </h2>
    <ul :class="{ isOpen: isOpen }">
      <li
        class="mb-3 text-center text-base leading-6 text-gray-900 md:text-left"
        v-for="(link, index) in props.links"
        :key="index"
      >
        <router-link :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.max-col-with {
  max-width: 15rem;
}

@media (max-width: 768px) {
  ul {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition:
      max-height 0.5s ease,
      opacity 0.5s ease;
  }

  .isOpen {
    max-height: 500px;
    opacity: 1;
  }

  h2 {
    cursor: pointer;
  }
}
</style>
