<script lang="ts" setup>
import SearchBar from '@shared/ui-kit/SearchBar/SearchBar.vue';
import ButtonIconCounter from '@shared/ui-kit/Buttons/ButtonIconCounter/ButtonIconCounter.vue';
import LikeHeart from '@shared/ui-kit/Icons/LikeHeart.vue';
import CartIcon from '@/shared/ui-kit/Icons/CartIcon.vue';
import { ref } from 'vue';
import CustomSelect from '@shared/ui-kit/Inputs/CustomSelect/CustomSelect.vue';
import GlobeIcon from '@shared/ui-kit/Icons/GlobeIcon.vue';
import CurrencyIcon from '@shared/ui-kit/Icons/CurrencyIcon.vue';
import UserProfile from '@features/UserProfile/ui/UserProfile.vue';
import { useAppState } from '@/shared/Store/AppStore';

const count = ref<number>(0);

const appStore = useAppState();

const selectedLang = ref(appStore.getCurrentLang);
const selectedCurrency = ref(appStore.getCurrentCurrency);
</script>

<template>
  <header class="flex h-20 w-full flex-col justify-center">
    <!--    lg:gap-32 убрать-->
    <div class="header__wrapper mx-6 flex justify-between gap-4 md:mx-20 lg:gap-32">
      <div class="flex w-1/2 flex-col gap-4 md:w-4/5 md:flex-row md:gap-8">
        <router-link to="/"><div class="text-base font-bold lg:text-xl">Shop</div></router-link>
        <SearchBar></SearchBar>
      </div>

      <div class="flex flex-col items-end gap-4 md:flex-row md:items-start">
        <div class="flex gap-4 text-xs">
          <CustomSelect
            :options="['ru', 'en-US']"
            v-model="selectedLang"
            :icon="GlobeIcon"
            title="Language"
            @update:model-value="(lang) => appStore.changeLanguage(lang)"
          />
          <CustomSelect
            :options="['RUB', 'USD', 'EUR']"
            v-model="selectedCurrency"
            :icon="CurrencyIcon"
            title="Currency"
            @update:model-value="(currency) => appStore.changeCurrencyCode(currency)"
          />
        </div>

        <div class="flex gap-4">
          <UserProfile />

          <router-link to="/catalog">
            <CartIcon />
          </router-link>

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
