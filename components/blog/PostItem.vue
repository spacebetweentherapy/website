<template>
  <li class="post-item">
    <NuxtLink :to="slug" class="post-item__link">
      <h2 class="post-item__title">
        {{ title }}
      </h2>
      <p class="post-item__text">
        {{ intro }}
      </p>
      <CmsImage
        v-if="assetId"
        :asset-id="assetId"
        :width="150"
        :height="100"
        :include2x="true"
        class="post-item__image"
      />
    </NuxtLink>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    intro: {
      type: String,
      default: '',
      required: true
    },
    assetId: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.post-item {
  padding: 0 0 1em 0;
}

.post-item__link, .post-item__link:visited {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;
  color: $colour-text;
}

.post-item__title {
  width: 100%;
  flex: 0 0 100%;
  margin: 0 2em 0 0;
  font-family: $font-sans !important;
  text-transform: none !important;
  color: $colour-text !important;
  text-align: left;
  font-size: 1.2em;
}

.post-item__text {
  position: relative;
  flex: 1;
  display: block;
  width: 100%;
  padding: 0 0 2em 0;
  color: $colour-text;
  background-image: radial-gradient(circle, #fff 1.25px, rgba(255,255,255,0) 2.5px);
  background-position: bottom;
  background-size: 15px 5px;
  background-repeat: repeat-x;

  &:after {
    box-sizing: border-box;
    position: absolute;
    bottom: -1em;
    right: -.2em;
    width: 30px;
    content: url('../../static/images/icon-arrow.png');
  }
}

.post-item__image {
  flex: 0 0 150px;
  width: 150px;
  margin-top: -2em;
  margin-left: 2em;
}

@include small-screens {
  .post-item__image {
    display: none;
  }
}
</style>

<!-- Not scoped or this doesn't work -->
<style lang="scss">
.post-item__image {
  img {
    @include content-image;
  }
}
</style>
