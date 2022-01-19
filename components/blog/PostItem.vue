<template>
  <li class="post-item">
    <NuxtLink :to="slug" class="post-item__link">
      <h2 class="post-item__title">
        {{ title }}
      </h2>
      <p class="post-item__text">
        {{ intro }}
      </p>
    </NuxtLink>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    intro: {
      type: String,
      default: '',
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.post-item {
  padding: 1em 0;
  border-bottom: 5px dotted $bg-colour-light;
}

.post-item__link, .post-item__link:visited {
  text-decoration: none;
  color: $fg-colour;
}

.post-item__title {
  font-family: $font-sans !important;
  text-transform: none !important;
  color: $fg-colour !important;
  text-align: left;
  font-size: 1.2em;
}

p.post-item__text {
  color: $fg-colour;
}
</style>

<!-- This can't be scoped as it styles the whole list via nth child? -->
<style lang="scss">
.post-item {
  &:nth-child(1) {
    padding-top: 0;
  }
}
</style>
