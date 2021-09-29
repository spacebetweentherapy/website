export default function ({ $config }, inject) {
  const ctf = require('contentful')
  // use default environment config for convenience
  // these will be set via `env` property in nuxt.config.js
  const setup = {
    space: $config.CTF_SPACE_ID,
    accessToken: $config.CTF_CDA_ACCESS_TOKEN,
    host: $config.CTF_API_URL
  }

  // export `createClient` to use it in page components
  const $contentful = ctf.createClient(setup)

  // Inject to the context
  inject('contentful', $contentful)
}
