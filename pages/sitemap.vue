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
      <h1>{{ $data.page.fields.title }}</h1>
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

    <section>
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

export default Vue.extend({
  // Load content from CMS
  async asyncData ({ $config, route, $contentful, $renderRichText }) {
    // Parse the "slug" URI of this page
    const slug = route.path.replace('.html', '').replace('/', '')

    // Retrieve the CMS page which matches this slug
    const page = await $contentful.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      limit: 1,
      include: 10,
      'fields.slug[match]': slug
    })

    // Retrieve all pages to build the sitemap
    const pages = await $contentful.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      order: 'fields.title'
    })

    // Populate a data object called "page" for us to use in our template
    return {
      page: page.items[0],
      section1Content: $renderRichText(page.items[0].fields.section1Content),
      section2Content: $renderRichText(page.items[0].fields.section2Content),
      section3Content: $renderRichText(page.items[0].fields.section3Content),
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
      return (this.$data.page.fields.hero) ? this.$data.page.fields.hero.fields.webPImage.fields.file.url : ''
    },

    heroFallbackUrl () {
      return (this.$data.page.fields.hero) ? this.$data.page.fields.hero.fields.jpegImage.fields.file.url : ''
    }
  }
})
</script>
