import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { fetchGraphQL } from './lib/cms'
import Link from "next/link";
import Hero from './components/hero'
import Image from './components/image'
import Quote from './components/quote'
import RichText from './components/rich-text'
import '../styles/home.scoped.scss'

export async function fetchPages() {
  const pages = await fetchGraphQL(`query {
    pageCollection (limit: 1, where: {
      slug: "index"
    }) {
          items {
              sys {
                  id
              }
              slug
              title
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
          }
      }
  }`)
  return pages?.data?.pageCollection?.items
}

// A hardcoded image for the homepage
export async function fetchHomepageImage() {
  const image = await fetchGraphQL(`query {
    asset (id: "4QKYgZ75hpQq30yOokKwVj") {
      url
      contentType
      description
    }
  }`)
  return image?.data.asset
}

export async function fetchHomeMenuItems() {
  const menuItems = await fetchGraphQL(`query {
      homeMenuCollection {
          items {
              sys {
                  id
              }
              linksCollection {
                  items {
                      sys {
                          id
                      }
                      title
                      slug
                      thumbnailText
                      thumbnail {
                        url
                        contentType
                        description
                     }
                  }
              }
          }
      }
  }`)
  return menuItems?.data?.homeMenuCollection?.items[0].linksCollection.items
}

export const metadata: Metadata = {
  title: 'Home - Space Between Therapy',
}

export default async function Page() {
  const pages = await fetchPages()
  const page = pages[0]

  const homepageImage = await fetchHomepageImage()
  const homeMenu = await fetchHomeMenuItems()

  return (
    <div className="page page-home">
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
            <h1 v-if="title" className="intro__title">
              {page.title}
            </h1>
            : ''}

          {page.intro ?
            <div className="intro__text">
              <div>
                <MDXRemote source={page.intro} />
              </div>

              {page.introImage.url ?
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

      <section className="content">
        <div className="content-main">
          {/* Image is specific to the home page */}
          <div className="content__image">
            <Image
              url={homepageImage.url}
              class-name="page-home__image"
              width="500"
              height="400"
              contentType={homepageImage.contentType}
              description={homepageImage.description}
              x2={true}
              showBorder={true}
            />
          </div>

          {page.section1Content ?
            <RichText richText={page.section1Content.json} style="{padding: 0}" />
            : ''}
        </div>
      </section>

      <div>
        <div />
        <section className="homepage-menu">
          <div className="links">
            <ul className="links__list">
              {homeMenu.map((link) => (
                <li key={link.sys.id} className="links__item">
                  <Link href={link.slug} className="links__link">
                    <Image url={link.thumbnail.url} contentType={link.thumbnail.contentType} description={link.thumbnail.description} width="200" height="200" x2={true} />
                    <h2 className="links__title">
                      {link.title}
                    </h2>
                    <p className="links__text">
                      {link.thumbnailText}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact">
          <div className="content-main">
            <div className="content-wrapper">
              <p className="contact__text">
                If you would like to arrange a free consultation, check my availability or ask a question, please feel free to get in touch.
              </p>
              <p className="button-container">
                <a className="button" href="/contact">Contact</a>
              </p>
            </div>
          </div>
        </section>
      </div>

      {page.quote ?
        <Quote text={page.quote.text} author={page.quote.author} imgUrl={page.quote.image.url} imgWidth={page.quote.image.width} imgHeight={page.quote.image.height} imgDescription={page.quote.image.description} imgContentType={page.quote.image.contentType} />
        : ''}
    </div>
  )
}