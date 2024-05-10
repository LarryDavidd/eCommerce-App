<script setup lang="ts">
type PropsType = {
  name: string;
  links?: string[];
};

const props = defineProps<PropsType>();
</script>

<template>
  <div class="max-col-with">
    <h2 class="mb-4 max-w-xs text-left text-base font-medium leading-7 text-black">{{ props.name }}</h2>
    <ul>
      <li
        class="mb-3 text-base leading-6 text-gray-900"
        v-for="(link, index) in props.links"
        :key="index"
      >
        <a href="#">{{ link }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.max-col-with {
  max-width: 250px;
}
</style>
