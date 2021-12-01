<template>
  <footer class="page-footer">
    <ResponsiveImage v-for="image in images" :key="image.sys.id" :asset-id="image.sys.id" />

    <nav class="footer-menu">
      <ul>
        <li v-for="item in items" :key="item.id">
          <NuxtLink :to="(item.slug === 'index') ? '/' : item.slug">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

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
    // Create an array of menu items to show in the footer
    const items: Array<MenuItem> = []

    // Create a list of images to show in the footer
    const images: Array<any> = []

    return {
      items,
      images
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

    // Retrieve footer images from the CMS
    const footerImages = await this.$contentful.getAssets({
      'metadata.tags.sys.id[in]': 'imageFooter'
    })
    if (footerImages.items[0]) {
      footerImages.items.forEach((element: any) => {
        this.$data.images.push(element)
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
  font-size: .8em;

  picture {
    flex-basis: 50%;

    &:last-of-type {
      align-self: baseline;
      text-align: right;
    }
  }

  .footer-menu {
    overflow: hidden;
    position: relative;

    ul {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0 -1px;
      padding: 0;
      list-style: none;

      li {
        flex-grow: 1;
        flex-basis: auto;
        margin: 0;
        padding: 0 .7em;
        border-left: 1px solid #ccc;

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

@include small-screens {
  .page-footer {
    display: block;

    img {
      margin: 1em 0;
    }

    .footer-menu {
      ul {
        display: block;
        margin: 1em 0;
      }
    }
  }
}
</style>
