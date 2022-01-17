<template>
  <div class="posts-container">
    <slot name="prepend" />
    <ol class="posts">
      <li v-for="post in posts" :key="post.sys.id">
        <NuxtLink :to="'/journal/' + post.fields.slug">
          <h2>{{ post.fields.title }}</h2>
          <p>{{ post.fields.intro }}</p>
        </NuxtLink>
      </li>
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
  }
})
</script>

<style lang="scss">
.posts-container {
  margin: auto;
  max-width: $max-width;
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;

  .posts {
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

      &:nth-last-child(1) {
        border-bottom: 0;
      }

      a, a:visited {
        text-decoration: none;
        color: $fg-colour;

        h2 {
          font-family: $font-sans !important;
          text-transform: none !important;
          color: $fg-colour !important;
        }

        p {
          color: $fg-colour;
        }
      }
    }
  }
}

@include small-screens {
 .posts-container {
    flex-wrap: wrap;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
