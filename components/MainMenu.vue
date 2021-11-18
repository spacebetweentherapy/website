<template>
  <nav class="main-menu">
    <h2>Main menu</h2>

    <!-- Hamburger for small screens -->
    <label for="hamburger">&#9776;</label>
    <input id="hamburger" type="checkbox">

    <ul class="menu-items">
      <li v-for="item in items" :key="item.id">
        <!-- Make sure the homepage uses index.vue not _page.vue -->
        <NuxtLink :to="(item.slug === 'index') ? '/' : item.slug">
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

<style lang="scss">
.main-menu {
  display: block;
  position: sticky;
  top: 0;
  width: 100vw;
  background-color: $menu-bar-colour;
  z-index: 99;
  font-family: $font-serif;
  color: $bg-colour;

  label, #hamburger {
    display: none;
  }

  h2 {
    display: none;
  }

  ul {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    column-gap: .7em;
    padding: 0 2em 0 0;
    margin: 0;
    list-style: none;

    li {
      font-size: 1.3em;
      text-transform: uppercase;

      a {
        display: block;
        padding: .5em;
        color: $bg-colour;
        text-decoration: none;

        &.current {
          text-decoration: underline;
          text-decoration-color: $contrast-colour-dark;
          text-underline-offset: .2em;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .main-menu {
    .menu-items {
      display: none;
    }

    label {
      display: inline-block;
      background: $contrast-colour-dark;
      font-size: 1.2em;
      padding: 10px;
    }

    input:checked ~ .menu-items {
      display: block;

      a {
        background-color: rgba(175, 132, 77, 0.8);
      }
    }
  }
}
</style>
