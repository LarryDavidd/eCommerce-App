<script setup lang="ts">
import CrossButton from '@shared/ui-kit/Buttons/CrossButton/CrossButton.vue';

defineProps<{
  promoCodes: string[];
}>();
const emit = defineEmits(['deletePromo']);
const deletePromo = (promo: string) => {
  emit('deletePromo', promo);
};
</script>

<template>
  <div class="promo-list">
    <p class="text-center font-medium">Your promo codes</p>
    <ul v-if="promoCodes.length > 0">
      <li
        class="text-base-100 promo-item"
        v-for="promo in promoCodes"
        :key="promo"
      >
        {{ promo }}
        <CrossButton
          class="delete-promo cursor-pointer"
          @click="deletePromo(promo)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.promo-list {
  min-width: 340px;
  background-color: #f3f2f3;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
.delete-promo {
  display: inline-block;
  height: 20px;
  width: 20px;
  top: 50%;
  right: 0;
}
.promo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

@media (max-width: 750px) {
  .promo-list {
    width: 100%;
  }
}

@media (max-width: 550px) {
  .promo-list {
    min-width: 0;
  }
}
</style>
