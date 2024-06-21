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

  const getLimit = computed(() => queryArgs.limit);

  const getCategories = computed(() => queryArgs.categories);

  const getPriceCondition = computed(() => queryArgs.sort.priceCondition);
  const getNameCondition = computed(() => queryArgs.sort.nameCondition);

  const getMinPrice = computed(() => queryArgs.price.min);
  const getMaxPrice = computed(() => queryArgs.price.max);

  const getQueryArgs = computed(() => queryArgs);

  const setOffset = (offset: number) => (queryArgs.offset = offset);

  const addRemoveCategory = (category: string) => (queryArgs.categories.has(category) ? queryArgs.categories.delete(category) : queryArgs.categories.add(category));

  const changeSortByPrice = (newCondition: string) => (queryArgs.sort.priceCondition = newCondition);
  const changeSortByName = (newCondition: string) => (queryArgs.sort.nameCondition = newCondition);

  const setPrice = (newPrice: { min: number; max: number }) => (queryArgs.price = newPrice);

  const setSearchText = (text: string) => (queryArgs.searchText = text);

  const resetFilter = () => {
    (queryArgs.offset = 0),
      (queryArgs.limit = 10),
      (queryArgs.categories = new Set<string>(new Set())),
      (queryArgs.price = <{ min: number; max: null | number }>{}),
      (queryArgs.searchText = <string>''),
      (queryArgs.sort = { priceCondition: 'none', nameCondition: 'none' });
  };

  return {
    addRemoveCategory,
    setPrice,
    setSearchText,
    setOffset,
    changeSortByPrice,
    changeSortByName,
    resetFilter,
    getLimit,
    getCategories,
    getPriceCondition,
    getNameCondition,
    getQueryArgs,
    getMinPrice,
    getMaxPrice
  };
});
