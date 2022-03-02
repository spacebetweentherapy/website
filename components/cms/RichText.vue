<template>
  <section class="content">
    <div class="content-main">
      <!-- TODO Hard code our home page image -->
      <div v-if="slug === 'index'" class="content__image">
        <CmsImage
          asset-id="4QKYgZ75hpQq30yOokKwVj"
          class-name="page-home__image"
          :width="500"
          :height="400"
          :include2x="true"
          :show-border="true"
        />
      </div>
      <!-- eslint-disable -->
      <div class="content-wrapper" :style="(slug === 'index' ? 'padding:0' : '')" v-html="markup" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    raw: {
      type: Object,
      default: null,
      required: true
    },
    slug: {
      type: String,
      default: '',
      required: false
    }
  },

  computed: {
    markup () {
      return this.$renderRichText(this.raw)
    }
  }
})
</script>

<style lang="scss">
.content-main {
  margin: auto;
  padding: 4em;
  max-width: $max-width;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  column-gap: 2em;
}

.content-wrapper {
  padding: 0 8em;

  h1 {
    margin: 0;
    text-transform: uppercase;
    font-family: $font-serif;
    font-weight: $weight-heavy;
    font-size: $size-section-title;
  }

  hr {
    border: 1px solid $colour-highlight;
    width: 100%;
  }

  blockquote {
    margin: 0 2em;
    border-left: 5px solid #ccc;

    p {
      padding: 1em;
      font-style: italic;
    }
  }

  img {
    @include content-image;
  }

  p:nth-child(1) {
    margin-top: 0;
  }
}

@include medium-screens {
  .content-main {
    flex-wrap: wrap;
    padding: 1em 2em;
  }

  .content__image {
    width: 100%;
    text-align: center;
  }

  .content-wrapper {
    padding: 0;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}

@include small-screens {
  .page-home__image {
    width: 100%;
    height: auto;
  }
}
</style>
