<script setup lang="ts">
import RadioButton from '@shared/ui-kit/Buttons/RadioButton/RadioButton.vue';
import CheckBox from '@shared/ui-kit/Inputs/CheckBox/CheckBox.vue';
import MyAccordion from '@shared/ui-kit/Accordion/MyAccordion.vue';
import { useFilterStore } from '@features/store/useFilter';
import { computed, watch } from 'vue';
import RangeSlider from '@shared/ui-kit/Inputs/RangeSlider/RangeSlider.vue';
import MainButton from '@shared/ui-kit/Buttons/MainButton/MainButton.vue';
const { resetFilters } = useFilterStore();
const filtersAccordion = computed(() => useFilterStore().getFiltersAccordion);
const checkboxFilters = computed(() => useFilterStore().getCheckboxFilters);
const rangeFilter = computed(() => useFilterStore().rangeFilter);
watch(
  () => rangeFilter.value,
  () => {
    console.log('lalal', rangeFilter.value.min, rangeFilter.value.max);
  }
);
const updateRangeValue = (value: number[]) => {
  rangeFilter.value.min = value[0];
  rangeFilter.value.max = value[1];
};
</script>

<template>
  <div class="filter-wrapper">
    <h2 class="filter-title">Filtering</h2>
    <MyAccordion
      v-for="filter in filtersAccordion"
      :key="filter.title"
      :title="filter.title"
    >
      <template v-if="filter.type === 'checkbox'">
        <CheckBox
          class="aaa"
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
    </MyAccordion>

    <CheckBox
      v-for="(item, idx) in checkboxFilters"
      :key="idx"
      class="sale-flag"
      :label="item.label"
      v-model="item.value"
    />
    <RangeSlider
      @update:range-value="updateRangeValue"
      :min="rangeFilter.min"
      :max="rangeFilter.max"
    />
    <MainButton
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
.aaa,
.sale-flag {
  &.checkbox-wrapper {
    color: #393a39;
  }
  & input#myCheckbox {
    border: 1px solid #393a39;
  }
}
</style>
