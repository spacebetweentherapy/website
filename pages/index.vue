<template>
  <div class="content">
    <img v-if="heroUrl" :src="heroUrl" :width="heroWidth" :height="heroHeight" :alt="heroAltText">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createClient } from '~/plugins/contentful.js'

export default Vue.extend({
  layout: 'home',

  // Load content from CMS
  async asyncData ({ $config }) {
    // Retrieve the CMS page which matches this slug
    const client = createClient()
    const page = await client.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      'fields.slug[match]': 'index'
    })

    // Populate a data object called "page" for us to use in our template
    return {
      page: page.items[0]
    }
  },

  computed: {
    heroUrl () {
      return (this.$data.page.fields.hero) ? this.$data.page.fields.hero.fields.media.fields.file.url : ''
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
