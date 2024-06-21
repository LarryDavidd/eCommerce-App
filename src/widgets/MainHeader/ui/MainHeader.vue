<script lang="ts" setup>
import ChangeLanguage from '@features/ChangeLanguage';
import ChangeCurrency from '@features/ChangeCurrency';
import { UserProfile } from '@features/UserProfile';
import { useFilterStore } from '@entities/Product';
import { HeaderSearchBar } from '@shared/ui-kit/SearchBar';
import CartButtonCounter from '../component/CartButtonCounter.vue';
import CartIcon from '@shared/ui-kit/Icons/CartIcon.vue';
import InfoIcon from '@shared/ui-kit/Icons/InfoIcon.vue';

const filterStore = useFilterStore();

const serchNewValue = (text: string) => {
  filterStore.setSearchText(text);
};
</script>

<template>
  <div class="header-bg">
    <header class="wrapper flex min-h-20 w-full flex-col justify-center px-4 py-2 md:px-10">
      <div class="flex justify-between gap-4">
        <div class="mlg:w-4/5 flex w-1/2 flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <router-link to="/"><div class="text-base font-bold lg:text-xl">Shop Name</div></router-link>
          <HeaderSearchBar @update:model-value="serchNewValue" />
        </div>

        <div class="flex flex-col items-end gap-4 lg:flex-row lg:items-center">
          <div class="flex gap-4 text-xs">
            <ChangeLanguage />
            <ChangeCurrency />
          </div>

          <div class="flex gap-4">
            <UserProfile />

            <router-link to="/cart">
              <CartButtonCounter />
            </router-link>

            <router-link to="/catalog">
              <CartIcon />
            </router-link>

            <router-link to="/about-us">
              <InfoIcon />
            </router-link>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.header-bg {
  background: rgb(240, 240, 240);
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
