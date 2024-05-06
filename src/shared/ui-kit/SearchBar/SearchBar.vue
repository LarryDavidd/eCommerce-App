<script lang="ts" setup>
import magnifier from '../assets/magnifier.svg';
</script>

<template>
  <div class="search-bar__container flex h-1/4 w-8">
    <div class="search-bar__magnifier size-8">
      <span><img :src="magnifier" /></span>
    </div>
    <div class="search-bar__text">search</div>
  </div>
</template>

<style scoped>
.search-bar__container {
  background: rgb(211, 211, 211);
}

.search-bar__magnifier {
  background: rgb(196, 196, 196);
}
</style>
