<template>
  <iframe
    class="audio-player"
    src="https://embed.acast.com/6230990be23a6d0012c856e6/623099f4ef1f4a00130374e6?accentColor=4a4a4a&bgColor=ebebeb&secondaryColor=ae854c"
    frameBorder="0"
    height="110px"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    showId: {
      type: String,
      required: true
    },
    episodeId: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.audio-player {
  display: block;
  margin: auto;
  width: 744px;
}

@include medium-screens {
  .audio-player {
    width: 100%;
  }
}
</style>
