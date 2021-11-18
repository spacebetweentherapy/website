<template>
  <div>
    <section class="intro">
      <HeroBanner
        v-if="heroUrl"
        :hero-image-url="heroUrl"
        :hero-image-width="$data.page.fields.hero.fields.image.fields.file.details.image.width"
        :hero-image-height="$data.page.fields.hero.fields.image.fields.file.details.image.height"
        :hero-image-alt-text="$data.page.fields.hero.fields.altText"
        :hero-title="$data.page.fields.hero.fields.heading"
        :hero-text="$data.page.fields.hero.fields.shortText"
      />
      <h1 v-if="$data.slug !== 'index'">
        {{ $data.page.fields.title }}
      </h1>
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

    <!-- Allow additional markup to be passed in to this component and render it here -->
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      slug: '',
      page: null,
      heroUrl: '',
      heroFallbackUrl: '',
      section1Content: null,
      section2Content: null,
      section3Content: null
    }
  },

  // Load content from CMS
  async fetch () {
    // Parse the "slug" URI of this page
    const slug = this.$route.path.replace('.html', '').replace('/', '') || 'index'
    this.$data.slug = slug

    // Retrieve the CMS page which matches this slug
    const page = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_PAGE,
      limit: 1,
      include: 10,
      'fields.slug[match]': slug
    })

    // Populate a data object called "page" for us to use in our template
    const cmsObject = page.items[0]
    this.$data.page = cmsObject
    this.$data.heroUrl = (cmsObject.fields.hero) ? cmsObject.fields.hero.fields.image.fields.file.url : ''
    this.$data.section1Content = this.$renderRichText(cmsObject.fields.section1Content)
    this.$data.section2Content = this.$renderRichText(cmsObject.fields.section2Content)
    this.$data.section3Content = this.$renderRichText(cmsObject.fields.section3Content)
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
  }
})
</script>
