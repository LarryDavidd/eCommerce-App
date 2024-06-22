import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SelectInput from '@shared/ui-kit/Inputs/SelectInput/SelectInput.vue';

describe('Select tests', () => {
  it('should render', () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        options: ['Option 1', 'Option 2', 'Option 3']
      }
    });

    expect(wrapper.find('select').exists()).toBeTruthy();
    const options = wrapper.findAll('option');
    expect(options.length).toBe(4); // включая "Please select country"
    expect(options[0].text()).toBe('Please select country');
    expect(options[1].text()).toBe('Option 1');
    expect(options[2].text()).toBe('Option 2');
    expect(options[3].text()).toBe('Option 3');
  });

  it('should emit update:modelValue on change', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: '',
        options: ['Option 1', 'Option 2', 'Option 3']
      }
    });

    const selectElement = wrapper.find('select');
    await selectElement.setValue('Option 2');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Option 2']);
  });

  it('should update selected value when modelValue prop changes', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: 'Option 1',
        options: ['Option 1', 'Option 2', 'Option 3']
      }
    });

    await wrapper.setProps({ modelValue: 'Option 3' });

    expect(wrapper.find('select').element.value).toBe('Option 3');
  });
});
