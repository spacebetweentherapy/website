<template>
  <div class="container-page">
    <PageIntro :title="title" :intro-text="$data.page.fields.intro">
      <template #hero>
        <CmsHero
          v-if="$data.page.fields.hero"
          :asset-id="$data.page.fields.hero.fields.image.sys.id"
          :title="$data.page.fields.hero.fields.heading"
          :sub-text="$data.page.fields.hero.fields.shortText"
        />
      </template>
      <template #introImage>
        <CmsImage
          v-if="$data.page.fields.introImage"
          :asset-id="$data.page.fields.introImage.sys.id"
        />
      </template>
    </PageIntro>

    <section v-if="section1Content" class="content">
      <div class="content-main">
        <!-- TODO Hard code our home page image -->
        <div v-if="$data.slug === 'index'">
          <CmsImage asset-id="4QKYgZ75hpQq30yOokKwVj" class-name="page-home__image" />
        </div>
        <!-- eslint-disable -->
        <div class="content-wrapper" :style="($data.slug === 'index' ? 'padding:0' : '')" v-html="section1Content" />
      </div>
    </section>

    <section v-if="section2Content" class="content">
      <div class="content-main">
        <!-- eslint-disable -->
        <div class="content-wrapper" v-html="section2Content" />
      </div>
    </section>

    <section v-if="section3Content" class="content">
      <div class="content-main">
        <!-- eslint-disable -->
        <div class="content-wrapper" v-html="section3Content" />
      </div>
    </section>

    <!-- Allow additional markup to be passed to this component -->
    <slot />

    <CmsQuote v-if="$data.page.fields.quote" :quote-id="$data.page.fields.quote.sys.id" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      slug: '',
      page: null,
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
  },

  computed: {
    title () {
      const slug = this.$data.slug
      const pageTitle = this.$data.page.fields.title
      return (slug !== 'index') ? pageTitle : ''
    }
  }
})
</script>

<style lang="scss">
.content-main {
  margin: auto;
  padding: 4em;
  max-width: $max-width;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  column-gap: 2em;

  h1 {
    margin: 0;
    text-transform: uppercase;
    font-family: $font-serif;
    font-weight: $weight-heavy;
    font-size: $size-section-title;
  }

  hr {
    border: 1px solid $colour-highlight;
    width: 100%;
  }

  blockquote {
    margin: 0 2em;
    border-left: 5px solid #ccc;

    p {
      padding: 1em;
      font-style: italic;
    }
  }

  img {
    @include content-image;
  }
}

.content-wrapper {
  padding: 0 8em;

  p:nth-child(1) {
    margin-top: 0;
  }
}

@include medium-screens {
  .content-main {
    flex-wrap: wrap;
    padding: 1em 2em;
  }

  .content-wrapper {
    padding: 0;
  }
}

@include small-screens {
  .content-main {
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
