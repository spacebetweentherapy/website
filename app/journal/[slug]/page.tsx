import { Metadata } from 'next'
import { fetchGraphQL } from '../../lib/cms'

export const metadata: Metadata = {
  title: 'Article',
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const query = `query {
    blogPostCollection {
      items {
        sys {
            id
        }
        slug
      }
    }
  }`
  const pages = await fetchGraphQL(query)

  return pages.data.blogPostCollection.items.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page() {
  return <h1>Article</h1>
}