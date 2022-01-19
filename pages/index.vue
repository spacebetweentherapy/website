<template>
  <div class="page page-home">
    <CmsPage>
      <section class="recent-blog-posts">
        <BlogPostList :posts="posts">
          <template #prepend>
            <h1>
              <NuxtLink to="/journal">
                Journal
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
  padding-bottom: 5em;

  h1 {
    margin-top: 1.5em;
    margin-bottom: 0;
    flex: 0 0 100%;
    font-size: 2.7em;
    font-weight: $font-weight-heavy;

    a {
      font-family: $font-serif;
      color: $bg-colour-light;
      text-decoration: none;
      text-decoration-color: $contrast-colour-dark;
      text-underline-offset: .2em;
      font-weight: normal;
      text-transform: uppercase;
    }
  }
}

@include medium-screens {
  .recent-blog-posts {
    padding: 1em 2em;
  }

  .recent-blog-post-image {
    width: 100%;
    height: auto;
  }
}
</style>
