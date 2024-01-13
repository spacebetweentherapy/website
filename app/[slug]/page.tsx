import { Metadata, ResolvingMetadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { fetchGraphQL } from '../lib/cms'
import Hero from '../components/hero'
import Image from '../components/image'
import Quote from '../components/quote'
import RichText from '../components/rich-text'

async function fetchPages(slug: string) {
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
                    links {
                        assets {
                            block {
                                sys {
                                    id
                                }
                                url
                                width
                                height
                                description
                            }
                        }
                        entries {
                            inline {
                                sys {
                                    id
                                }
                                __typename
                            }
                            block {
                                sys {
                                    id
                                }
                                __typename
                            }
                        }
                    }
                  }
                  section2Content {
                    json
                    links {
                        assets {
                            block {
                                sys {
                                    id
                                }
                                url
                                width
                                height
                                description
                            }
                        }
                        entries {
                            inline {
                                sys {
                                    id
                                }
                                __typename
                            }
                            block {
                                sys {
                                    id
                                }
                                __typename
                            }
                        }
                    }
                  }
                  section3Content {
                    json
                    links {
                        assets {
                            block {
                                sys {
                                    id
                                }
                                url
                                width
                                height
                                description
                            }
                        }
                        entries {
                            inline {
                                sys {
                                    id
                                }
                                __typename
                            }
                            block {
                                sys {
                                    id
                                }
                                __typename
                            }
                        }
                    }
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

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const query = `query {
        pageCollection {
            items {
                sys {
                    id
                }
                slug
            }
        }
    }`
    const pages = await fetchGraphQL(query)

    return pages.data.pageCollection.items.map((post) => ({
        slug: post.slug,
    }))
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
                        <RichText body={page.section1Content.json} links={page.section1Content.links} />
                    </div>
                </section>
                : ''}

            {page.section2Content ?
                <section className="content">
                    <div className="content-main">
                        <RichText body={page.section2Content.json} links={page.section2Content.links} />
                    </div>
                </section>
                : ''}

            {page.section3Content ?
                <section className="content">
                    <div className="content-main">
                        <RichText body={page.section3Content.json} links={page.section3Content.links} />
                    </div>
                </section>
                : ''}

            {page.quote ?
                <Quote text={page.quote.text} author={page.quote.author} imgUrl={page.quote.image.url} imgWidth={page.quote.image.width} imgHeight={page.quote.image.height} imgDescription={page.quote.image.description} imgContentType={page.quote.image.contentType} />
                : ''}
        </div>
    )
}