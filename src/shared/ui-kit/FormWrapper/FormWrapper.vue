<script setup lang="ts">
const props = defineProps({
  onSubmit: Function
});
</script>

<template>
  <form
    @submit.prevent="props.onSubmit"
    class="form-wrapper flex flex-col items-center gap-2"
  >
    <slot name="content" />
  </form>
</template>

<style scoped lang="scss">
.form-wrapper {
  width: 400px;
  background-color: #e8e7e7;
  padding: 20px 50px;
}
</style>
