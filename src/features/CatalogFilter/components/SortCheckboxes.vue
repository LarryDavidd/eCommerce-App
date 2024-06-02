<script setup lang="ts">
import { useFilterStore } from '@/entities/Product/store/filterStore';
import MyAccordion from '@/shared/ui-kit/Accordion/MyAccordion.vue';
import RadioButtonSimple from '@/shared/ui-kit/Buttons/RadioButtonSimple/RadioButtonSimple.vue';
import { reactive, ref } from 'vue';

const filterStore = useFilterStore();

const changeSortByName = (sort: string) => {
  filterStore.changeSortByName(sort);
};

const changeSortByPrice = (sort: string) => {
  filterStore.changeSortByPrice(sort);
};

const priceCondition = ref(filterStore.getQueryArgs.sort.priceCondition);
const nameCondition = ref(filterStore.getQueryArgs.sort.nameCondition);
</script>

<template>
  <MyAccordion
    key="By Price"
    title="By Price"
  >
    <RadioButtonSimple
      group="sort-by-price"
      name="asc"
      :value="priceCondition === 'asc'"
      @update:model-value="changeSortByPrice('price asc')"
    />
    <RadioButtonSimple
      group="sort-by-price"
      name="desc"
      :value="priceCondition === 'desc'"
      @update:model-value="changeSortByPrice('price desc')"
    />
    <RadioButtonSimple
      group="sort-by-price"
      name="none"
      :value="priceCondition === 'name'"
      @update:model-value="changeSortByPrice('price desc')"
    />
  </MyAccordion>
  <MyAccordion
    key="By Name"
    title="By Name"
  >
    <RadioButtonSimple
      name="asc"
      :value="nameCondition === 'asc'"
      @update:model-value="changeSortByName('name.en-US asc')"
    />
    <RadioButtonSimple
      name="desc"
      :value="nameCondition === 'desc'"
      @update:model-value="changeSortByName('name.en-US desc')"
    />
    <RadioButtonSimple
      name="none"
      :value="nameCondition === 'none'"
      @update:model-value="changeSortByName('name.en-US desc')"
    />
  </MyAccordion>
</template>
