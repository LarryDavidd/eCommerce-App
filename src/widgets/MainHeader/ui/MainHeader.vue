<script lang="ts" setup>
import SearchBar from '@shared/ui-kit/SearchBar/SearchBar.vue';
import ButtonIconCounter from '@shared/ui-kit/Buttons/ButtonIconCounter/ButtonIconCounter.vue';
import ButtonIcon from '@shared/ui-kit/Buttons/ButtonIcon/ButtonIcon.vue';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import CartIcon from '@/shared/ui-kit/Icons/CartIcon.vue';
import LoginIcon from '@/shared/ui-kit/Icons/LoginIcon.vue';
</script>

<template>
  <header class="flex h-16 w-full flex-col justify-center">
    <div class="header__wrapper mx-20 flex justify-between">
      <div>Shop Name</div>
      <SearchBar></SearchBar>

      <div class="flex justify-between gap-10">
        <div class="login__button flex gap-2">
          <div class="login__button-text flex flex-col justify-center">Registration</div>
          <ButtonIcon>
            <template v-slot:icon>
              <LoginIcon />
            </template>
          </ButtonIcon>
        </div>

        <div class="login__button flex gap-2">
          <div class="login__button-text flex flex-col justify-center">Login</div>
          <ButtonIcon>
            <template v-slot:icon>
              <LoginIcon />
            </template>
          </ButtonIcon>
        </div>

        <ButtonIconCounter>
          <template v-slot:icon>
            <LikeHeart />
          </template>
        </ButtonIconCounter>

        <ButtonIconCounter>
          <template v-slot:icon>
            <CartIcon />
          </template>
        </ButtonIconCounter>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  background: rgb(240, 240, 240);
}

.header__wrapper {
  border: 20px;
}

.login__button-text {
  color: rgb(82, 82, 82);
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 5%;
  text-align: left;
}
</style>
