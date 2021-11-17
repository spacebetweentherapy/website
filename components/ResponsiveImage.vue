<template>
  <picture :class="className">
    <source :srcset="url + '?fm=webp'" type="image/webp">
    <source :srcset="url + '?fm=jpg'" type="image/jpeg">
    <img :src="url" :alt="alt" :class="className">
  </picture>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    className: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  }
})
</script>
