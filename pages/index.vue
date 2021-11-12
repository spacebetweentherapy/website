<template>
  <div class="page">
    <HeroImage
      v-if="heroUrl"
      :hero-image-url="heroUrl"
      :hero-image-width="heroWidth"
      :hero-image-height="heroHeight"
      :hero-image-alt-text="heroAltText"
      :hero-title="heroHeading"
      :hero-text="heroShortText"
    />

    <section class="content">
      <!-- Render the content as HTML -->
      <div class="content-left" v-html="leftContent" />
      <div class="content-right" v-html="rightContent" />
    </section>

    <section class="recent-blog-posts">
      <h1>
        <NuxtLink to="/blog">
          Blog
        </NuxtLink>
        <span v-html="logoSvg" />
      </h1>
      <ol>
        <li>
          <h2>Connecting with nature</h2>
          <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
        </li>
      </ol>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { createClient } from '~/plugins/contentful.js'

export default Vue.extend({
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

  // Load metadata from CMS
  head () {
    return {
      meta: [
        {
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
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node: any) => '<custom-component>' + node + '</custom-component>'
        }
      }
      return documentToHtmlString(this.$data.page.fields.leftContent, options)
    },

    rightContent () {
      return documentToHtmlString(this.$data.page.fields.rightContent)
    },

    logoSvg () {
      return require('~/static/images/logo-venn.svg?raw')
    }
  }
})
</script>

<style lang="scss">
.recent-blog-posts {
  background-color: $contrast-colour-light;
  padding: 1em;

  h1 {
    display: flex;

    a {
      font-family: $font-serif;
      color: $bg-colour;
      text-decoration: underline;
      text-decoration-color: $contrast-colour-dark;
      text-underline-offset: .2em;
      font-family: $font-serif;
      font-weight: normal;
      text-transform: uppercase;
    }
  }

  .logo-circle {
    stroke: #fff;
  }
}
</style>
