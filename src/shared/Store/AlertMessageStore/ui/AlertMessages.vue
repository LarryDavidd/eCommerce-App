<template>
  <div class="notification">
    <transition-group name="transition-animate">
      <NotificationAlert
        v-for="notification in notifications"
        :notification="notification"
        :key="notification.id"
        @click="hideNotification(notification.id)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '../store/useAlertMessage';
import { ref } from 'vue';
import { NotificationAlert } from '@shared/ui-kit/Alert';

const { getNotifications } = useNotificationStore();
const appStore = useNotificationStore();

const notifications = ref(getNotifications);

const hideNotification = (id: number) => {
  appStore.hideNotification(id);
};
</script>

<style lang="scss">
.notification {
  flex-direction: column-reverse;
  display: flex;
  position: fixed;
  top: 100px;
  right: 16px;
  z-index: 10;
  width: 100%;
  max-width: 300px;
}

.transition-animate {
  &-enter-from {
    transform: translateX(120px);
    opacity: 0;
  }

  &-enter-active {
    transition: all ease 1s;
  }

  &-enter-to {
    opacity: 1;
  }

  &-leave-from {
    opacity: 1;
  }

  &-leave-active {
    transition: all ease 1s;
  }

  &-leave-to {
    transform: translateX(120px);
    opacity: 0;
  }

  &-move {
    transition: all ease 1s;
  }
}
</style>
