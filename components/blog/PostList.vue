<template>
  <div class="posts">
    <slot name="prepend" />
    <ol class="posts__list">
      <BlogPostItem
        v-for="post in posts"
        :key="post.sys.id"
        :slug="'/journal/' + post.fields.slug"
        :title="post.fields.title"
        :intro="post.fields.intro"
        :asset-id="getAssetId(post)"
      />
    </ol>
    <slot name="append" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  methods: {
    getAssetId (post: any): string {
      return (post.fields.image) ? post.fields.image.sys.id : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.posts {
  margin: auto;
  max-width: $max-width;
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
}

.posts__list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}

@include medium-screens {
 .posts {
    flex-wrap: wrap;
  }
}
</style>
