<template>
  <footer class="main-footer d-flex p-2 px-3 bg-white border-top m-0">
    <div :class="[contained ? 'container' : 'container-fluid']">
      <div class="row">
        <ul class="nav">
          <li
            :key="idx"
            class="nav-item"
            v-for="(item, idx) in menuItems">
            <d-link
              :to="item.to"
              class="nav-link">
              {{ item.title }}
            </d-link>
          </li>
        </ul>
        <span class="copyright ml-auto my-auto mr-2">{{ copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
const defaultMenuItems = [{
  title: 'Home',
  to: '/',
}, {
  title: 'Packages',
  to: '/packages_price',
}, {
  title: 'FAQs',
  to: '/faq/general',
}];

export default {
  name: 'MainFooter',
  props: {
    /**
       * The footer menu items.
       */
    menuItems: {
      type: Array,
      default() {
        return defaultMenuItems;
      },
    },
    /**
       * The copyright information.
       */
    copyright: {
      type: String,
      default: 'Copyright © 2019 Paperdaz. All right reserved',
    },
    /**
       * Whether the footer should be wrapped in a container, or not.
       */
    contained: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
