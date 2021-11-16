<template>
  <div class="page" :class="{ 'no-hero' : !heroUrl } ">
    <section class="intro">
      <HeroImage
        v-if="heroUrl"
        :hero-image-url="heroUrl"
        :hero-image-width="$data.page.fields.hero.fields.jpegImage.fields.file.details.image.width"
        :hero-image-height="$data.page.fields.hero.fields.jpegImage.fields.file.details.image.height"
        :hero-image-alt-text="$data.page.fields.hero.fields.altText"
        :hero-title="$data.page.fields.hero.fields.heading"
        :hero-text="$data.page.fields.hero.fields.shortText"
      />
      <div v-if="$data.page.fields.intro" class="content-intro" v-html="$md.render($data.page.fields.intro)" />
    </section>

    <section v-if="section1Content" class="content">
      <div v-if="$data.page.fields.section1Image">
        <img :src="$data.page.fields.section1Image.fields.file.url">
      </div>
      <div v-html="section1Content" />
    </section>

    <section v-if="section2Content" class="content">
      <div v-html="section2Content" />
      <div v-if="$data.page.fields.section2Image">
        <img :src="$data.page.fields.section2Image.fields.file.url">
      </div>
    </section>

    <section v-if="section3Content" class="content">
      <div v-if="$data.page.fields.section3Image">
        <img :src="$data.page.fields.section3Image.fields.file.url">
      </div>
      <div v-html="section3Content" />
    </section>

    <section class="recent-blog-posts">
      <h1>
        <NuxtLink to="/blog">
          Blog
          <!-- <span v-html="logoSvg" /> -->
        </NuxtLink>
      </h1>
      <div class="posts-container">
        <ol class="posts">
          <li>
            <h2>Connecting with nature</h2>
            <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
          </li>
          <li>
            <h2>How to find a therapist</h2>
            <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
          </li>
          <li>
            <h2>Space Between - why the name</h2>
            <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
          </li>
        </ol>
        <img src="//images.ctfassets.net/eia1ph7h56y6/4QKYgZ75hpQq30yOokKwVj/22bc3ce7275e22feecedcd0d08add050/tor-rocks.jpg">
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // Load content from CMS
  async asyncData ({ $config, $contentful, $renderRichText }) {
    // Retrieve the CMS page which matches this slug
    const page = await $contentful.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      limit: 1,
      include: 10,
      'fields.slug[match]': 'index'
    })

    // Populate a data object called "page" for us to use in our template
    return {
      page: page.items[0],
      section1Content: $renderRichText(page.items[0].fields.section1Content),
      section2Content: $renderRichText(page.items[0].fields.section2Content),
      section3Content: $renderRichText(page.items[0].fields.section3Content)
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

    logoSvg () {
      return require('~/static/images/logo-venn.svg?raw')
    }
  }
})
</script>

<style lang="scss">
.content-intro {
  padding: 2em 6em !important;
}

.recent-blog-posts {
  padding: 1em 4em;

  h1 {
    display: flex;

    a {
      font-family: $font-serif;
      color: $bg-colour-light;
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

  .posts-container {
    display: flex;
    column-gap: 2em;

    ol {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 1em 0;
        border-bottom: 1px dashed $bg-colour-light;

        &:nth-child(1) {
          padding-top: 0;
        }

        &:nth-child(3) {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
