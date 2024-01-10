import { INLINES, BLOCKS } from '@contentful/rich-text-types'
import RichTextLink from '../components/rich-text-link'
import RichTextImage from '../components/rich-text-image'

export const richTextOverrides = {
    [BLOCKS.EMBEDDED_ASSET]: {
        image: {
            component: RichTextImage,
            props: {
                className: 'image--fullwidth',
                x2: false,
                showBorder: true
            }
        }
    },
    [INLINES.ENTRY_HYPERLINK]: {
        page: RichTextLink
    }
}

export async function fetchGraphQL(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
                // Contentful content or draft content
                Authorization: `Bearer ${preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CTF_CDA_ACCESS_TOKEN
                    }`,
            },
            body: JSON.stringify({ query }),
            // Associate all fetches for articles with an "articles" cache tag so content can
            // be revalidated or updated from Contentful on publish
            next: { tags: ["articles"] },
        }
    ).then((response) => response.json())
}