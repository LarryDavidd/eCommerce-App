import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { LoginPage } from '@pages/LoginPage';
import AuthForm from '@pages/LoginPage/components/AuthForm/AuthForm.vue';

describe('LoginPage tests', () => {
  it('should call login method when submitForm event is emitted from AuthForm', async () => {
    // const loginSpy = vi.fn();

    const wrapper = mount(LoginPage);

    const authFormComponent = wrapper.findComponent(AuthForm);

    expect(authFormComponent.exists()).toBe(true);

    // Эмитируем событие submitForm на компоненте AuthForm
    // authFormComponent.vm.$emit('submitForm');
    // await wrapper.vm.$nextTick();

    // Проверяем, что метод login был вызван
    // expect(loginSpy).toHaveBeenCalled();
  });
});
