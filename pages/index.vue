<template>
  <div class="page">
    <PageContent />

    <section class="recent-blog-posts">
      <h1>
        <NuxtLink to="/blog">
          Blog
          <!-- <span v-html="logoSvg" /> -->
        </NuxtLink>
      </h1>
      <div class="posts-container">
        <ol class="posts">
          <li>
            <h2>Connecting with nature</h2>
            <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
          </li>
          <li>
            <h2>How to find a therapist</h2>
            <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
          </li>
          <li>
            <h2>Space Between - why the name</h2>
            <p>There's nothing better than waking up under the stars. Wild camping is a great way to do something fun and get out into the wild. This is just some text to see what it...</p>
          </li>
        </ol>
        <img src="//images.ctfassets.net/eia1ph7h56y6/4QKYgZ75hpQq30yOokKwVj/22bc3ce7275e22feecedcd0d08add050/tor-rocks.jpg">
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.content-intro {
  padding: 2em 6em !important;
}

.recent-blog-posts {
  padding: 1em 4em;

  h1 {
    display: flex;

    a {
      font-family: $font-serif;
      color: $bg-colour-light;
      text-decoration: underline;
      text-decoration-color: $contrast-colour-dark;
      text-underline-offset: .2em;
      font-family: $font-serif;
      font-weight: normal;
      text-transform: uppercase;
    }
  }

  .logo-circle {
    stroke: #fff;
  }

  .posts-container {
    display: flex;
    column-gap: 2em;

    ol {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 1em 0;
        border-bottom: 1px dashed $bg-colour-light;

        &:nth-child(1) {
          padding-top: 0;
        }

        &:nth-child(3) {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
