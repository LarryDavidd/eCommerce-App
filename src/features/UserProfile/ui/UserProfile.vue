<script setup lang="ts">
import DropDown from '@shared/ui-kit/DropDown/DropDown.vue';
import UserProfileIcon from '@shared/ui-kit/Icons/UserProfileIcon.vue';
import { useCostumerStore } from '@entities/Costumer/store/costumerStore';

const handleLogout = () => {
  useCostumerStore().LogoutCostumer();
};
</script>

<template>
  <DropDown>
    <template #main>
      <UserProfileIcon
        color="#4e4d4d  "
        class="user-icon"
      />
    </template>
    <template #dropdown>
      <div class="block-wrapper">
        <template v-if="!useCostumerStore().isLogined">
          <router-link to="/login">
            <li>Sign in</li>
          </router-link>
          <router-link to="/registration">
            <li>Sign up</li>
          </router-link>
        </template>
        <template v-if="useCostumerStore().isLogined">
          <li @click="handleLogout">Logout</li>
          <router-link to="/profile">
            <li>Profile</li>
          </router-link>
        </template>
      </div>
    </template>
  </DropDown>
</template>

<style scoped lang="scss">
.block-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 5px;
}

.dropdown-popup-inner {
  row-gap: 7px;
  align-items: center;
  flex-direction: column;
  display: flex;
  list-style: none;
}
.dropdown-popup {
  width: fit-content;
  left: 50%;
  transform: translate(-50%, 100%);
}

.user-icon {
  cursor: pointer;
}
li {
  cursor: pointer;
}

li {
  transition: all 0.3s ease;
}
li:hover {
  font-weight: 600;
}
</style>
