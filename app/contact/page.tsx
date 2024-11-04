import { Metadata, ResolvingMetadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { fetchGraphQL } from '../lib/cms'
import Hero from '../components/hero'
import Image from '../components/image'
import Quote from '../components/quote'
import RichText from '../components/rich-text'
import '../../styles/contact.scoped.scss'

async function fetchContactPage() {
  const query = `query {
        pageCollection (limit: 1, where: {
          slug: "contact"
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

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const pages = await fetchContactPage()
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

// Return contact info (email & phone) from CMS
export async function fetchEmail() {
  const query = `query {
      contactInfoCollection (limit: 1, where: {
          type: "Email"
        }) {
          items {
              sys {
                  id
              }
              type
              contact
          }
      }
  }`
  const page = await fetchGraphQL(query)
  return page.data.contactInfoCollection.items[0].contact
}

export async function fetchPhone() {
  const query = `query {
      contactInfoCollection (limit: 1, where: {
          type: "Phone"
        }) {
          items {
              sys {
                  id
              }
              type
              contact
          }
      }
  }`
  const page = await fetchGraphQL(query)
  return page.data.contactInfoCollection.items[0].contact
}

export default async function Page() {
  const pages = await fetchContactPage()
  const page = pages[0]
  const email = await fetchEmail()
  const phone = await fetchPhone()

  return (
    <div className="page page-contact">
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

      <div>
        <section>
          <div className="contact">
            <ul className="contact__list">
              <li className="contact__item">
                <img
                  srcSet="/images/icon-email-3x.png 3x, /images/icon-email-2x.png 2x, /images/icon-email.png 1x"
                  src="/images/icon-email.png"
                  width="30"
                  height="30"
                  alt="Email icon"
                  className="contact__image"
                />
                <span className="contact__label">
                  <a href={"mailto:" + email}>{email}</a>
                </span>
              </li>
              <li className="contact__item">
                <img
                  srcSet="/images/icon-phone-3x.png 3x, /images/icon-phone-2x.png 2x, /images/icon-phone.png 1x"
                  src="/images/icon-phone.png"
                  width="30"
                  height="30"
                  alt="Telephone icon"
                  className="contact__image"
                />
                <span className="contact__label">
                  <a href={"tel:" + phone}>{phone}</a>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="form">
            <div className="form__wrapper">
              <form id="contact-form" acceptCharset="UTF-8" encType="multipart/form-data" method="post" action="https://submit.jotformeu.com/submit/220134543182042/">
                <label className="form__label">
                  Name
                  <input type="text" name="q4_typeA" className="form__input" required />
                </label>
                <label className="form__label">
                  Email
                  <input type="email" name="q5_email" className="form__input" required />
                </label>
                <label className="form__label">
                  Phone
                  <input type="tel" name="q8_typeA8" className="form__input" required />
                </label>
                <label className="form__label">
                  Your message
                  <textarea name="q7_typeA7" rows={6} className="form__input" required />
                </label>

                <input type="hidden" name="formID" value="220134543182042" />

                <div className="button-container">
                  <button type="submit" form="contact-form">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {page.quote ?
        <Quote
          text={page.quote.text}
          author={page.quote.author}
          imgUrl={page.quote.image.url}
          imgWidth={page.quote.image.width}
          imgHeight={page.quote.image.height}
          imgDescription={page.quote.image.description}
          imgContentType={page.quote.image.contentType} />
        : ''}

    </div>
  )
}