import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import CategoriesApi from '../api/fetchCategories';
import { useAppState } from '@/shared/Store/AppStore';
import type { Category } from '@commercetools/platform-sdk';

const NAME_SPACE = 'CategoriesStore';

export const useCategoriesStore = defineStore(NAME_SPACE, () => {
  const appState = useAppState();
  const categoriesApi = new CategoriesApi();
  const data = ref<Category[] | null>(null);
  const isLoading = ref<boolean>(false);

  // Getters
  const IsLoading = computed(() => isLoading.value);

  const getData = computed(() => data.value);

  // Actions
  const requestGetCategories = async () => {
    isLoading.value = true;
    const categories = await categoriesApi.getAllCategories();

    if (categories instanceof Error) return;

    data.value = categories;
    isLoading.value = false;
    return categories;
  };

  return { requestGetCategories, getData, IsLoading };
});
