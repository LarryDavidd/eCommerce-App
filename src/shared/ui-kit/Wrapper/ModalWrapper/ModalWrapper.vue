<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="modal-overlay"
      @click="close"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <slot @update:changePassword="$emit('update:changePassword', $event)"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'update:changePassword']);

const toggleOverflow = (flag: boolean) => {
  document.body.style.overflow = flag ? 'hidden' : 'auto';
};

watch(
  () => props.isOpen,
  (newValue) => {
    toggleOverflow(newValue);
  }
);
const close = () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
