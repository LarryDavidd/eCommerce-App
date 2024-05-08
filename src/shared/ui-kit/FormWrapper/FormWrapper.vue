<script setup lang="ts">
const props = defineProps({
  onSubmit: Function
});
</script>

<template>
  <form
    @submit.prevent="props.onSubmit"
    class="auth-wrapper flex flex-col items-center gap-2"
  >
    <slot name="content" />
  </form>
</template>

<style scoped lang="scss"></style>
