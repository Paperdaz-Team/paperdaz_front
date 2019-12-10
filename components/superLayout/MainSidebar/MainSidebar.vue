<template>
  <aside
    :class="['main-sidebar', 'col-12', 'col-md-3', 'col-lg-2', 'p-0', sidebarVisible ? 'open' : '']">
    <div class="main-navbar">
      <nav
        class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0 m-0">
        <a
          @click="$router.push('/')"
          class="navbar-brand w-100 mr-0 pointer"
          style="line-height: 25px;">
          <div class="d-table m-auto">
            <img
              :src="require('@/static/icon.png')"
              alt="Paperdaz Dashboard"
              class="d-inline-block align-top mr-1"
              id="main-logo"
              style="max-width: 30px;">
            <span
              class="d-md-inline ml-1"
              v-if="!hideLogoText">Paperdaz Dashboard</span>
          </div>
        </a>
        <a
          @click="handleToggleSidebar()"
          class="toggle-sidebar d-sm-inline d-md-none d-lg-none">
          <i class="material-icons">&#xE5C4;</i>
        </a>
      </nav>
    </div>

    <form
      action="#"
      class="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
      <div class="input-group input-group-seamless ml-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="fas fa-search" />
          </div>
        </div>
        <input
          aria-label="Search"
          class="navbar-search form-control"
          placeholder="Search for something..."
          type="text">
      </div>
    </form>

    <div class="nav-wrapper">
      <d-nav class="flex-column">
        <li
          :class="{ 'active': item.to === $route.name }"
          :key="navItemIdx"
          class="nav-item dropdown"
          v-for="(item, navItemIdx) in items">
          <router-link
            :class="['nav-link', item.items && item.items.length ? 'dropdown-toggle' : '']"
            :to="item.to"
            exact-active-class="active"
            tag="a"
            v-d-toggle="`snc-${navItemIdx}`">
            <div
              class="item-icon-wrapper"
              v-html="item.htmlBefore"
              v-if="item.htmlBefore" />
            <span v-if="item.title">{{ item.title }}</span>
            <div
              class="item-icon-wrapper"
              v-html="item.htmlAfter"
              v-if="item.htmlAfter" />
          </router-link>
          <d-collapse
            :id="`snc-${navItemIdx}`"
            accordion="sidebar-items-accordion"
            class="dropdown-menu dropdown-menu-small"
            v-if="item.items && item.items.length">
            <d-dropdown-item
              :href="subItem.href"
              :key="subItemIdx"
              :to="subItem.to"
              v-for="(subItem, subItemIdx) in item.items">
              {{ subItem.title }}
            </d-dropdown-item>
          </d-collapse>
        </li>
      </d-nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'MainSidebar',
  props: {
    /**
       * Whether to hide the logo text, or not.
       */
    hideLogoText: {
      type: Boolean,
      default: false,
    },
    /**
       * The menu items.
       */
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sidebarVisible: true,
    };
  },
  methods: {
    handleToggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>

<style lang="scss">
  .main-sidebar {
    .nav-link {
      &:hover {
        box-shadow: inset 0.1875rem 0 0 #76c45f !important;
        color: #76c45f !important;

        .material-icons {
          color: #76c45f !important;
        }
      }
    }

    .active {
      box-shadow: inset 0.1875rem 0 0 #76c45f !important;
      background-color: #FBFBFB;
      color: #76c45f !important;

      .material-icons {
        color: #76c45f !important;
      }
    }

    .item-icon-wrapper {
      display: inline-block;
      max-width: 26px;
    }

    .dropdown-menu {
      display: block;
    }
  }
</style>
