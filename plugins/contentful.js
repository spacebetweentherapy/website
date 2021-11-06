const ctf = require('contentful')

const setup = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  host: process.env.CTF_API_URL
}

// export `createClient` to use it in page components
module.exports = {
  createClient () {
    return ctf.createClient(setup)
  }
}
