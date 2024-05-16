import { ref } from 'vue';
import { defineStore } from 'pinia';

const NAME_SPACE = 'useAlertMessage';

type AlertType = {
  status: 'error' | 'warning' | 'success';
  message: string;
};

export const useAlertMessage = defineStore(NAME_SPACE, () => {
  const messages = ref<AlertType[]>([]);

  function GetMessage() {
    return messages.value;
  }

  function SetMessage(message: AlertType) {
    messages.value.push(message);

    setTimeout(() => {
      const index = messages.value.indexOf(message);
      if (index > -1) {
        messages.value.splice(index, 1);
      }
    }, 10000);
  }

  function RemoveMessage(index: number) {
    if (index < 0 && index > messages.value.length) return;
    messages.value.splice(index, 1);
  }

  return { SetMessage, RemoveMessage, GetMessage };
});
