<template>
  <div class="wrapper flex min-h-[600px] px-4 md:px-10">
    <div class="content flex grow justify-between">
      <div>home page</div>
      <div class="flex gap-4">
        <router-link to="/catalog">
          <p class="underline hover:text-blue-500">catalog</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
