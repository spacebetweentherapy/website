import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer'
import { INLINES, BLOCKS } from '@contentful/rich-text-types';

export default function RichText({ richText, style = "" }) {
  const CTF_CONTENT_TYPE_PAGE = "page"
  const CTF_CONTENT_TYPE_BLOG_POST = "blogPost"
  const CTF_CONTENT_TYPE_CONTACT_INFO = "contactInfo"

  const options: Partial<Options> = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: {
        
      }

      // Handle embedded images
      // [BLOCKS.EMBEDDED_ASSET]: (node: any): string => {
      //   return (
      //     '<CmsImage id={node.data.target.sys.id}/>'
      //   )
      // },
      // Handle links to other CMS pages
      // [INLINES.ENTRY_HYPERLINK]: (node: any): string => {
        //   if (node.data.target.sys.contentType.sys.id === CTF_CONTENT_TYPE_PAGE) {
        //     return (
        //       '<a href="/' +
        //       node.data.target.fields.slug +
        //       '">' +
        //       node.content[0].value +
        //       '</a>'
        //     )
        //   } else if (node.data.target.sys.contentType.sys.id === CTF_CONTENT_TYPE_BLOG_POST) {
        //     return (
        //       '<a href="/journal/' +
        //       node.data.target.fields.slug +
        //       '">' +
        //       node.content[0].value +
        //       '</a>'
        //     )
        //   } else if (node.data.target.sys.contentType.sys.id === CTF_CONTENT_TYPE_CONTACT_INFO) {
        //     return (
        //       node.data.target.fields.contact
        //     )
        //   } else {
        //     return node.content[0].value
        //   }
      // },
      // Embedded contact info
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        if (node.data.target.sys.contentType.sys.id === CTF_CONTENT_TYPE_CONTACT_INFO) {
          return (
            node.data.target.fields.contact
          )
        }
      }
    }
  }

  const markup = documentToReactComponents(richText, options)

  return (
    <div className="content-wrapper">
      {markup}
    </div>
  )
}