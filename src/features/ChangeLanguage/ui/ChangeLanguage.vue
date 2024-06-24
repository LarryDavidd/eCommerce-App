<script lang="ts" setup>
import { ref } from 'vue';
import { useAppState } from '@shared/Store/AppStore';
import { CustomSelect } from '@shared/ui-kit/Inputs';
import GlobeIcon from '@shared/ui-kit/Icons/GlobeIcon.vue';

const appStore = useAppState();

const selectedLang = ref(appStore.getCurrentLang);
</script>

<template>
  <CustomSelect
    :options="['ru', 'en-US']"
    v-model="selectedLang"
    :icon="GlobeIcon"
    title="Language"
    @update:model-value="(lang) => appStore.changeLanguage(lang)"
  />
</template>
