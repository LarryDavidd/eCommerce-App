<script setup lang="ts">
import FooterColumn from './FooterColumn.vue';

const data = [
  {
    title: 'Information',
    links: [
      { title: 'Order Processing', path: '/404' },
      { title: 'Delivery Information', path: '/404' },
      { title: 'Payment Terms', path: '/404' },
      { title: 'Privacy and Information Protection', path: '/404' },
      { title: 'Details', path: '/404' }
    ]
  },
  {
    title: 'Customer Support',
    links: [
      { title: 'How can we assist you?', path: '/404' },
      { title: 'Contacts', path: '/404' },
      { title: 'Size Chart', path: '/404' }
    ]
  },
  {
    title: 'Customer Service',
    links: [
      { title: 'Personal Account', path: '/404' },
      { title: 'Shopping Cart', path: '/cart' },
      { title: 'Order History', path: '/404' },
      { title: 'News', path: '/404' },
      { title: 'Search', path: '/404' },
      { title: 'Site Map', path: '/404' }
    ]
  },
  {
    title: 'Store Name',
    links: [
      { title: 'About Us', path: '/404' },
      { title: 'Store Map', path: '/404' },
      { title: 'Gift Card', path: '/404' },
      { title: 'Careers', path: '/404' },
      { title: 'Stores', path: '/404' }
    ]
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
