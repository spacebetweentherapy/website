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
    return {
      cmsAsset
    }
  },

  async fetch () {
    // Retrieve the asset from the CMS
    const asset = await this.$contentful.getAsset(this.assetId)
    this.$data.cmsAsset = asset
  },

  computed: {
    imageUrl () {
      return this.$data.cmsAsset.fields.file.url + '?w=' + this.imageWidth + '&h=' + this.imageHeight
    },
    imageWidth () {
      return (this.width) ? this.width : this.$data.cmsAsset.fields.file.details.image.width
    },
    imageHeight () {
      return (this.height) ? this.height : this.$data.cmsAsset.fields.file.details.image.height
    },
    imageAlt () {
      return (this.$data.cmsAsset.fields.description) ? this.$data.cmsAsset.fields.description : null
    }
  }
})
</script>
