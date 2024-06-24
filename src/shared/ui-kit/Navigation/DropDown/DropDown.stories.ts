import type { Meta, StoryObj } from '@storybook/vue3';
import DropDown from './DropDown.vue';
import UserProfileIcon from '@shared/ui-kit/Icons/UserProfileIcon.vue';
import { RouterLinkStub } from '@vue/test-utils';

const meta: Meta<typeof DropDown> = {
  title: 'UI-KIT/DropDown',
  component: DropDown,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return {
      components: { DropDown, UserProfileIcon, RouterLink: RouterLinkStub },
      setup() {},
      template: `
        <div style="max-width: 200px;">
          <DropDown>
            <template #main>
              <div style="cursor: pointer">
                Select action
              </div>
            </template>
            <template #dropdown>
              <div class="block-wrapper">
                <p style="cursor: pointer">Action 1</p>
                <p style="cursor: pointer">Action 2</p>
              </div>
            </template>
          </DropDown>
        </div>
      `
    };
  }
};
