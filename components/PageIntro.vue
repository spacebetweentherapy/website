<template>
  <section class="intro">
    <!-- Allow a hero image to be added by the parent -->
    <slot name="hero" />

    <div class="intro__content">
      <h1 v-if="title" class="intro__title">
        {{ title }}
      </h1>
      <div v-if="introText" class="intro__text">
        <!-- eslint-disable -->
        <div v-html="$md.render(introText)" class="cms-markdown" />

        <!-- Allow an inline image to be added by the parent -->
        <slot name="introImage" />
      </div>

      <hr class="intro__line">
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    introText: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.intro__title {
  display: block;
  max-width: $max-width;
  padding: 0 2.4em;
  margin: 1em auto -1em auto;
  font-size: $size-page-title;
  text-align: left;
  text-transform: uppercase;
  font-family: $font-serif;
  font-weight: $weight-heavy;
  line-height: 1.1em;
  color: $colour-highlight;
}

.intro__text {
  padding: 2em 6em;
  display: flex;
  column-gap: 4em;
  align-items: center;
  flex-wrap: nowrap;
  max-width: $max-width;
  margin: auto;
}

.cms-markdown {
  font-weight: $weight-heavy;
}

.intro__line {
  margin: auto;
  border: 0;
  border-top: 1px solid $colour-highlight;
  width: 85%;
}

@include small-screens {
  .intro__title {
    padding: 0 .8em;
  }

  .intro__text {
    padding: 1.2em 2em;
    flex-wrap: wrap;
    justify-content: center;
  }

  .intro__line {
    width: 100%;
  }
}
</style>
