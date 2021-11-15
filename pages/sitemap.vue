<template>
  <div class="page">
    <h1>{{ $data.page.fields.title }}</h1>

    <section class="content">
      <!-- Render the content as HTML -->
      <div class="content-left" v-html="leftContent" />
      <div class="content-right" v-html="rightContent" />
    </section>

    <section>
      <h1>Sitemap goes here</h1>
      <ul>
        <li v-for="item in $data.sitemap" :key="item.sys.id">
          <!-- Make sure the homepage uses index.vue not _page.vue -->
          <NuxtLink :to="(item.fields.slug === 'index') ? '/' : item.fields.slug">
            {{ item.fields.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { createClient } from '~/plugins/contentful.js'

export default Vue.extend({
  // Load content from CMS
  async asyncData ({ $config, route }) {
    // Parse the "slug" URI of this page
    const slug = route.path.replace('.html', '').replace('/', '')
    console.log('Parsed slug', slug)

    // Retrieve the CMS page which matches this slug
    const client = createClient()
    const page = await client.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      limit: 1,
      include: 10,
      'fields.slug[match]': slug
    })

    // Retrieve all pages to build the sitemap
    const pages = await client.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      order: 'fields.title'
    })

    // Populate a data object called "page" for us to use in our template
    return {
      page: page.items[0],
      sitemap: pages.items
    }
  },

  // Load metadata from CMS
  head () {
    return {
      title: this.$data.page.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$data.page.fields.metaDescription
        },
        {
          name: 'robots',
          content: ((this.$data.page.fields.noIndex) ? 'noindex' : 'index') + ', ' + ((this.$data.page.fields.noFollow) ? 'nofollow' : 'follow')
        }
      ]
    }
  },

  computed: {
    heroUrl () {
      return (this.$data.page.fields.hero) ? this.$data.page.fields.hero.fields.jpegImage.fields.file.url : ''
    },

    heroWidth () {
      return this.$data.page.fields.hero.fields.jpegImage.fields.file.details.image.width
    },

    heroHeight () {
      return this.$data.page.fields.hero.fields.jpegImage.fields.file.details.image.height
    },

    heroAltText () {
      return this.$data.page.fields.hero.fields.altText
    },

    heroHeading () {
      return this.$data.page.fields.hero.fields.heading
    },

    heroShortText () {
      return this.$data.page.fields.hero.fields.shortText
    },

    leftContent () {
      return documentToHtmlString(this.$data.page.fields.leftContent)
    },

    rightContent () {
      return documentToHtmlString(this.$data.page.fields.rightContent)
    }
  }
})
</script>
