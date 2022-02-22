<!--
  Renders an error page.

  Encapsulates retrieval of needed objects from the Contentful API,
  and logic on how to render each field.
-->
<template>
  <div class="container">
    <CmsMenu />

    <div class="page page-error">
      <CmsHero asset-id="45ZVG4G6ZDW2P7B9apB7vi" />
      <PageIntro title="An error occurred" intro-text="The page you are looking for couldn't be found." />
    </div>

    <CmsFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // Load metadata from CMS
  head () {
    return {
      title: 'Error',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'An error occurred'
        },
        {
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ]
    }
  }
})
</script>
