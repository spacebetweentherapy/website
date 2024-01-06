import { Metadata } from 'next'
import { fetchGraphQL } from'./lib/cms'
import Hero from './components/hero'
import Image from './components/image'
import { MDXRemote } from 'next-mdx-remote/rsc'

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
          }
      }
  }`)
  return pages?.data?.pageCollection?.items
}

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
 
export const metadata: Metadata = {
  title: 'Home - Space Between Therapy',
}

export default async function Page() {
  const pages = await fetchPages()
  const page = pages[0]

  const homepageImage = await fetchHomepageImage()

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
        className="hero__image"/>

      <section key={page.sys.id} className="intro">
        <div className="intro__content">
          { page.title ?
            <h1 v-if="title" className="intro__title">
              {page.title}
            </h1>
          : ''}

          { page.intro ?
            <div className="intro__text">
              <div>
                <MDXRemote source={page.intro} />
              </div>

              { page.introImage.url ?
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

          { page.intro ?
            <hr className="intro__line"/>
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

          {/* The style attribute is specific to the home page */}
          <div className="content-wrapper" style={{padding:0}} v-html="markup" />
        </div>
      </section>
    </div>
  )
}