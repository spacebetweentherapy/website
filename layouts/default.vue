<template>
  <div class="container">
    <MainMenu />
    <Nuxt keep-alive :keep-alive-props="{ max: 10, include: ['MainMenu', 'Footer'] }" />
    <Footer />
  </div>
</template>
