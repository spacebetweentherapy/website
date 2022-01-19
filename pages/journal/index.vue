<template>
  <div class="page">
    <CmsPage>
      <!-- A featured post (i.e. the most recent) -->
      <section class="higlighted-post">
        <div class="content-main">
          <CmsImage :asset-id="mainPost.fields.image.sys.id" />
          <h2>{{ mainPost.fields.title }}</h2>
          <p>{{ mainPost.fields.intro }}</p>
          <p class="button-container">
            <NuxtLink :to="'/journal/' + mainPost.fields.slug" class="button">
              read
            </NuxtLink>
          </p>
        </div>
      </section>

      <!-- A list of other recent posts -->
      <section class="recent-blog-posts">
        <div class="content-main">
          <BlogPostList :posts="otherPosts">
            <template #prepend>
              <div class="other-posts">
                <h2>
                  Other Posts
                </h2>
              </div>
            </template>
          </BlogPostList>
        </div>
      </section>
    </CmsPage>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      posts: []
    }
  },

  // Load content from CMS
  async fetch () {
    // Parse the "slug" URI of this page
    const slug = this.$route.path.replace('.html', '').replace('/', '') || 'index'
    this.$data.slug = slug

    // Retrieve recent blog posts
    const posts = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_BLOG_POST,
      order: '-fields.date',
      include: 10
    })

    // Populate a data object for us to use in our template
    this.$data.posts = posts.items
  },

  computed: {
    mainPost () {
      return this.$data.posts[0]
    },

    otherPosts () {
      return this.$data.posts.slice(1)
    }
  }
})
</script>

<style lang="scss">
.higlighted-post {
  .content-main {
    display: block;

    img {
      display: block;
      margin: auto;
    }

    h2 {
      display: table;
      margin: auto;
      padding: 1em 0;
      text-transform: none !important;
    }
  }
}

.recent-blog-posts {
  .other-posts {
    flex: 0 0 100%;

    h2 {
      display: table;
      margin: auto;
      padding: 1em 0;
      text-transform: none !important;
    }
  }
}
</style>