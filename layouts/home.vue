<template>
  <div id="container">
    <header>
      <h1>
        <NuxtLink to="/">
          Space Between
        </NuxtLink>
      </h1>
      <p>counselling & psychotherapy</p>
      <MainMenu />
    </header>

    <Nuxt keep-alive />
  </div>
</template>

<style lang="scss" scoped>
header {
  h1 {
    @include logo-typography
  }
}
</style>
