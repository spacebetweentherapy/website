<template>
  <div class="hero-container">
    <div class="hero-banner">
      <div class="hero-overlay">
        <h1 v-html="heroTitleHtml" />
        <p v-if="heroText">
          {{ heroText }}
        </p>
      </div>
      <ResponsiveImage :url="heroImageUrl" :alt="heroImageAltText" class-name="hero-image" />
    </div>
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
      return '<span class="first-word">' + titleArray[0] + '</span>' + ((titleArray[1]) ? titleArray[1] : '')
    }
  }
})
</script>

<style lang="scss">
.hero-container {
  position: relative;
  width: 100%;
  height: 50vh;
}

.hero-banner {
  position: absolute;
  width: 100%;
  height: 100%;

  .hero-overlay {
    position: absolute;
    text-align: center;
    width: 100%;

    h1 {
      margin-bottom: 0;
      font-size: 5vw;
      transform: translateY(5vw);
      letter-spacing: 0.45rem;
      font-weight: 700;
      color: $fg-colour !important;
      @include logo-typography;

      .first-word {
        color: $bg-colour-light;
      }
    }

    p {
      margin: 0;
      font-size: 2.5vw;
      transform: translateY(5vw);
      letter-spacing: 0.45rem;
      font-weight: 500;
    }
  }

  .hero-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    object-position: 50% 50%;
    object-fit: cover;
  }
}

@media screen and (min-width: 1200px) {
  .hero-banner {
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

@media screen and (max-width: 800px) {
  .hero-banner {
    .hero-overlay {
      display: none;
    }
  }
}
</style>
