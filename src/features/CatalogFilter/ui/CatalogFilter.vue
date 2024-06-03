<script setup lang="ts">
import MyAccordion from '@/shared/ui-kit/Accordion/MyAccordion.vue';
import CategoriesAll from '../components/CategoriesAll.vue';
import SortCheckboxes from '../components/SortCheckboxes.vue';
</script>

<template>
  <div class="wrapper">
    <MyAccordion
      key="categories"
      title="Categories"
    >
      <CategoriesAll></CategoriesAll>
    </MyAccordion>
    <MyAccordion
      key="Sort"
      title="Sort"
    >
      <SortCheckboxes></SortCheckboxes>
    </MyAccordion>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  border: 1px solid #525252;
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
