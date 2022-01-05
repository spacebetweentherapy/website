<template>
  <div class="page">
    <PageContent>
      <section class="recent-blog-posts">
        <div class="posts-container">
          <h1>
            <NuxtLink to="/blog">
              Blog
              <!-- <span v-html="logoSvg" /> -->
            </NuxtLink>
          </h1>
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
          <ResponsiveImage asset-id="5rSJveXPjJQSUezEAa7boo" />
        </div>
      </section>
    </PageContent>
  </div>
</template>

<style lang="scss">
.recent-blog-posts {
  .posts-container {
    margin: auto;
    max-width: $max-width;
    display: flex;
    flex-wrap: wrap;
    column-gap: 2em;

    h1 {
      flex: 0 0 100%;

      a {
        font-family: $font-serif;
        color: $bg-colour-light;
        text-decoration: underline;
        text-decoration-color: $contrast-colour-dark;
        text-underline-offset: .2em;
        font-weight: normal;
        text-transform: uppercase;
      }
    }

    ol {
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;

      li {
        padding: 1em 0;
        border-bottom: 1px dashed $bg-colour-light;

        &:nth-child(1) {
          padding-top: 0;
        }

        &:nth-child(3) {
          border-bottom: 0;
        }

        h2 {
          font-family: $font-sans;
          text-transform: none;
          color: $fg-colour;
        }
      }
    }
  }
}

@include small-screens {
  .recent-blog-posts {
    padding: 1em 2em;

    .posts-container {
      flex-wrap: wrap;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
