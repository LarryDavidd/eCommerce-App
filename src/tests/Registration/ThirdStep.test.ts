import ThirdStep from '@pages/RegistrationPage/components/ThirdStep/ThirdStep.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
const testData = {
  countryShipping: 'Russia',
  cityShipping: 'Moscow',
  streetShipping: 'AAA',
  postalCodeShipping: '123456',
  isDefaultShipping: true
};

const wrapper = mount(ThirdStep, {
  props: {
    data: testData,
    cb: () => console.log('next')
  }
});

describe('Third Step', () => {
  it('correctly render component', () => {
    const wrapper = mount(ThirdStep, {
      props: {
        data: testData,
        cb: () => console.log('next')
      }
    });
    const inputStreet = wrapper.find('input[type="text"]#Street').element as HTMLInputElement;
    const inputCity = wrapper.find('input[type="text"]#City').element as HTMLInputElement;

    expect(wrapper.props('data')).toEqual(testData);
    expect(wrapper.find('span.title').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]#Street').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]#City').exists()).toBeTruthy();
    expect(wrapper.find('button.prev-step').exists()).toBeTruthy();
    expect(wrapper.find('button.next-step').exists()).toBeTruthy();

    expect(inputStreet.value).toBe(testData.streetShipping);
    expect(inputCity.value).toBe(testData.cityShipping);
  });

  it('correctly switching disabled at the button', async () => {
    const prevBut = wrapper.find('button.prev-step');
    const nextBut = wrapper.find('button.next-step');
    expect(prevBut.attributes('disabled')).toBeUndefined();

    expect(nextBut.attributes('disabled')).toBeUndefined();

    await wrapper.setProps({ data: { ...testData, postalCodeShipping: '153' } });

    expect(nextBut.attributes('disabled')).not.toBeUndefined();
  });
});
