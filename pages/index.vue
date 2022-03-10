<template>
  <div>
    <!--  -->
    <div />
    <section class="homepage-menu">
      <div class="links">
        <ul class="links__list">
          <li v-for="link in links" :key="link.sys.id" class="links__item">
            <NuxtLink :to="link.fields.slug" class="links__link">
              <CmsImage :asset-id="link.fields.thumbnail.sys.id" :width="200" :height="200" :include2x="true" />
              <h2 class="links__title">
                {{ link.fields.title }}
              </h2>
              <p class="links__text">
                {{ link.fields.thumbnailText }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="contact">
      <div class="content-main">
        <div class="content-wrapper">
          <p class="contact__text">
            If you would like to arrange a free consultation, check my availability or ask a question, please feel free to get in touch.
          </p>
          <p class="button-container">
            <a class="button" href="/contact">Contact</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'CmsPage',

  data () {
    return {
      links: []
    }
  },

  async fetch () {
    // Retrieve home page menu
    const entries = await this.$contentful.getEntries({
      content_type: this.$config.CTF_CONTENT_TYPE_HOME_MENU
    })
    this.$data.links = entries.items[0].fields.links
  }
})
</script>

<style lang="scss" scoped>
.homepage-menu {
  padding: 5em 0;
}

.links {
  margin: auto;
  max-width: $max-width;
}

.links__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  column-gap: 2em;
}

.links__item {
  flex-basis: 30%;
  text-align: center;
}

.links__link {
  text-decoration: none;
}

.links__title {
  margin: 0;
  color: $colour-bg-lightest;
  text-transform: uppercase;
  font-family: $font-serif;
  font-weight: $weight-heavy;
  font-size: $size-section-title;
}

.links__text {
  margin: 0;
  padding: 0 2em;
  color: $colour-text;
}

.contact__text {
  padding: 0 7em;
  text-align: center;
}

@include small-screens {
  .homepage-menu {
    padding: 2em 0;
  }

  .links__list {
    flex-wrap: wrap;
    row-gap: 2em;
  }

  .links__item {
    flex-basis: 100%;
  }

  .contact__text {
    padding: 0;
  }
}
</style>
