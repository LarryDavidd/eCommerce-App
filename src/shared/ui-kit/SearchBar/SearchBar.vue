<script lang="ts" setup>
import magnifier from '../assets/magnifier.svg';

const emit = defineEmits(['update:modelValue']);

function onSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;

  const text = (form.elements.namedItem('search-text') as HTMLInputElement).value;
  if (text.trim() !== '') {
    emit('update:modelValue', text);
  }
}
</script>

<template>
  <form
    :onsubmit="onSubmit"
    class="search-bar__container flex"
  >
    <button class="search-bar__magnifier size-8">
      <img
        class="p-1"
        :src="magnifier"
      />
    </button>
    <div class="search-bar__text flex w-full justify-center">
      <input
        type="text"
        name="search-text"
        placeholder="Search"
        class="w-full bg-transparent text-center focus:outline-none"
      />
    </div>
  </form>
</template>

<style scoped>
.search-bar__container {
  background: rgb(211, 211, 211);
  border-radius: 5px;
}

.search-bar__magnifier {
  @apply duration-500;
  background: rgb(196, 196, 196);
  border-radius: 5px 0 0 5px;

  &:hover {
    background-color: rgb(110, 110, 118);
  }
}
@media (max-width: 1024px) {
  .search-bar__container {
    width: 50%;
  }
}
@media (max-width: 640px) {
  .search-bar__container {
    width: 120%;
  }
}

.text {
  color: rgb(82, 82, 82);
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 15%;
  text-align: center;
}
</style>
