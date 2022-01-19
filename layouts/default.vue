<template>
  <div class="container">
    <CmsMenu />
    <Nuxt />
    <CmsFooter />
  </div>
</template>

<!-- <script>
import Vue from 'vue'

export default Vue.extend({
  mounted () {
    console.log('mounted')
    const container = document.querySelector('.container')
    container.addEventListener('scroll', this.handleScroll(e))

    cookieconsent.run(
      {
        notice_banner_type: 'headline',
        consent_type: 'express',
        palette: 'light',
        language: 'en',
        page_load_consent_levels: ['strictly-necessary'],
        notice_banner_reject_button_hide: false,
        preferences_center_close_button_hide: false,
        page_refresh_confirmation_buttons: false,
        website_name: process.env.SITE_TITLE
      }
    )
  },

  beforeDestroy () {
    const container = document.querySelector('.container')
    container.removeEventListener('scroll', this.handleScroll(e))
  },

  methods: {
    handleScroll (e) {
      console.log(e)
    }
  }
})
</script> -->
