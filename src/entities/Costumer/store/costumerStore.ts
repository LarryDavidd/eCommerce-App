import { defineStore } from 'pinia';

const useCostumerStore = defineStore('costumer_store', () => {
  const user = ref<CustomerSignInResultType | null>(null);
  const userName = ref<string | null>(ls.load('user-name') ?? null);
  const isLoadingRef = ref(false);

  const IsLoading = computed(() => isLoadingRef.value);

  const GetUser = computed(() => user.value?.customer);

  const GetUserName = computed(() => userName.value);

  const GetUserCart = computed(() => user.value?.cart);

  async function SignIn(email: string, password: string) {
    isLoadingRef.value = true;
    const res = await fetchUserSignin({ email, password });

    let isError = false;
    let isLogin = false;

    if (res instanceof Error) {
      isError = true;
      alert.AddMessage({ status: 'error', message: res.message });
    } else {
      user.value = res;
      userName.value = res.customer.firstName ?? null;
      ls.set('user-name', userName.value);

      const result = await authController.PasswordFlowCommand.execute(email, password);

      if (result instanceof Error) {
        isError = true;
        alert.AddMessage({ status: 'error', message: result.message });
      } else {
        isLogin = true;
        alert.AddMessage({ status: 'success', message: 'Success Sign In' });
      }
    }

    isLoadingRef.value = false;

    return { data: res, isError, isLoading: isLoadingRef.value, isLogin };
  }

  return { SignIn, GetUser, GetUserCart, IsLoading, GetUserName };
});
