<script lang="ts" setup>
type PropsType = {
  count: number;
};

const props = withDefaults(defineProps<PropsType>(), {
  count: 0
});
</script>

<template>
  <div class="button-icon">
    <slot name="icon" />

    <div class="button-icon__info">
      <span>{{ props.count }}</span>
    </div>
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
  rounded-lg
  duration-500;

  &:hover {
    background-color: rgb(110, 110, 118);
  }

  &__info {
    position: absolute;
    left: 60%;
    bottom: 40%;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 16px;
    height: 16px;

    background-color: rgba(255, 0, 0, 0.5);
    border-radius: 100%;

    font-size: 1rem;
    font-weight: bold;
    color: white;

    backdrop-filter: contrast(0);
  }
}
</style>
