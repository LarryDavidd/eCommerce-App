import FirstStep from '@pages/RegistrationPage/components/FirstStep/FirstStep.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
const testData = {
  name: 'John',
  surname: 'Doe',
  birthDate: new Date('1990-01-01')
};
const wrapper = mount(FirstStep, {
  props: {
    data: testData,
    cb: () => console.log('next')
  }
});
describe('First Step', () => {
  it('correctly receives props from parent', () => {
    const wrapper = mount(FirstStep, {
      props: {
        data: testData,
        cb: () => console.log('next')
      }
    });
    expect(wrapper.props('data')).toEqual(testData);
    expect(wrapper.find('span.title').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]#Name').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]#Surname').exists()).toBeTruthy();
    expect(wrapper.find('input.dp__input').exists()).toBeTruthy();
    expect(wrapper.find('#next-but').exists()).toBeTruthy();
    const inputName = wrapper.find('input[type="text"]#Name').element as HTMLInputElement;
    expect(inputName.value).toBe(testData.name);
    const inputSurname = wrapper.find('input[type="text"]#Surname').element as HTMLInputElement;
    expect(inputSurname.value).toBe(testData.surname);
  });
});

describe('Name validation', () => {
  it('validate name function', async () => {
    expect(wrapper.vm.errorsName).toBeNull();

    await wrapper.setProps({ data: { ...testData, name: 'InvalidName123' } });
    expect(wrapper.vm.errorsName).not.toBeNull();

    await wrapper.setProps({ data: { ...testData, name: 'Sasha' } });
    expect(wrapper.vm.errorsName).toBeNull();
  });

  it('validate birthDate function', async () => {
    expect(wrapper.vm.errorsBirthDate).toBeNull();
    await wrapper.setProps({ data: { ...testData, birthDate: new Date() } });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorsBirthDate).not.toBeNull();
    await wrapper.vm.$nextTick();
    await wrapper.setProps({ data: { ...testData, birthDate: new Date('2000-01-01') } });
    expect(wrapper.vm.errorsBirthDate).toBeNull();
  });
});
