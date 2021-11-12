<template>
  <div class="hero">
    <div class="hero-overlay">
      <h1 v-html="heroTitleHtml" />
      <p>{{ heroText }}</p>
    </div>
    <img
      :src="heroImageUrl"
      :alt="heroImageAltText"
      class="hero-image"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    heroImageUrl: {
      type: String,
      default: ''
    },
    heroImageWidth: {
      type: Number,
      default: 0
    },
    heroImageHeight: {
      type: Number,
      default: 0
    },
    heroImageAltText: {
      type: String,
      default: ''
    },
    heroTitle: {
      type: String,
      default: ''
    },
    heroText: {
      type: String,
      default: ''
    }
  },

  computed: {
    // Highlight the first word of the hero title
    heroTitleHtml () {
      const titleText = this.heroTitle
      const titleArray = titleText.split(' ', 2)
      return '<span class="first-word">' + titleArray[0] + '</span>' + titleArray[1]
    }
  }
})
</script>

<style lang="scss">
.hero {
  position: relative;
  width: 100%;
  max-width: $max-width;
  height: 50%;

  .hero-overlay {
    position: absolute;
    text-align: center;
    width: 100%;

    h1 {
      margin-bottom: 0;
      font-size: 5vw;
      transform: translateY(10vw);
      letter-spacing: 0.45rem;
      font-weight: 700;
      @include logo-typography;

      .first-word {
        color: $bg-colour;
      }
    }

    p {
      margin: 0;
      font-size: 2.5vw;
      transform: translateY(10vw);
      letter-spacing: 0.45rem;
      font-weight: 700;
    }
  }

  .hero-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .hero {
    .hero-overlay {
      h1 {
        font-size: 4em;
      }

      p {
        font-size: 1.6em;
      }
    }
  }
}
</style>
