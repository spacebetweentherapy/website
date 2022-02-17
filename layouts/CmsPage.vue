<!--
  Renders a Contentful "Page" content type.

  Encapsulates retrieval of Page objects from the Contentful API,
  and logic on how to render each field.
-->
<template>
  <div class="container">
    <CmsMenu />

    <div :class="pageClasses">
      <CmsHero
        v-if="$data.page.fields.hero"
        :asset-id="$data.page.fields.hero.fields.image.sys.id"
        :title="$data.page.fields.hero.fields.heading"
        :sub-text="$data.page.fields.hero.fields.shortText"
      />

      <PageIntro :title="title" :intro-text="$data.page.fields.intro">
        <template #introImage>
          <!-- Force the intro image to 200x200 assuming the Media asset in CMS is 400x400 -->
          <CmsImage
            v-if="$data.page.fields.introImage"
            :asset-id="$data.page.fields.introImage.sys.id"
            :width="200"
            :height="200"
            :include2x="true"
          />
        </template>
      </PageIntro>

      <CmsRichText v-if="$data.page.fields.section1Content" :raw="$data.page.fields.section1Content" :slug="$data.slug" />
      <CmsRichText v-if="$data.page.fields.section2Content" :raw="$data.page.fields.section2Content" :slug="$data.slug" />
      <CmsRichText v-if="$data.page.fields.section3Content" :raw="$data.page.fields.section3Content" :slug="$data.slug" />

      <Nuxt />

      <CmsQuote v-if="$data.page.fields.quote" :quote-id="$data.page.fields.quote.sys.id" />
    </div>

    <CmsFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      slug: '',
      page: null
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
    title () {
      const slug = this.$data.slug
      const pageTitle = this.$data.page.fields.title
      return (slug !== 'index') ? pageTitle : ''
    },

    pageClasses () {
      let classes = 'page'
      if (this.$data.slug === 'index') {
        classes += ' page-home'
      }
      return classes
    },

    isHomepage () {
      return this.$data.slug === 'index'
    }
  }
})
</script>
