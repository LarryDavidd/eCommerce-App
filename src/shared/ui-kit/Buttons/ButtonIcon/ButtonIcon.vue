<template>
  <div class="button-icon">
    <slot name="icon" />
  </div>
</template>

<style lang="scss" scoped>
.button-icon {
  @apply relative 
  flex
  w-fit
  cursor-pointer 
  select-none 
  items-center 
  justify-center
  rounded-sm
  duration-500;

  &:hover {
    background-color: rgb(110, 110, 118);
  }
}
</style>
