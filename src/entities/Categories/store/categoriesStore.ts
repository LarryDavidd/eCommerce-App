import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import CategoriesApi from '../api/fetchCategories';
import { useAppState } from '@/shared/Store/AppStore';
import type { Category } from '@commercetools/platform-sdk';

const NAME_SPACE = 'CategoriesStore';

export const useCategoriesStore = defineStore(NAME_SPACE, () => {
  const appState = useAppState();
  const categoriesApi = new CategoriesApi();
  const data = ref<SimpleCategory[] | null>(null);
  const isLoading = ref<boolean>(false);

  // Getters
  const IsLoading = computed(() => isLoading.value);

  // Actions
  const requestGetCategories = async () => {
    isLoading.value = true;
    const categories = await categoriesApi.getAllCategories();

    if (categories instanceof Error) return;

    data.value = filterCategories(categories, appState.getCurrentLang);
    isLoading.value = false;
    console.log(data.value);
    return categories;
  };

  return { requestGetCategories, IsLoading };
});

interface SimpleCategory {
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
