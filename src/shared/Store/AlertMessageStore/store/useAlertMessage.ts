import { defineStore } from 'pinia';
import type { Notification } from '@shared/ui-kit/Alert/AlertText.vue';
interface NotificationState {
  notifications: Notification[];
}

export const useNotificationStore = defineStore('app', {
  state: (): NotificationState => ({
    notifications: [] as Notification[]
  }),
  getters: {
    getNotifications(): Notification[] {
      return this.notifications;
    }
  },
  actions: {
    addNotification(notification: Notification) {
      const timerId = setTimeout(() => {
        this.hideNotification(notification.id);
      }, 3000);

      this.notifications.push({
        ...notification,
        timerId
      });
    },

    hideNotification(id: number) {
      const index = this.notifications.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        clearTimeout(this.notifications[index].timerId);
        this.notifications.splice(index, 1);
      }
    }
  }
});
