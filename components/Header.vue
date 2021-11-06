<template>
  <header>
    <h1>
      <NuxtLink to="/">
        Space Between
      </NuxtLink>
    </h1>
    <p>counselling & psychotherapy</p>
    <MainMenu />
  </header>
</template>

<style lang="scss" scoped>
header h1 {
  display: none;
  @include logo-typography;
}

header p {
  display: none;
}
</style>
