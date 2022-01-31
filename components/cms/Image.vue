<template>
  <picture v-if="cmsAsset.fields" :class="classes">
    <source :srcset="srcSet('avif')" type="image/avif">
    <source :srcset="srcSet('webp')" type="image/webp">
    <source :srcset="srcSet()" :type="cmsAsset.fields.file.contentType">
    <img
      :src="imageUrl"
      :width="imageWidth"
      :height="imageHeight"
      :alt="imageAlt"
      :class="classes"
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
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    include2x: {
      type: Boolean,
      default: false
    }
  },

  data () {
    // We will populate an asset from the CMS
    const cmsAsset: any = null
    const imageUrl: String = ''
    const imageUrl2x: String = ''
    const imageWidth: number = 0
    const imageHeight: number = 0
    const imageAlt: String = ''
    return {
      cmsAsset,
      imageUrl,
      imageUrl2x,
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
    this.$data.imageUrl2x = asset.fields.file.url + '?w=' + (this.imageWidth * 2) + '&h=' + (this.imageHeight * 2)
    this.$data.imageAlt = (asset.fields.description) ? asset.fields.description : null
  },

  computed: {
    classes () {
      let returnValue = 'image'
      returnValue += (this.showBorder) ? ' image--border' : ''
      returnValue += (this.focus) ? ' image--focus' : ''
      returnValue += (this.className) ? ' ' + this.className : ''
      return returnValue
    }
  },

  methods: {
    srcSet (format: String) {
      let returnValue = this.imageUrl
      if (this.include2x) {
        let formatParameter = ''
        if (format && format !== '') {
          formatParameter = '&fm=' + format
        }
        returnValue = this.imageUrl2x + formatParameter + ' 2x, ' + this.imageUrl + formatParameter + ' 1x'
      }
      return returnValue
    }
  }
})
</script>

<style lang="scss" scoped>
img.image--border {
  border: 3px solid $colour-bg-lightest;
  border-radius: 5px;
}

.image--focus {
  max-width: 100%;
  height: auto;
}
</style>
