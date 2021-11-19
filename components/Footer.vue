<template>
  <footer class="page-footer">
    <nav class="footer-menu">
      <ul>
        <li v-for="item in items" :key="item.id">
          <NuxtLink :to="(item.slug === 'index') ? '/' : item.slug">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <img src="/images/bcap-logo.svg" width="245" height="56" alt="British Association for Counselling and Psychotherapy logo">
    <picture>
      <source srcset="/images/accredited-registers-quality-mark.webp" type="image/webp">
      <source srcset="/images/accredited-registers-quality-mark.jpg" type="image/jpeg">
      <img src="/images/accredited-registers-quality-mark.jpg" width="200" height="96" alt="Professional Standards Authority logo">
    </picture>
    <div class="copyright">
      &copy; {{ $config.SITE_TITLE }} {{ new Date().getFullYear() }}
    </div>
  </footer>
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
      content_type: this.$config.CTF_CONTENT_TYPE_FOOTER_MENU
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
.page-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  row-gap: 2em;
  color: $fg-colour-light;

  .footer-menu {
    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 1em;

        a {
          color: $fg-colour-light;
          text-decoration: none;
        }
      }
    }
  }

  .copyright {
    align-self: baseline;
  }
}
</style>
