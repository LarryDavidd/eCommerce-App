import { defineStore } from 'pinia';
import type { NotificationAlert } from '@shared/ui-kit/Alert';
interface NotificationState {
  notifications: NotificationAlert[];
}

export const useNotificationStore = defineStore('app', {
  state: (): NotificationState => ({
    notifications: [] as NotificationAlert[]
  }),
  getters: {
    getNotifications(): NotificationAlert[] {
      return this.notifications;
    }
  },
  actions: {
    addNotification(notification: NotificationAlert) {
      const timerId = setTimeout(() => {
        this.hideNotification(notification.id);
      }, 3000);

      this.notifications.push({
        ...notification,
        timerId
      });
    },

    addSuccesNotification(message: string) {
      const notification = {
        id: Date.now(),
        message,
        type: 'success'
      };

      const timerId = setTimeout(() => {
        this.hideNotification(notification.id);
      }, 3000);

      this.notifications.push({
        ...notification,
        timerId
      });
    },

    addErrorNotification(message: string) {
      const notification = {
        id: Date.now(),
        message,
        type: 'error'
      };

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
