<template>
  <picture v-if="cmsAsset.fields" :class="className">
    <source :srcset="cmsAsset.fields.file.url + '?fm=avif'" type="image/avif">
    <source :srcset="cmsAsset.fields.file.url + '?fm=webp'" type="image/webp">
    <source :srcset="cmsAsset.fields.file.url" :type="cmsAsset.fields.file.contentType">
    <img :src="cmsAsset.fields.file.url" :width="cmsAsset.fields.file.details.image.width" :height="cmsAsset.fields.file.details.image.height" :alt="cmsAsset.fields.description" :class="className">
  </picture>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    assetId: {
      type: String,
      default: '',
      required: true
    },
    className: {
      type: String,
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
    const asset = await this.$contentful.getAsset(this.assetId)
    this.cmsAsset = asset
  }
})
</script>
