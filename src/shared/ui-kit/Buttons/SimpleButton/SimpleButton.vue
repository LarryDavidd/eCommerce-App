<script lang="ts" setup>
type ColorStyleType = 'btn-neutral' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-ghost' | 'btn-link' | 'btn-info' | 'btn-success' | 'btn-warning' | 'btn-error';

type OutlineType = 'btn-outline';

type PropsType = {
  name: string;
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  options?: {
    colorStyle?: ColorStyleType;
    outlineStyle?: OutlineType;
  };
  isDisabled?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  name: 'Simple Button',
  isDisabled: false
});
</script>

<template>
  <button
    :type="props.type || 'button'"
    class="btn btn-wide"
    :class="[props.options?.outlineStyle, props.options?.colorStyle, props.isLoading ? 'pointer-events-none' : '']"
    :disabled="isDisabled || isLoading"
  >
    <template v-if="props.isLoading">
      <span class="loading loading-spinner loading-md"></span>
    </template>
    <template v-else>
      {{ props.name }}
    </template>
  </button>
</template>
