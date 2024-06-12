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
    <div class="footer-bg">
      <div class="footer__wrapper px-4 md:px-10">
        <div class="footer-top py-4 md:py-20">
          <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between md:gap-10">
            <FooterColumn
              v-for="(column, index) in data"
              :key="index"
              :name="column.title"
              :links="column.links"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="bg-gray-300">
        <div class="footer__wrapper px-4 md:px-10">
          <div class="flex h-14 flex-col items-center justify-between md:flex-row">
            <p>© 2024 All rights reserved</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-bg {
  background: rgb(240, 240, 240);
}
.footer__wrapper {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
