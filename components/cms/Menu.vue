<template>
  <nav class="menu">
    <h2 class="menu__title">
      Main menu
    </h2>

    <div class="menu__logo">
      <a href="/">
        <img
          srcset="/images/banner-logo-3x.png 3x, /images/banner-logo-2x.png 2x, /images/banner-logo.png 1x"
          src="/images/banner-logo.png"
          width="321"
          height="27"
          alt="Logo"
          class="menu__logo-image"
        >
      </a>
    </div>

    <!-- Hamburger for small screens -->
    <label for="hamburger" class="menu__hamburger">&#9776;</label>
    <input id="hamburger" type="checkbox">

    <ul class="menu__list">
      <li v-for="item in items" :key="item.id" class="menu__item">
        <!-- Make sure the homepage uses index.vue not _page.vue -->
        <NuxtLink :to="(item.slug === 'index') ? '/' : '/' + item.slug" class="menu__link">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

// Define our menu item data object
export interface MenuItem {
  id: string
  title: string
  slug: string
}

export default Vue.extend({
  data () {
    // We will populate an array of menu items from the CMS
    const items: Array<MenuItem> = []
    return {
      items
    }
  },

  async fetch () {
    // Retrieve the menu from the CMS
    const mainMenu = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_MAIN_MENU
    })

    // Populate our page data for rendering
    if (mainMenu.items[0]) {
      const menuItem = mainMenu.items[0].fields as any
      menuItem.links.forEach((element: any) => {
        const id = element.sys.id

        // Locate this ID in the "includes" array
        const menuItemDetails = mainMenu.includes.Entry.filter((entry: any) => {
          return entry.sys.id === id
        })

        // Create a menu item object and add it to page data
        const menuItem = {} as MenuItem
        menuItem.id = id
        menuItem.title = menuItemDetails[0].fields.title
        menuItem.slug = menuItemDetails[0].fields.slug
        this.$data.items.push(menuItem)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  display: block;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgba($color: #000, $alpha: 0.5);
  z-index: 99;
  font-family: $font-serif;
  color: $colour-bg;
  box-sizing: border-box;
  padding-right: 2em;
}

.menu__title {
  display: none;
}

.menu__logo {
  display: none;
}

.menu__hamburger, #hamburger {
  display: none;
}

.menu__list {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  column-gap: .7em;
  padding: 0;
  margin: 0;
  list-style: none;
}

.menu__item {
  font-size: 1.2em;
  text-transform: uppercase;
}

.menu__link, .menu__link:visited {
  display: block;
  padding: .5em;
  color: $colour-bg;
  text-decoration: none;

  &.current {
    text-decoration: underline;
    text-decoration-color: $colour-highlight;
    text-underline-offset: .2em;
  }
}

.menu__link:hover {
  color: $colour-highlight;
  text-decoration: underline;
  text-decoration-color: $colour-bg-lightest;
  text-underline-offset: .2em;
}

@include small-screens {
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0;
    height: 49px;
  }

  .menu__logo {
    display: block;
    margin: 0;
    padding: 0;
    border: 0;
    height: 27px;

    a {
      margin: 0;
      padding: 0;
      border: 0;
    }
  }

  .menu__logo-image {
    margin: 0;
    padding: 0 0 0 .25em;
    border: 0;
  }

  .menu__list {
    display: none;
    position: absolute;
    top: 49px;
    right: 0;
  }

  .menu__hamburger {
    display: inline-block;
    background: $colour-highlight;
    font-size: 1.2em;
    padding: 10px;
  }

  #hamburger:checked ~ .menu__list {
    display: block;

    a {
      background-color: rgba(175, 132, 77, 0.8);
    }
  }

  .menu__link:hover {
    color: $colour-bg-lightest;
  }
}
</style>
