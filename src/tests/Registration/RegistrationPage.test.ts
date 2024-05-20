import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { RegistrationPage } from '@pages/RegistrationPage';
import FirstStep from '@pages/RegistrationPage/components/FirstStep/FirstStep.vue';
import SecondStep from '@pages/RegistrationPage/components/SecondStep/SecondStep.vue';
import ThirdStep from '@pages/RegistrationPage/components/ThirdStep/ThirdStep.vue';
import ForthStep from '@pages/RegistrationPage/components/ForthStep/ForthStep.vue';

describe('RegistrationPage tests', () => {
  it('should render FirstStep by default', () => {
    const wrapper = mount(RegistrationPage);
    expect(wrapper.findComponent(FirstStep).exists()).toBeTruthy();
  });

  it('should render SecondStep when step is 2', async () => {
    const wrapper = mount(RegistrationPage);
    await wrapper.vm.changeStep();
    expect(wrapper.findComponent(SecondStep).exists()).toBeTruthy();
  });

  it('should render ThirdStep when step is 3', async () => {
    const wrapper = mount(RegistrationPage);
    await wrapper.vm.changeStep(true);
    await wrapper.vm.changeStep(true);
    expect(wrapper.findComponent(ThirdStep).exists()).toBeTruthy();
  });

  it('should render ForthStep when step is 4', async () => {
    const wrapper = mount(RegistrationPage);
    await wrapper.vm.changeStep(true);
    await wrapper.vm.changeStep(true);
    await wrapper.vm.changeStep(true);
    expect(wrapper.findComponent(ForthStep).exists()).toBeTruthy();
  });

  it('should change to the next step when changeStep is called with true', async () => {
    const wrapper = mount(RegistrationPage);
    await wrapper.vm.changeStep(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.step).toBe(2);
  });

  it('should change to the previous step when changeStep is called with false', async () => {
    const wrapper = mount(RegistrationPage);
    await wrapper.vm.changeStep(true);
    await wrapper.vm.changeStep(false);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.step).toBe(1);
  });

  it('should call register method when submit-form event is emitted in ForthStep', async () => {
    const wrapper = mount(RegistrationPage);
    const registerSpy = vi.spyOn(wrapper.vm, 'register');
    await wrapper.vm.changeStep(true);
    await wrapper.vm.changeStep(true);
    await wrapper.vm.changeStep(true);
    wrapper.findComponent(ForthStep).vm.$emit('submit-form');
    await wrapper.vm.$nextTick();
    expect(registerSpy).toHaveBeenCalled();
  });
});
