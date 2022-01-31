<template>
  <div class="hero">
    <div class="hero__wrapper">
      <div class="hero__content">
        <h1 v-if="title" class="hero__title">
          <span class="hero__first-word">{{ firstWord }}</span> {{ otherWords }}
        </h1>
        <p v-if="subText" class="hero__text">
          {{ subText }}
        </p>
      </div>
      <CmsImage :asset-id="assetId" class-name="hero__image" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    assetId: {
      type: String,
      required: true,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subText: {
      type: String,
      default: ''
    }
  },

  computed: {
    // Highlight the first word of the hero title
    firstWord () {
      const titleText = this.title
      const titleArray = titleText.split(' ', 2)
      return (titleArray[0]) ? titleArray[0] : ''
    },
    otherWords () {
      const titleText = this.title
      const titleArray = titleText.split(' ', 2)
      return (titleArray[1]) ? titleArray[1] : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 50vh;
  min-height: 500px;
}

.hero__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}

.hero__content {
  position: absolute;
  text-align: center;
  width: 100%;
}

.hero__title {
  margin-bottom: -.2em;
  padding-top: .6em;
  font-size: 5vw;
  transform: translateY(5vw);
  letter-spacing: 0.45rem;
  color: $colour-text;
  text-align: center;
  font-family: $font-serif;
  letter-spacing: .2em;
  word-spacing: -.2em;
  font-weight: normal;
  text-transform: uppercase;
}

.hero__first-word {
  display: inline-block;
  color: $colour-bg-lightest;
  margin-right: -.2em;
}

.hero__text {
  margin: 0;
  font-size: 2vw;
  transform: translateY(5vw);
  letter-spacing: 0.45rem;
  font-weight: 500;
}

@include medium-screens {
  .hero__title {
    font-size: 4em;
  }

  .hero__text {
    font-size: 1.5em;
  }
}

@include small-screens {
  .hero__content {
    display: none;
  }
}
</style>

<!-- Unscoped styles -->
<style lang="scss">
.hero__image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  object-position: 15% 25%;
  object-fit: cover;
}

// TODO Remove this hardcoded logo on homepage Hero
.page-home {
  .hero__content {
    p:after {
      box-sizing: border-box;
      position: absolute;
      top: 2em;
      left: 50%;
      width: 250px;
      margin-left: -125px;
      text-align: center;
      content: image-set(
      url('../../static/images/circles.png') 1x,
      url('../../static/images/circles-2x.png') 2x,
      url('../../static/images/circles-3x.png') 3x
    );
    }
  }
}
</style>
