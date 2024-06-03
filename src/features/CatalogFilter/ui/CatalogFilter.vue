<script setup lang="ts">
import MyAccordion from '@/shared/ui-kit/Accordion/MyAccordion.vue';
import CategoriesAll from '../components/CategoriesAll.vue';
import SortCheckboxes from '../components/SortCheckboxes.vue';
import RangeSlider from '@/shared/ui-kit/Inputs/RangeSlider/RangeSlider.vue';
import { useFilterStore } from '@/entities/Product/store/filterStore';
import { onMounted, onUnmounted, ref } from 'vue';
import AccordionIcon from '@shared/ui-kit/Icons/AccordionIcon.vue';
import FilterIcon from '@shared/ui-kit/Icons/FilterIcon.vue';

const filterStore = useFilterStore();

const minPrice = ref(filterStore.getMinPrice);
const maxPrice = ref(filterStore.getMaxPrice);

const updateRangeValue = (newPrice) => {
  filterStore.setPrice(newPrice);
};
const isVisible = ref(false);
const toggleBlock = () => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <div class="container">
    <div
      class="wrapper slide-block"
      :class="{ 'slide-block--visible': isVisible }"
    >
      <div
        class="toggle-button"
        @click="toggleBlock"
      >
        <FilterIcon
          color="white"
          class="accordion-icon"
        />
      </div>
      <h2 class="filter-title">
        Filtering
        <span class="lowercase"> and </span>
        Sorting
      </h2>
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
  </div>
</template>

<style scoped lang="scss">
.filter-title {
  color: #525252;
  text-transform: uppercase;
}

.container {
  z-index: 10;
  top: 0;
  position: sticky;
  display: flex;
  align-items: center;
}

.toggle-button {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  height: 80px;
  position: absolute;
  right: -38px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 10px;
  background-color: #434343;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-block {
  z-index: 100;
  position: absolute;
  left: -300px;
  top: 0;
  width: 300px;
  transition: left 0.5s ease;
  flex-direction: column;
  display: flex;
  gap: 10px;
  padding: 20px 20px;
  margin-bottom: 10px;
  border: 1px solid #525252;
  background-color: white;
}

.slide-block--visible {
  left: 0;
}
</style>
