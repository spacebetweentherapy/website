<template>
  <picture v-if="cmsAsset.fields" :class="className">
    <source :srcset="imageUrl + '&fm=avif'" type="image/avif">
    <source :srcset="imageUrl + '&fm=webp'" type="image/webp">
    <source :srcset="imageUrl" :type="cmsAsset.fields.file.contentType">
    <img
      :src="imageUrl"
      :width="imageWidth"
      :height="imageHeight"
      :alt="imageAlt"
      :class="className"
    >
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
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },

  data () {
    // We will populate an asset from the CMS
    const cmsAsset: any = null
    const imageUrl: String = ''
    const imageWidth: Number = 0
    const imageHeight: Number = 0
    const imageAlt: String = ''
    return {
      cmsAsset,
      imageUrl,
      imageWidth,
      imageHeight,
      imageAlt
    }
  },

  async fetch () {
    // Retrieve the asset from the CMS
    const asset = await this.$contentful.getAsset(this.assetId)
    this.$data.cmsAsset = asset
    this.$data.imageWidth = (this.width) ? this.width : asset.fields.file.details.image.width
    this.$data.imageHeight = (this.height) ? this.height : asset.fields.file.details.image.height
    this.$data.imageUrl = asset.fields.file.url + '?w=' + this.imageWidth + '&h=' + this.imageHeight
    this.$data.imageAlt = (asset.fields.description) ? asset.fields.description : null
  }
})
</script>
