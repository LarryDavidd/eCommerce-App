<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import AccordionIcon from '@shared/ui-kit/Icons/AccordionIcon.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
const isOpen = ref(false);
const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
  rotation.value += isOpen.value ? 180 : -180;
};
const classesAccordion = computed(() => {
  return {
    'is-closed': !isOpen.value
  };
});
const rotation = ref(0);
</script>

<template>
  <div class="accordion">
    <div
      @click="toggleAccordion"
      ref="accordionHead"
      class="accordion-header"
    >
      <span class="title">{{ props.title }}</span>
      <button>
        <AccordionIcon
          :style="{ transform: `rotate(${rotation}deg)` }"
          class="accordion-icon"
        />
      </button>
    </div>
    <div
      :class="isOpen ? 'accordion-body' : 'hidden'"
      ref="accordionBody"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #c4c4c4;
  padding: 5px;
  width: 100%;
}
.accordion-header {
  justify-content: space-between;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
.accordion-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
  max-height: 1000px;
  //overflow: auto;
  transition: 0.3s ease all;
}
.is-closed .accordion-body {
  max-height: 0;
}
.accordion-icon {
  transition: transform 0.5s ease;
}

.checkbox-wrapper input[type='checkbox']#myCheckbox {
  border-color: #393a39;
  color: #393a39;
}

.title {
  color: #393a39;
}
</style>
