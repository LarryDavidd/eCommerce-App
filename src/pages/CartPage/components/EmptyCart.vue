<script setup lang="ts"></script>

<template>
  <div class="empty-wrapper">
    <h2 class="title-empty">The shopping cart is still empty :(</h2>
    <p class="text-xl">
      Go to the
      <router-link
        class="link"
        to="/catalog"
        >catalog page
      </router-link>
      to choose the perfect outfit!
    </p>
    <img
      class="img"
      alt="empty-cart-svg"
      src="@shared/assets/images/empty_cart.svg"
    />
  </div>
</template>

<style scoped lang="scss">
.empty-wrapper {
  padding: 0 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-empty {
  font-size: 24px;
  font-weight: 600;
}

.link {
  color: rgba(63, 140, 64, 0.78);
  transition: all 0.5s ease;

  &:hover {
    color: rgba(163, 205, 136, 0.78);
  }
}

.img {
  max-width: 300px;
  height: auto;
}
</style>
