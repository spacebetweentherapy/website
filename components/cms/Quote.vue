<template>
  <div class="quote">
    <div class="quote__wrapper">
      <div class="quote__overlay">
        <p class="quote__text">
          <span class="quote__quote-mark">&ldquo;</span>{{ cmsAsset.fields.text }}<span class="quote__quote-mark">&rdquo;</span>
        </p>
        <p class="quote__author">{{ cmsAsset.fields.author }}</p>
      </div>
      <CmsImage :asset-id="cmsAsset.fields.image.sys.id" class-name="quote__image" />
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

<style lang="scss" scoped>
.quote {
  position: relative;
  width: 100%;
  height: 50vh;
  min-height: 500px;
}

.quote__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quote__overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 100%;
  max-width: $max-width;
  text-align: center;
}

.quote__text, .quote__author {
  margin: 1em 4em;
  font-size: 2em;
  color: $colour-bg-lightest;
  font-family: $font-serif;
  font-weight: $weight-heavy;
  line-height: 1.5em;
}

.quote__author {
  margin: 0;
  font-family: $font-sans;
  font-size: 1em;
}

.quote__quote-mark {
  color: $colour-highlight;
  font-family: $font-sans;
  font-size: 1.5em;
  line-height: .8em;
}

@include small-screens {
  .quote__text, .quote__author {
    margin: 1em;
  }

  .quote__text {
    font-size: 1.7em;
  }
}
</style>

<style lang="scss">
.quote__image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  object-position: 15% 50%;
  object-fit: cover;
}
</style>
