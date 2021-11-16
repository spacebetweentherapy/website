<template>
  <div class="page">
    <PageContent />

    <section class="sitemap">
      <ul>
        <li v-for="item in $data.sitemap" :key="item.sys.id">
          <!-- Make sure the homepage uses index.vue not _page.vue -->
          <NuxtLink :to="(item.fields.slug === 'index') ? '/' : item.fields.slug">
            {{ item.fields.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // Load content from CMS
  async asyncData ({ $config, $contentful }) {
    // Retrieve all pages to build the sitemap
    const pages = await $contentful.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_PAGE,
      order: 'fields.title'
    })

    // Populate a data object for us to use in our template
    return {
      sitemap: pages.items
    }
  }
})
</script>
