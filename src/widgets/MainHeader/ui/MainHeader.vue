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
  <div class="header-bg">
    <header class="header__wrapper flex min-h-20 w-full flex-col justify-center px-4 md:px-10">
      <div class="flex justify-between gap-4">
        <div class="mlg:w-4/5 flex w-1/2 flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <router-link to="/"><div class="text-base font-bold lg:text-xl">Shop Name</div></router-link>
          <SearchBar></SearchBar>
        </div>

        <div class="flex flex-col items-end gap-4 lg:flex-row lg:items-center">
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

            <router-link to="/catalog">
              <CartIcon />
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

.header__wrapper {
  max-width: 1400px;
  margin: 0 auto;
  //padding: 0 40px;
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
