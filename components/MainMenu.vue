<template>
  <nav class="main-menu">
    <h2>Main menu</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <NuxtLink :to="(item.slug === 'index') ? '/' : item.slug">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { createClient } from '~/plugins/contentful.js'

// Define our menu item data object
export interface MenuItem {
  id: string
  title: string
  slug: string
}

export default Vue.extend({
  data () {
    const items: Array<MenuItem> = []
    return {
      items
    }
  },

  async fetch () {
    // Retrieve the main menu from the CMS
    const client = createClient()
    const mainMenu = await client.getEntries({
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
nav {
  position: absolute;
  top: 0;
  width: 100vw;
  max-width: $max-width;
  background-color: $menu-bar-colour;
  line-height: 4em;

  h2 {
    display: none;
  }

  ul {
    display: flex;
    justify-content: flex-end;
    column-gap: $grid-gutter-large;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      font-size: 1.4em;
      text-transform: uppercase;

      a {
        padding: .5em;
        font-family: $font-serif;
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
</style>
