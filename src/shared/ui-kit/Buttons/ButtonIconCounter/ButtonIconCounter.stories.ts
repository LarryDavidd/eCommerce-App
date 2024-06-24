import type { Meta, StoryObj } from '@storybook/vue3';

import ButtonIconCounter from './ButtonIconCounter.vue';
import CartIcon from '@shared/ui-kit/Icons/CartIcon.vue';

const meta: Meta<typeof ButtonIconCounter> = {
  title: 'UI-KIT/Buttons/ButtonIconCounter',
  component: ButtonIconCounter,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CustomCount: Story = {
  args: {
    count: 1
  },
  render: (args) => ({
    components: { ButtonIconCounter, CartIcon },
    setup() {
      return { args };
    },
    template: `
      <ButtonIconCounter v-bind="args">
        <template #icon>
          <CartIcon />
        </template>
      </ButtonIconCounter>
    `
  })
};
