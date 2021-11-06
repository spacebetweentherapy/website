<template>
  <nav class="main-menu">
    <h2>Main menu</h2>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Therapy</li>
      <li>Blog</li>
      <li>Contact</li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  fetch () {
    console.log('loaded main menu')
  }
})
</script>

<style lang="scss" scoped>
nav {
  position: absolute;
  background-color: rgba($color: #000, $alpha: 0.1);

  h2 {
    display: none;
  }

  ul {
    display: flex;
    justify-content: flex-end;
    column-gap: $grid-gutter-large;
    width: 100vw;
    height: $header-height;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      font-size: 1.5em;
      text-transform: uppercase;
    }
  }
}
</style>
