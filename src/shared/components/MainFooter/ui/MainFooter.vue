<script setup lang="ts">
import FooterColumn from './FooterColumn.vue';

const data = [
  {
    title: 'Information',
    links: ['Order Processing', 'Delivery Information', 'Payment Terms', 'Privacy and Information Protection', 'Details']
  },
  {
    title: 'Customer Support',
    links: ['How can we assist you?', 'Contacts', 'Size Chart']
  },
  {
    title: 'Customer Service',
    links: ['Personal Account', 'Shopping Cart', 'Order History', 'News', 'Search', 'Site Map']
  },
  {
    title: 'Store Name',
    links: ['About Us', 'Store Map', 'Gift Card', 'Careers', 'Stores']
  }
];
</script>

<template>
  <footer>
    <div class="footer-top py-4 md:py-20">
      <div class="mx-20 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
        <FooterColumn
          v-for="(column, index) in data"
          :key="index"
          :name="column.title"
          :links="column.links"
        />
      </div>
    </div>
    <div class="bg-gray-300">
      <div class="mx-5 flex h-14 flex-col items-center justify-between md:mx-20 md:flex-row">
        <p>© 2024 All rights reserved</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-top {
  background: rgb(240, 240, 240);
}
</style>
