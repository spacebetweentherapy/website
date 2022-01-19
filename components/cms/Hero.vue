<template>
  <div class="hero">
    <div class="hero__wrapper">
      <div  class="hero__content">
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
  font-weight: 700;
  color: $fg-colour;
  text-align: center;
  @include logo-typography;
}

.hero__first-word {
  display: inline-block;
  color: $bg-colour-light;
  margin-right: -.2em;
}

.hero__text {
  margin: 0;
  font-size: 2vw;
  transform: translateY(5vw);
  letter-spacing: 0.45rem;
  font-weight: 500;
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
      content: url('../../static/images/circles.png');
    }
  }
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

<style lang="scss">
.hero__image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  object-position: 15% 50%;
  object-fit: cover;
}
</style>
