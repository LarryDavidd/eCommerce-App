<script lang="ts" setup>
import { ref } from 'vue';
import { useAppState } from '@shared/Store/AppStore';
import CurrencyIcon from '@shared/ui-kit/Icons/CurrencyIcon.vue';
import { CustomSelect } from '@shared/ui-kit/Inputs';
const appStore = useAppState();

const selectedCurrency = ref(appStore.getCurrentCurrency);
</script>

<template>
  <CustomSelect
    :options="['RUB', 'USD', 'EUR']"
    v-model="selectedCurrency"
    :icon="CurrencyIcon"
    title="Currency"
    @update:model-value="(currency) => appStore.changeCurrencyCode(currency)"
  />
</template>
