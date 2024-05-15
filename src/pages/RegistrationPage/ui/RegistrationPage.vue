<script lang="ts" setup>
import { ref } from 'vue';
import FirstStep from '@features/ui/Forms/FirstStep/FirstStep.vue';
import SecondStep from '@features/ui/Forms/SecondStep/SecondStep.vue';
import ThirdStep from '@features/ui/Forms/ThirdStep/ThirdStep.vue';
import ForthStep from '@features/ui/Forms/ForthStep/ForthStep.vue';

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
</script>

<template>
  <div class="flex h-dvh w-dvw bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
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
        />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
