# space-between-therapy

Public website of spacebetweentherapy.com built using:
- [Vue.js](https://vuejs.org/)
- [Nuxt.js](https://nuxtjs.org/)
- [Cookie Consent](https://github.com/orestbida/cookieconsent)

Behind the scenes, spacebetweentherapy.com is a static website built using a set of free services:

- [Contentful](https://www.contentful.com/) CMS
- [GitHub](https://github.com/) including GitHub Actions
- [JotForm](https://www.jotform.com/) for the contact form
- [Firebase](https://firebase.google.com/) hosting
- [Cloudflare](https://www.cloudflare.com/en-gb/) CDN

These services are used as described in the below diagram.

![Architecture overview diagram](/doc/overview.png?raw=true "Architecture overview")

## Build setup

### Environment variables

Before building the following environment variables are needed at minimum:

- `CTF_SPACE_ID` The Contentful space ID
- `CTF_CDA_ACCESS_TOKEN` The Contentful access token to pass in requests

These can be set in a `.env` file locally or passed as environment variables in shell.

Optionally, you can connect to the Contentful preview API to see content in "Draft" state. To enable this, ensure a "preview" API token is populated in the environment variable above, and add the following environment variable:

- `CTF_API_URL=preview.contentful.com`

The site title can be overriden from its default:

- `SITE_TITLE` The title of this site (used in `<head><title>` and other areas)

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

### Google Lighthouse

We run Google [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) against builds to ensure site performance, SEO and accessibility scores remain high.

Lighthouse is configured to run automatically in a GitHub action when a PR is raised. Information about the results are included in the "checks" section of each PR. This relies on the official [Lighthouse CI GitHub app](https://github.com/apps/lighthouse-ci) being installed and authorised on this repository.