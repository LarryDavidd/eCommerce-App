<template>
  <div class="home-page-container mx-6 md:mx-20">
    <div class="content flex grow justify-between">
      <div>home page</div>
      <router-link to="/catalog">
        <p class="underline hover:text-blue-500">catalog</p>
      </router-link>
    </div>
    <DiscountList />
  </div>
</template>

<script lang="ts" setup>
import DiscountList from '@pages/HomePage/components/DiscountList.vue';
</script>

<style lang="scss" scoped>
.home-page-container {
  //display: flex;
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
