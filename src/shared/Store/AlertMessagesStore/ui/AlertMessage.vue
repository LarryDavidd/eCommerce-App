<script lang="ts" setup>
import AlertText from '@shared/ui-kit/Alert/AlertText.vue';
import { useAlertMessage } from '../store/useAlertMessage';

const alertMessageStore = useAlertMessage();
</script>

<template>
  <transition-group name="slide-fade">
    <AlertText
      v-for="(alert, index) in alertMessageStore.GetMessage()"
      :key="index"
      :message="alert.message"
      :status="alert.status"
      class="fixed bottom-0 left-1/2 max-w-[400px] translate-x-1/2"
    />
  </transition-group>
</template>

<style scoped>
@keyframes slide-fade-in {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-fade-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.slide-fade-enter-active {
  animation: slide-fade-in 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  animation: slide-fade-out 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
