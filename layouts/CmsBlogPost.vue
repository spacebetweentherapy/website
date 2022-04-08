<!--
  Renders a Contentful "Blog Post" content type.

  Encapsulates retrieval of Blog Post objects from the Contentful API,
  and logic on how to render each field.
-->
<template>
  <div class="container">
    <CmsMenu />

    <div class="page">
      <CmsHero
        v-if="$data.page.fields.hero"
        :asset-id="$data.page.fields.hero.fields.image.sys.id"
        :title="$data.page.fields.hero.fields.heading"
        :sub-text="$data.page.fields.hero.fields.shortText"
      />

      <!-- Don't display intro text on the blog post page -->
      <PageIntro />

      <section class="post">
        <div class="post-content">
          <!-- eslint-disable -->
          <div v-html="content" class="content-wrapper" />
          <CmsImage
            :asset-id="$data.page.fields.image.sys.id"
            className="post-content__image"
            :show-border="true"
            :focus="true"
          />
          <BlogAudioPlayer v-if="$data.page.fields.audioId" :show-id="showId" :episode-id="$data.page.fields.audioId" />
        </div>
      </section>

      <section class="recent-blog-posts">
        <BlogPostList :posts="$data.posts">
          <template #prepend>
            <h1>
              <NuxtLink to="/journal">
                Other Posts
              </NuxtLink>
            </h1>
          </template>
        </BlogPostList>
      </section>

      <Nuxt />
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
      page: null,
      content: '',
      posts: []
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
      'fields.slug[match]': slug
    })

    // Populate a data object called "page" for us to use in our template
    const cmsObject = page.items[0]
    this.$data.page = cmsObject
    this.$data.content = this.$renderRichText(cmsObject.fields.content)

    // Retrieve recent blog posts (excluding this one)
    const posts = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_BLOG_POST,
      'sys.id[ne]': cmsObject.sys.id,
      order: '-fields.date',
      include: 10
    })

    // Populate a data object for us to use in our template
    this.$data.posts = posts.items
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
    showId () {
      return this.$config.ACAST_SHOW_ID
    }
  }
})
</script>

<style lang="scss" scoped>
.post-content {
  margin: auto;
  padding: 4em;
  max-width: $max-width;
}

.post-content__image {
  display: block;
  margin: auto;
  width: 744px;
  height: 495px;
}

.recent-blog-posts {
  padding-bottom: 5em;

  h1 {
    margin-top: 1.2em;
    margin-bottom: 0;
    flex: 0 0 100%;
    font-size: 3em;
    font-weight: $weight-heavy;

    a {
      font-family: $font-serif;
      color: $colour-bg-lightest;
      text-decoration: none;
      text-decoration-color: $colour-highlight;
      text-underline-offset: .2em;
      font-weight: normal;
      text-transform: uppercase;
    }
  }
}

@include medium-screens {
  .post-content {
    padding: 1em 2em;
  }

  .recent-blog-posts {
    padding: 1em 2em;
  }

  .recent-blog-post-image {
    width: 100%;
    height: auto;
  }
}
</style>
