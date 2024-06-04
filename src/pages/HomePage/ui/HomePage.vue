<template>
  <div class="home-page-container mx-6 flex md:mx-20">
    <div class="content flex flex-grow justify-between">
      <div>home page</div>
      <!-- <ProductCard></ProductCard> -->
      <div class="flex gap-4">
        <router-link to="/catalog">
          <p class="underline hover:text-blue-500">catalog</p>
        </router-link>
      </div>
    </div>
  </div>
  <h1 class="text-center text-5xl">We didn't have time to finish the job. And we would be very grateful if you would check out our work a little later!</h1>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';
import { type RangeFilter, useFilterStore } from '@features/store/useFilter';
import BurgerButton from '@shared/ui-kit/Buttons/BurgerButton/BurgerButton.vue';
import { ProductCard } from '@shared/components/productCard';

const filtersAccordion = computed(() => useFilterStore().getFiltersAccordion);
const checkboxFilters = computed(() => useFilterStore().getCheckboxFilters);
const rangeFilter = computed(() => useFilterStore().getRangeFilter);
const { resetFilters } = useFilterStore();

const updateRange = (value: RangeFilter) => {
  rangeFilter.value.min = value.min;
  rangeFilter.value.max = value.max;
};

const logout = () => {
  if (useCostumerStore().isLogined) useCostumerStore().LogoutCostumer();
};

const isFilterVisible = ref(false);
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value >= 768) isFilterVisible.value = windowWidth.value >= 768;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.home-page-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 600px;
  position: relative;
}

.filter-wrapper {
  background: white;
  min-width: 250px;
}

.aaa {
  background-color: white;
}

@media (max-width: 768px) {
  .filter-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    transition: all 0.3s ease;
    z-index: 5;
    //&.active {
    //  left: 0;
    //}
  }

  .slide-enter-to,
  .slide-leave-from {
    left: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    left: -100%;
  }

  //.slide-enter-to,
  //.slide-leave-from {
  //  left: 0;
  //}
}
</style>
