<template>
  <div class="page page-home">
    <PageContent>
      <section class="recent-blog-posts">
        <div class="posts-container">
          <h1>
            <NuxtLink to="/blog">
              Blog
              <!-- <span v-html="logoSvg" /> -->
            </NuxtLink>
          </h1>
          <ol class="posts">
            <li v-for="post in posts" :key="post.sys.id">
              <NuxtLink :to="'/blog/' + post.fields.slug">
                <h2>{{ post.fields.title }}</h2>
                <p>{{ post.fields.intro }}</p>
              </NuxtLink>
            </li>
          </ol>
          <ResponsiveImage :asset-id="blogImageId" />
        </div>
      </section>
    </PageContent>
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
  .posts-container {
    margin: auto;
    max-width: $max-width;
    display: flex;
    flex-wrap: wrap;
    column-gap: 2em;

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

    ol {
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;

      li {
        padding: 1em 0;
        border-bottom: 1px dashed $bg-colour-light;

        &:nth-child(1) {
          padding-top: 0;
        }

        &:nth-child(3) {
          border-bottom: 0;
        }

        a, a:visited {
          text-decoration: none;
          color: $fg-colour;
        }

        h2 {
          font-family: $font-sans;
          text-transform: none;
          color: $fg-colour;
        }
      }
    }
  }
}

@include small-screens {
  .recent-blog-posts {
    padding: 1em 2em;

    .posts-container {
      flex-wrap: wrap;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
