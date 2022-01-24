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
  }
})
</script>

<style lang="scss">
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

.recent-blog-post-image img {
  @include content-image;
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
