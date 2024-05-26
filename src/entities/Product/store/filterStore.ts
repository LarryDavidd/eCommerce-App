import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

const NAME_SPACE = 'FilterStore';

export const useFilterStore = defineStore(NAME_SPACE, () => {
  const categories = ref(new Set<string>());
  const price = reactive<{ min: number; max: null | number }>({
    min: 0,
    max: null
  });

  const addCategory = (category: string) => {
    categories.value.add(category);
  };

  const removeCategory = (category: string) => {
    categories.value.delete(category);
  };

  const setMinPrice = (mixPrice: number) => {
    price.min = mixPrice;
  };

  const setMaxPrice = (maxPrice: number) => {
    price.max = maxPrice;
  };
});
