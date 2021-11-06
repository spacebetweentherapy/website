<template>
  <h1>Sitemap</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'page',

  // TODO Load title from CMS
   head () {
    return {
      title: 'Sitemap'
    }
  }
})
</script>
