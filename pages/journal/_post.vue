<template>
  <div class="page">
    <div class="container-page">
      <PageIntro :title="$data.page.fields.title" :intro-text="$data.page.fields.intro">
        <template #hero>
          <CmsHero
            v-if="$data.page.fields.hero"
            :asset-id="$data.page.fields.hero.fields.image.sys.id"
            :title="$data.page.fields.hero.fields.heading"
            :sub-text="$data.page.fields.hero.fields.shortText"
          />
        </template>
      </PageIntro>

      <section class="content">
        <div class="content-main">
          <!-- eslint-disable -->
          <div v-html="content" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      slug: '',
      page: null,
      content: ''
    }
  },

  // Load content from CMS
  async fetch () {
    // Parse the "slug" URI of this page
    const slug = this.$route.path.replace('.html', '').replace('/', '').replace('journal/', '') || 'index'
    this.$data.slug = slug

    // Retrieve the CMS page which matches this slug
    const page = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_BLOG_POST,
      limit: 1,
      include: 10,
      'fields.slug[match]': slug
    })

    // Populate a data object called "page" for us to use in our template
    const cmsObject = page.items[0]
    this.$data.page = cmsObject
    this.$data.content = this.$renderRichText(cmsObject.fields.content)
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
