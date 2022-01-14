<template>
  <div class="container-quote">
    <div class="quote-banner">
      <div class="quote-overlay">
        <p>
          <span class="quote-mark">&ldquo;</span>
          {{ cmsAsset.fields.text }}
          <span class="quote-mark">&rdquo;</span>
        </p>
        <p class="author">
          {{ cmsAsset.fields.author }}
        </p>
      </div>
      <ResponsiveImage :asset-id="cmsAsset.fields.image.sys.id" class-name="quote-image" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    quoteId: {
      type: String,
      required: true,
      default: ''
    }
  },

  data () {
    // We will populate an asset from the CMS
    const cmsAsset: any = null
    return {
      cmsAsset
    }
  },

  async fetch () {
    // Retrieve the asset from the CMS
    const asset = await this.$contentful.getEntry(this.quoteId)
    this.cmsAsset = asset
  }
})
</script>

<style lang="scss">
.container-quote {
  position: relative;
  width: 100%;
  height: 50vh;
  min-height: 350px;
}

.quote-banner {
  position: absolute;
  width: 100%;
  height: 100%;

  .quote-overlay {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    margin: auto;
    width: 100%;
    max-width: $max-width;
    text-align: center;

    p {
      margin: 1em 6em;
      font-size: 2em;
      transform: translateY(-5vh);
      color: $bg-colour-light;
      font-family: $font-serif;
      font-weight: $font-weight-heavy;
      line-height: 1.5em;

      &.author {
        font-family: $font-sans;
        font-size: 1em;
      }
    }

    .quote-mark {
      color: $contrast-colour-dark;
      font-family: $font-sans;
      font-size: 1.5em;
    }
  }

  .quote-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    object-position: 15% 50%;
    object-fit: cover;
  }
}

@include small-screens {
  .quote-banner {
    .quote-overlay {
      p {
        margin: 1em;
        font-size: 1.4em;
      }
    }
  }
}
</style>
