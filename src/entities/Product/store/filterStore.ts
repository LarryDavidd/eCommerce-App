import { useAppState } from '@/shared/Store/AppStore';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const NAME_SPACE = 'FilterStore';

export const useFilterStore = defineStore(NAME_SPACE, () => {
  const queryArgs = reactive({
    offset: 0,
    limit: 10,
    categories: new Set<string>(new Set()),
    price: <{ min: number; max: null | number }>{},
    searchText: <string>'',
    sort: { priceCondition: 'none', nameCondition: 'none' }
  });

  const getPriceCondition = computed(() => queryArgs.sort.priceCondition);
  const getNameCondition = computed(() => queryArgs.sort.nameCondition);

  const appState = useAppState();

  const getQueryArgs = computed(() => queryArgs);

  const setOffset = (offset: number) => (queryArgs.offset = offset);

  const addRemoveCategory = (category: string) => (queryArgs.categories.has(category) ? queryArgs.categories.delete(category) : queryArgs.categories.add(category));

  const changeSortByPrice = (newCondition: string) => (queryArgs.sort.priceCondition = newCondition);
  const changeSortByName = (newCondition: string) => (queryArgs.sort.nameCondition = newCondition);

  const setPrice = (newPrice: { min: number; max: number }) => (queryArgs.price = newPrice);

  const getMinPrice = computed(() => queryArgs.price.min);
  const getMaxPrice = computed(() => queryArgs.price.max);

  const setSearchText = (text: string) => (queryArgs.searchText = text);

  return {
    getPriceCondition,
    getNameCondition,
    addRemoveCategory,
    setPrice,
    setSearchText,
    changeSortByPrice,
    changeSortByName,
    getQueryArgs,
    getMinPrice,
    getMaxPrice
  };
});
