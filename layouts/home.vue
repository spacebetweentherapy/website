<template>
  <div
    id="container"
    class="container-home"
  >
    <header>
      <h1><span class="space">Space</span> Between</h1>
      <p>counselling & psychotherapy</p>
      <MainMenu />
    </header>

    <Nuxt keep-alive />
  </div>
</template>

<style lang="scss">
.container-home {
  header {
    position: absolute;
    top: 0;
    width: 100%;
    max-width: $max-width;
    margin: auto;
    text-align: center;

    h1 {
      @include logo-typography;
      font-size: 3em;
      margin-top: 5em;

      .space {
        color: $bg-colour;
      }
    }

    p {
      font-size: 1.6em;
    }
  }
}
</style>
