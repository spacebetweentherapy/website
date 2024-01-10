import { Metadata, ResolvingMetadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { fetchGraphQL, richTextOverrides } from '../lib/cms'
import Hero from '../components/hero'
import Image from '../components/image'
import Quote from '../components/quote'
import RichText from '@madebyconnor/rich-text-to-jsx'

export async function fetchPages(slug) {
    const query = `query {
        pageCollection (limit: 1, where: {
          slug: "${slug}"
        }) {
              items {
                  sys {
                      id
                  }
                  slug
                  title
                  metaDescription
                  noIndex
                  noFollow
                  intro
                  introImage {
                    contentType
                    url
                    width
                    height
                    description
                  }
                  hero {
                    sys {
                      id
                    }
                    heading
                    shortText
                    image {
                      contentType
                      url
                      width
                      height
                      description
                    }
                  }
                  quote {
                    sys {
                        id
                    }
                    text
                    author
                    image {
                      contentType
                      url
                      width
                      height
                      description
                    }
                  }
                  section1Content {
                    json
                  }
                  section2Content {
                    json
                  }
                  section3Content {
                    json
                  }
              }
          }
      }`
    const pages = await fetchGraphQL(query)
    return pages?.data?.pageCollection?.items
}

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const pages = await fetchPages(params.slug)
    const page = pages[0]

    return {
        title: page.title + " - " + process.env.SITE_TITLE,
        description: page.metaDescription,
        robots: ((page.noIndex) ? 'noindex' : 'index') + ', ' + ((page.noFollow) ? 'nofollow' : 'follow')
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const pages = await fetchPages(params.slug)
    const page = pages[0]

    return (
        <div className="page">
            <Hero
                heading={page.hero.heading}
                shortText={page.hero.shortText}
                url={page.hero.image.url}
                contentType={page.hero.image.contentType}
                width={page.hero.image.width}
                height={page.hero.image.height}
                description={page.hero.image.description}
                className="hero__image" />

            <section key={page.sys.id} className="intro">
                <div className="intro__content">
                    {page.title ?
                        <h1 className="intro__title">
                            {page.title}
                        </h1>
                        : ''}

                    {page.intro ?
                        <div className="intro__text">
                            <div>
                                <MDXRemote source={page.intro} />
                            </div>

                            {page.introImage ?
                                <Image
                                    url={page.introImage.url}
                                    width="200"
                                    height="200"
                                    description={page.introImage.description}
                                    contentType={page.introImage.contentType}
                                    x2={true}
                                />
                                : ''}
                        </div>
                        : ''}

                    {page.intro ?
                        <hr className="intro__line" />
                        : ''}
                </div>
            </section>

            {page.section1Content ?
                <section className="content">
                    <div className="content-main">
                        <div className="content-wrapper">
                            <RichText richText={page.section1Content.json} overrides={richTextOverrides} />
                        </div>
                    </div>
                </section>
                : ''}

            {page.section2Content ?
                <section className="content">
                    <div className="content-main">
                        <div className="content-wrapper">
                            <RichText richText={page.section2Content.json} />
                        </div>
                    </div>
                </section>
                : ''}

            {page.section3Content ?
                <section className="content">
                    <div className="content-main">
                        <div className="content-wrapper">
                            <RichText richText={page.section3Content.json} />
                        </div>
                    </div>
                </section>
                : ''}

            {page.quote ?
                <Quote text={page.quote.text} author={page.quote.author} imgUrl={page.quote.image.url} imgWidth={page.quote.image.width} imgHeight={page.quote.image.height} imgDescription={page.quote.image.description} imgContentType={page.quote.image.contentType} />
                : ''}
        </div>
    )
}