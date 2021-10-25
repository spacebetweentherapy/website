# space-between-therapy

Public website of spacebetweentherapy.com.

This site is built using:

- [Vue.js](https://vuejs.org/)
- [Nuxt.js](https://nuxtjs.org/)
- [Contentful](https://www.contentful.com/)

## Build setup

### Environment variables

Before building the following environment variables are needed:

- `SITE_TITLE` The title of this site (used in `<head><title>` and other areas)
- `CTF_SPACE_ID` The Contentful space ID
- `CTF_CDA_ACCESS_TOKEN` The Contentful access token to pass in requests
- `GOOGLE_ANALYTICS_ID` The Google Analytics UA ID to embed

These can be set in a `.env` file locally or passed as environment variables in shell.

### Running a build

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
For a detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).