<script setup lang="ts">
import { useFilterStore } from '@/entities/Product/store/filterStore';
import MyAccordion from '@/shared/ui-kit/Accordion/MyAccordion.vue';
import RadioButtonSimple from '@/shared/ui-kit/Buttons/RadioButtonSimple/RadioButtonSimple.vue';
import { computed } from 'vue';

const filterStore = useFilterStore();

const changeSortByName = (sort: string) => {
  filterStore.changeSortByName(sort);
};

const changeSortByPrice = (sort: string) => {
  filterStore.changeSortByPrice(sort);
};

const priceCondition = computed(() => filterStore.getPriceCondition);
const nameCondition = computed(() => filterStore.getNameCondition);
</script>

<template>
  <MyAccordion
    class="inner-accordion"
    key="By Price"
    title="By Price"
  >
    <RadioButtonSimple
      group="sort-by-price"
      name="asc"
      :value="priceCondition === 'asc'"
      @update:model-value="changeSortByPrice('asc')"
    />
    <RadioButtonSimple
      group="sort-by-price"
      name="desc"
      :value="priceCondition === 'desc'"
      @update:model-value="changeSortByPrice('desc')"
    />
    <RadioButtonSimple
      group="sort-by-price"
      name="none"
      :value="priceCondition === 'none'"
      @update:model-value="changeSortByPrice('none')"
    />
  </MyAccordion>
  <MyAccordion
    class="inner-accordion"
    key="By Name"
    title="By Name"
  >
    <RadioButtonSimple
      name="asc"
      :value="nameCondition === 'asc'"
      @update:model-value="changeSortByName('asc')"
    />
    <RadioButtonSimple
      name="desc"
      :value="nameCondition === 'desc'"
      @update:model-value="changeSortByName('desc')"
    />
    <RadioButtonSimple
      name="none"
      :value="nameCondition === 'none'"
      @update:model-value="changeSortByName('none')"
    />
  </MyAccordion>
</template>
<style scoped>
.inner-accordion {
  border: none;
}
</style>
