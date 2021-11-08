<template>
  <nav class="main-menu">
    <h2>Main menu</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <NuxtLink :to="item.slug">
          {{ item.title }}
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="about">
          About
        </NuxtLink>
      </li>
      <li>Therapy</li>
      <li>Blog</li>
      <li>Contact</li> -->
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { createClient } from '~/plugins/contentful.js'

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

<style lang="scss" scoped>
nav {
  position: absolute;
  background-color: $menu-bar-colour;

  h2 {
    display: none;
  }

  ul {
    display: flex;
    justify-content: flex-end;
    column-gap: $grid-gutter-large;
    width: 100vw;
    height: $header-height;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      font-size: 1.5em;
      text-transform: uppercase;

      a {
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
