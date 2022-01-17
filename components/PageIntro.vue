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
  margin: 1em auto -1em auto;
  font-size: 2.5em;
  text-align: left;
  text-transform: uppercase;
  font-family: $font-serif;
  font-weight: $font-weight-heavy;
  line-height: 1.1em;
  color: $contrast-colour-dark;
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
  font-weight: $font-weight-heavy;
}

.intro__line {
  margin: 0;
  border: 0;
  border-top: 1px solid $contrast-colour-dark;
}

@include small-screens {
  .intro__text {
    padding: 1em 2em;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
