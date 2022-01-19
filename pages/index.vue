<template>
  <div class="page page-home">
    <CmsPage>
      <section class="recent-blog-posts">
        <BlogPostList :posts="posts">
          <template #prepend>
            <h1>
              <NuxtLink to="/journal">
                Blog
              </NuxtLink>
            </h1>
          </template>
          <template #append>
            <CmsImage :asset-id="blogImageId" class-name="recent-blog-post-image" />
          </template>
        </BlogPostList>
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

  async fetch () {
    // Retrieve recent blog posts
    const posts = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_BLOG_POST,
      order: '-fields.date',
      include: 3
    })
    this.$data.posts = posts.items
  },

  computed: {
    blogImageId () {
      let imageId = ''
      for (let i = 0; i < this.$data.posts.length; i++) {
        if (this.$data.posts[i].fields.image) {
          imageId = this.$data.posts[i].fields.image.sys.id
          break
        }
      }
      return imageId
    }
  }
})
</script>

<style lang="scss">
.recent-blog-posts {
  h1 {
    flex: 0 0 100%;

    a {
      font-family: $font-serif;
      color: $bg-colour-light;
      text-decoration: underline;
      text-decoration-color: $contrast-colour-dark;
      text-underline-offset: .2em;
      font-weight: normal;
      text-transform: uppercase;
    }
  }
}

@include small-screens {
  .recent-blog-posts {
    padding: 1em 2em;
  }

  .recent-blog-post-image {
    width: 100%;
    height: auto;
  }
}
</style>
