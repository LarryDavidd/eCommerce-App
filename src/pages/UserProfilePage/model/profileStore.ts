import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const NAME_SPACE = 'ProfileStore';

export const useProfileStore = defineStore(NAME_SPACE, () => {
  const getUserData = async () => {};

  return { getPriceCondition, getNameCondition, addRemoveCategory, setMaxPrice, setMinPrice, setSearchText, changeSortByPrice, changeSortByName, getQueryArgs };
});
