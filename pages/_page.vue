<template>
  <div class="content">
    <img :src="heroUrl" :width="heroWidth" :height="heroHeight" :alt="heroAltText">
    <!-- <h1>{{ $data.page.fields.title }}</h1> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createClient } from '~/plugins/contentful.js'

export default Vue.extend({
  layout: 'page',

  // Load content from CMS
  async asyncData ({ $config, route }) {
    // Parse the "slug" URI of this page
    const slug = route.path.replace('.html', '').replace('/', '')
    console.log('Parsed slug', slug)

    // Retrieve the CMS page which matches this slug
    const client = createClient()
    const page = await client.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      'fields.slug[match]': slug
    })

    // Populate a data object called "page" for us to use in our template
    return {
      page: page.items[0]
    }
  },

  // Load page title from CMS
  head () {
    return {
      title: this.$data.page.fields.title
    }
  },

  computed: {
    heroUrl () {
      return this.$data.page.fields.hero.fields.media.fields.file.url
    },

    heroWidth () {
      return this.$data.page.fields.hero.fields.media.fields.file.details.image.width
    },

    heroHeight () {
      return this.$data.page.fields.hero.fields.media.fields.file.details.image.height
    },

    heroAltText () {
      return this.$data.page.fields.hero.fields.altText
    }
  }
})
</script>
