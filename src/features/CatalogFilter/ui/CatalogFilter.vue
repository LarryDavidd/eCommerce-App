<script setup lang="ts">
import MyAccordion from '@/shared/ui-kit/Accordion/MyAccordion.vue';
import CategoriesAll from '../components/CategoriesAll.vue';
import SortCheckboxes from '../components/SortCheckboxes.vue';
import RangeSlider from '@/shared/ui-kit/Inputs/RangeSlider/RangeSlider.vue';
import { useFilterStore } from '@/entities/Product/store/filterStore';
import { ref } from 'vue';

const filterStore = useFilterStore();

const minPrice = ref(filterStore.getMinPrice);
const maxPrice = ref(filterStore.getMaxPrice);

const updateRangeValue = (newPrice) => {
  filterStore.setPrice(newPrice);
};
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
    <RangeSlider
      :model-value="{ min: minPrice ? minPrice : 0, max: maxPrice ? maxPrice : 500 }"
      @update:model-value="(newPrice) => updateRangeValue(newPrice)"
    />
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
