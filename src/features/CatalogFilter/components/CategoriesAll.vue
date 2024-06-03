<script lang="ts" setup>
import useCategoriesStore from '@entities/Categories';
import type { Category } from '@commercetools/platform-sdk';
import { useAppState } from '@shared/Store/AppStore';
import { onMounted, ref, watch } from 'vue';
import Accordion from '@/shared/ui-kit/Accordion/MyAccordion.vue';
import CheckBox from '@/shared/ui-kit/Inputs/CheckBox/CheckBox.vue';
import { useFilterStore } from '@/entities/Product/store/filterStore';

const useCategories = useCategoriesStore();

const useFilters = useFilterStore();

const appState = useAppState();

const data = ref<SimpleCategory[]>([]);

onMounted(() => {
  useCategories.requestGetCategories();
});

watch([() => useCategories.getData, () => appState.getCurrentLang], ([_data, _lang]) => {
  if (_data === null || _data === undefined) return;
  const map = filterCategories(_data, _lang);
  data.value = map;
});

export interface SimpleCategory {
  id: string;
  name: string;
  children: SimpleCategory[];
}

const filterCategories = (categories: Category[], lang: string) => {
  const categoryDict: { [id: string]: SimpleCategory } = {};
  categories.forEach((category) => {
    categoryDict[category.id] = { id: category.id, name: category.name[lang], children: [] };
  });

  // Step 2: Populate the 'children' arrays
  categories.forEach((category) => {
    if (category.parent) {
      const parentId = category.parent.id;
      categoryDict[parentId].children.push(categoryDict[category.id]);
    }
  });

  // Step 3: Create the result array with only root categories
  const result: SimpleCategory[] = categories.filter((category) => !category.parent).map((category) => categoryDict[category.id]);

  return result;
};
</script>

<template>
  <template v-if="useCategories.IsLoading"> Loading </template>
  <template v-else>
    <Accordion
      v-for="category in data"
      :key="category.id"
      :title="category.name"
    >
      <CheckBox
        class="checkbox-elem"
        v-for="subcategory in category.children"
        :label="subcategory.name"
        :key="subcategory.id"
        @update:model-value="() => useFilters.addRemoveCategory(subcategory.id)"
      />
    </Accordion>
  </template>
</template>
