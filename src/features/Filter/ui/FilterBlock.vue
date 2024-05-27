<script setup lang="ts">
import RadioButton from '@shared/ui-kit/Buttons/RadioButton/RadioButton.vue';
import CheckBox from '@shared/ui-kit/Inputs/CheckBox/CheckBox.vue';
import MyAccordion from '@shared/ui-kit/Accordion/MyAccordion.vue';
import type { FilterElement, RangeFilter, CheckboxFilter } from '@features/store/useFilter';
import RangeSlider from '@shared/ui-kit/Inputs/RangeSlider/RangeSlider.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';
import { defineProps } from 'vue';

const props = defineProps<{
  dataFilter?: FilterElement[];
  dataCheckbox?: CheckboxFilter[];
  dataRange?: RangeFilter;
  isMainBlock?: boolean;
}>();

const emits = defineEmits(['reset-filters', 'update:data-range']);

const resetFilters = () => {
  emits('reset-filters');
};

const updateRangeValue = (value: RangeFilter) => {
  emits('update:data-range', value);
};
</script>

<template>
  <div :class="['filter-wrapper', { subcategories: !props.isMainBlock }]">
    <h2
      class="filter-title"
      v-if="props.isMainBlock"
    >
      Filtering
    </h2>
    <MyAccordion
      v-for="filter in props.dataFilter"
      :key="filter.title"
      :title="filter.title"
    >
      <template v-if="filter.type === 'checkbox'">
        <CheckBox
          class="checkbox-elem"
          v-for="(item, index) in filter.elements"
          v-model="item.valueCheckbox"
          :label="item.label"
          :key="index"
        />
      </template>

      <template v-if="filter.type === 'radio'">
        <RadioButton
          v-for="(item, index) in filter.elements"
          :key="index"
          :value="item.label"
          v-model="filter.selected"
          :label="item.label"
          :name="item.name"
        />
      </template>
      <template v-if="filter.type === 'category'">
        <FilterBlock
          :data-filter="filter.subcategories"
          :is-main-block="false"
        ></FilterBlock>
      </template>
    </MyAccordion>

    <CheckBox
      v-for="(item, idx) in props.dataCheckbox"
      :key="idx"
      class="sale-flag"
      :label="item.label"
      v-model="item.value"
    />

    <RangeSlider
      v-if="props.dataRange"
      :model-value="props.dataRange"
      @update:model-value="updateRangeValue"
    />

    <MainButton
      v-if="props.isMainBlock"
      :options="{ buttonStyle: 'light-grey--font-light' }"
      name="Reset"
      class="reset-button"
      @click="resetFilters"
    />
  </div>
</template>

<style scoped lang="scss">
.reset-button {
  margin: 5px 0;
}

.sale-flag,
.range-slider {
  font-size: 15px;
}

.sale-flag.checkbox-wrapper {
  padding-right: 5px;
}

.sale-flag.checkbox-wrapper {
  flex-direction: row-reverse;
  justify-content: space-between;
}

.filter-wrapper {
  border: 1px solid #525252;
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-title {
  margin-bottom: 10px;
  color: #525252;
  text-transform: uppercase;
}

.checkbox-elem,
.sale-flag {
  &.checkbox-wrapper {
    color: #393a39;
  }

  & input#myCheckbox {
    border: 1px solid #393a39;
  }
}

.subcategories {
  font-size: 14.5px;
  border: none;
  margin: 0;

  & .accordion {
    padding: 0;
    border: none;
  }
}
</style>
