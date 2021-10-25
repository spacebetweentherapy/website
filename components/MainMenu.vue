<template>
  <nav class="main-menu">
    <h2>Main menu</h2>
    <ul>
      <li>Test</li>
      <li>
        <NuxtLink to="/sitemap">
          Sitemap
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  fetch () {
    console.log('loaded main menu')
  }
})
</script>
