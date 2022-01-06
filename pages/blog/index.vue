<template>
  <div class="page">
    <PageContent>
      <section class="recent-blog-posts">
        <div class="posts-container">
          <ol>
            <li v-for="post in posts" :key="post.sys.id">
              <h2><NuxtLink :to="'/blog/' + post.fields.slug">{{ post.fields.title }}</NuxtLink></h2>
              <p>{{ post.fields.intro }}</p>
            </li>
          </ol>
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

  // Load content from CMS
  async fetch () {
    // Parse the "slug" URI of this page
    const slug = this.$route.path.replace('.html', '').replace('/', '') || 'index'
    this.$data.slug = slug

    // Retrieve recent blog posts
    const posts = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_BLOG_POST,
      include: 10
    })

    // Populate a data object for us to use in our template
    this.$data.posts = posts.items
  }
})
</script>
