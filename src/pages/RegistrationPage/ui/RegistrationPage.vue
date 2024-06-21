<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { BaseAddress } from '@commercetools/platform-sdk';
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';
import { FirstStep, SecondStep, ThirdStep, ForthStep } from '../';

const router = useRouter();

const costumerStore = useCostumerStore();

const step = ref(1);

const data = ref({
  firstStep: {
    name: '',
    surname: '',
    birthDate: null
  },
  secondStep: {
    email: '',
    password: ''
  },
  thirdStep: {
    countryShipping: 'Russia',
    cityShipping: '',
    streetShipping: '',
    postalCodeShipping: '',
    isDefaultShipping: false
  },
  forthStep: {
    countryBilling: 'Russia',
    cityBilling: '',
    streetBilling: '',
    postalCodeBilling: '',
    isDefaultBilling: false,
    isSameAddresses: false
  }
});

enum Countries {
  'Russia' = 'RU',
  'United States' = 'US',
  'United Kingdom' = 'GB'
}

function formatDate(date: Date | null) {
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
}

const changeStep = (flag: boolean = true) => {
  if (flag) step.value += 1;
  else step.value -= 1;
};

const setSameAddresses = () => {
  data.value.forthStep.cityBilling = data.value.thirdStep.cityShipping;
  data.value.forthStep.streetBilling = data.value.thirdStep.streetShipping;
  data.value.forthStep.countryBilling = data.value.thirdStep.countryShipping;
  data.value.forthStep.postalCodeBilling = data.value.thirdStep.postalCodeShipping;
};

const checkSameness = () => {
  if (
    data.value.forthStep.isSameAddresses &&
    (data.value.forthStep.cityBilling !== data.value.thirdStep.cityShipping ||
      data.value.forthStep.streetBilling !== data.value.thirdStep.streetShipping ||
      data.value.forthStep.countryBilling !== data.value.thirdStep.countryShipping ||
      data.value.forthStep.postalCodeBilling !== data.value.thirdStep.postalCodeShipping)
  ) {
    data.value.forthStep.isSameAddresses = false;
  }
};

const register = () => {
  const dateOfBirth = formatDate(data.value.firstStep.birthDate);
  const addresses: BaseAddress[] = [
    {
      country: Countries[data.value.thirdStep.countryShipping],
      city: data.value.thirdStep.cityShipping,
      streetName: data.value.thirdStep.streetShipping,
      postalCode: data.value.thirdStep.postalCodeShipping
    },
    {
      country: Countries[data.value.forthStep.countryBilling],
      city: data.value.forthStep.cityBilling,
      streetName: data.value.forthStep.streetBilling,
      postalCode: data.value.forthStep.postalCodeBilling
    }
  ];
  costumerStore
    .RegistrationCostumer({
      firstName: data.value.firstStep.name,
      lastName: data.value.firstStep.surname,
      dateOfBirth,

      email: data.value.secondStep.email,
      password: data.value.secondStep.password,

      addresses: addresses,
      shippingAddresses: [0],
      billingAddresses: data.value.forthStep.isSameAddresses ? [0] : [1],
      defaultShippingAddress: data.value.thirdStep.isDefaultShipping ? 0 : undefined,
      defaultBillingAddress: data.value.forthStep.isDefaultBilling ? 1 : undefined
    })
    .then((data) => {
      if (data.isLogined.value) router.push({ name: 'home' });
    });
};
</script>

<template>
  <div class="page-wrapper flex bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center md:h-screen lg:py-0">
      <transition
        name="fade"
        mode="out-in"
      >
        <FirstStep
          :data="data.firstStep"
          v-if="step === 1"
          :cb="changeStep"
        />
        <SecondStep
          :data="data.secondStep"
          v-else-if="step === 2"
          :cb="changeStep"
        />
        <ThirdStep
          :data="data.thirdStep"
          v-else-if="step === 3"
          :cb="changeStep"
        />
        <ForthStep
          :data="data.forthStep"
          v-else-if="step === 4"
          :cb="changeStep"
          @setSameValues="setSameAddresses"
          @updateBilling="checkSameness"
          @submit-form="register"
        />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding: 40px;
}
@media (max-width: 400px) {
  .page-wrapper {
    padding: 80px 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    padding-top 0.5s,
    padding-bottom 0.5s;
  overflow: hidden;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
