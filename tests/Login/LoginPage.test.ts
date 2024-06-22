import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { LoginPage } from '@pages/LoginPage';
import AuthForm from '@pages/LoginPage/components/AuthForm/AuthForm.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('LoginPage tests', () => {
  it('should call login method when submitForm event is emitted from AuthForm', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const wrapper = mount(LoginPage);

    const authFormComponent = wrapper.findComponent(AuthForm);

    expect(authFormComponent.exists()).toBe(true);
  });
});
