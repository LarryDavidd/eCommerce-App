<script lang="ts" setup>
type ButtonStyleType = 'light-grey--font-light' | 'dark-grey' | 'light-grey--font-bold' | 'light-grey--border-bold' | 'small';

type OutlineType = 'border';

const emit = defineEmits<{
  (e: 'btnclick'): void;
}>();

type PropsType = {
  name: string;
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  options: {
    buttonStyle: ButtonStyleType;
    outlineStyle?: OutlineType;
  };
  isDisabled?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
  name: 'Main Button',
  isDisabled: false
});

const handleClick = () => {
  emit('btnclick');
};
</script>

<template>
  <button
    :type="props.type || 'button'"
    :class="[props.options.buttonStyle, props.options?.outlineStyle, props.isLoading ? 'pointer-events-none' : '']"
    :disabled="isDisabled || isLoading"
    @click="handleClick"
  >
    <template v-if="props.isLoading">
      <span class="loading loading-spinner loading-md"></span>
    </template>
    <template v-else>
      {{ props.name }}
    </template>
  </button>
</template>

<style scoped lang="scss">
button {
  margin: 15px;
  box-sizing: border-box;

  outline: none;
  border: none;
}
.light-grey--font-light {
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;

  width: 250px;
  height: 40px;

  background: rgb(229, 229, 229);
}
.dark-grey {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;

  height: 60px;

  background: rgb(82, 82, 82);
}
.light-grey--font-bold {
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;

  width: 424px;
  height: 40px;

  background: rgb(240, 240, 240);
  &.border {
    border: 2px solid rgb(82, 82, 82);
  }
}
.light-grey--border-bold {
  color: rgb(82, 82, 82);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;

  width: 290px;
  height: 40px;

  box-sizing: border-box;
  border: 3px solid rgb(82, 82, 82);
  background: rgb(240, 240, 240);
}
.small {
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;

  width: 50px;
  height: 30px;

  box-sizing: border-box;
  border: 1px solid rgb(0, 0, 0);
  background: rgb(240, 240, 240);
  &.checked {
    box-shadow: 2px 2px 0 0 rgb(0, 0, 0);
  }
}
</style>
