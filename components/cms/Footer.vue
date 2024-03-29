<template>
  <footer class="footer">
    <CmsImage v-for="image in images" :key="image.sys.id" :asset-id="image.sys.id" :width="224" :height="96" :include2x="true" class-name="footer__image" />

    <nav class="footer__nav">
      <ul class="footer__list">
        <li v-for="item in items" :key="item.id" class="footer__item">
          <NuxtLink :to="(item.slug === 'index') ? '/' : '/' + item.slug" class="footer__link">
            {{ item.title }}
          </NuxtLink>
        </li>
        <li class="footer__item">
          <a href="#" data-cc="c-settings" class="footer__link">Cookie Preferences</a>
        </li>
      </ul>
    </nav>

    <div class="footer__copyright">
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
        if (menuItemDetails && menuItemDetails[0]) {
          const menuItem = {} as MenuItem
          menuItem.id = id
          menuItem.title = menuItemDetails[0].fields.title
          menuItem.slug = menuItemDetails[0].fields.slug
          this.$data.items.push(menuItem)
        }
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

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  row-gap: 2em;
  color: $colour-text-light;
  font-size: .8em;
}

// .footer__image {
//   flex-basis: 50%;

//   &:last-of-type {
//     align-self: baseline;
//     text-align: right;
//   }
// }

.footer__nav {
  overflow: hidden;
  position: relative;
}

.footer__list {
  display: flex;
  justify-content: space-between;
  margin: 0 0 0 -1px;
  padding: 0;
  list-style: none;
}

.footer__item {
  flex-grow: 1;
  flex-basis: auto;
  margin: 0;
  border-left: 1px solid #ccc;

  &:first-child {
    .footer__link {
      padding-left: 0;
    }
  }
}

.footer__link, .footer__link:visited {
  padding: 1em;
  color: $colour-text-light;
  text-decoration: none;
}

.footer__link.current {
  color: $colour-highlight;
}

// .footer__copyright {
//   align-self: baseline;
// }

@include small-screens {
  .footer {
    flex-direction: column;
    align-items: baseline;
  }

  .footer__image {
    margin: 1em 0;
  }

  .footer__list  {
    display: block;
    margin: 1em 0;
  }

  .footer__item {
    &:first-child {
      .footer__link {
        padding-left: 1em;
      }
    }
  }
}
</style>
