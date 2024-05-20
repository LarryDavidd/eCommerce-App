<script lang="ts" setup>
import SearchBar from '@shared/ui-kit/SearchBar/SearchBar.vue';
import ButtonIconCounter from '@shared/ui-kit/Buttons/ButtonIconCounter/ButtonIconCounter.vue';
import ButtonIcon from '@shared/ui-kit/Buttons/ButtonIcon/ButtonIcon.vue';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import CartIcon from '@/shared/ui-kit/Icons/CartIcon.vue';
import LoginIcon from '@/shared/ui-kit/Icons/LoginIcon.vue';
import { ref } from 'vue';
import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';

const count = ref<number>(0);
</script>

<template>
  <header class="flex h-20 w-full flex-col justify-center">
    <div class="header__wrapper mx-6 flex justify-between gap-4 md:mx-20 lg:gap-32">
      <div class="flex w-1/2 flex-col gap-4 md:w-4/5 md:flex-row md:gap-8">
        <router-link to="/"><div class="text-base font-bold lg:text-xl">Shop Name</div></router-link>
        <SearchBar></SearchBar>
      </div>

      <div class="flex flex-col items-end gap-4 md:flex-row md:items-start">
        <div class="flex gap-4 text-xs">
          <template v-if="!useCostumerStore().isLogined">
            <router-link to="/registration">
              <div class="login__button flex gap-2">
                <div class="login__button-text flex flex-col justify-center">Registration</div>
                <ButtonIcon>
                  <template v-slot:icon>
                    <LoginIcon />
                  </template>
                </ButtonIcon></div
            ></router-link>

            <router-link to="/login">
              <div class="login__button flex gap-2">
                <div class="login__button-text flex flex-col justify-center">Login</div>
                <ButtonIcon>
                  <template v-slot:icon>
                    <LoginIcon />
                  </template>
                </ButtonIcon></div
            ></router-link>
          </template>

          <template v-else>
            <div
              class="login__button flex cursor-pointer gap-2"
              @click="useCostumerStore().LogoutCostumer()"
            >
              <div class="login__button-text flex flex-col justify-center">Logout</div>
              <ButtonIcon style="transform: scaleX(-1)">
                <template v-slot:icon>
                  <LoginIcon />
                </template>
              </ButtonIcon>
            </div>
          </template>
        </div>

        <div class="flex gap-4">
          <router-link to="/favorites">
            <ButtonIconCounter :count="count">
              <template v-slot:icon>
                <LikeHeart />
              </template>
            </ButtonIconCounter>
          </router-link>

          <router-link to="/cart">
            <ButtonIconCounter :count="count">
              <template v-slot:icon>
                <CartIcon />
              </template>
            </ButtonIconCounter>
          </router-link>
        </div>
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
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 5%;
  text-align: left;
}
</style>
