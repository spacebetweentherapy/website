import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $contentful: any
    $renderRichText(richText: any): string
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $contentful: any
    $renderRichText(richText: any): string
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $contentful: any
    $renderRichText(richText: any): string
  }
}

const myPlugin: Plugin = (context, inject) => {
  // Make Contentful API available
  const ctf = require('contentful')
  const setup = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    host: process.env.CTF_API_URL
  }
  inject('contentful', ctf.createClient(setup))

  // Custom rendering for Contentful's special Rich Text data type
  inject('renderRichText', (richText: any) => {
    const options: Partial<Options> = {
      renderNode: {
        // Handle embedded images
        [BLOCKS.EMBEDDED_ASSET]: (node: any): string => {
          return (
            '<img src="' +
            node.data.target.fields.file.url +
            '" width="' +
            node.data.target.fields.file.details.image.width +
            '" height="' +
            node.data.target.fields.file.details.image.height +
            '" alt="' +
            node.data.target.fields.description +
            '">'
          )
        },
        // Handle links to other CMS pages
        [INLINES.ENTRY_HYPERLINK]: (node: any): string => {
          if (node.data.target.sys.contentType.sys.id === context.$config.CTF_CONTENT_TYPE_PAGE) {
            return (
              '<a href="/' +
              node.data.target.fields.slug +
              '">' +
              node.content[0].value +
              '</a>'
            )
          } else {
            return ''
          }
        }
      }
    }

    // Render using the Contentful library
    let markup = documentToHtmlString(richText, options)

    // Replace line breaks with HTML line break tags
    markup = markup.replace(/\n/g, '<br>')

    return markup
  })
}

export default myPlugin
