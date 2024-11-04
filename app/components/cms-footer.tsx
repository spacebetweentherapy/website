import { fetchGraphQL } from'../lib/cms'
import Link from "next/link";
import Image from './image'

async function fetchFooterMenuItems() {
    const menuItems = await fetchGraphQL(`query {
        footerMenuCollection {
            items {
                sys {
                    id
                }
                title
                linksCollection {
                    items {
                        sys {
                            id
                        }
                        title
                        slug
                    }
                }
            }
        }
    }`)
    return menuItems?.data?.footerMenuCollection?.items[0].linksCollection.items
}

async function fetchFooterImages() {
    const images = await fetchGraphQL(`query {
        assetCollection (where: {
            contentfulMetadata: {
              tags_exists: true
              tags: {
                  id_contains_some: ["imageFooter"]
              }
          }
          }) {
            items {
                sys {
                    id
                }
                contentType
                url
                width
                height
                description

            }
        }
    }`)
    return images?.data?.assetCollection?.items
} 

export default async function Footer() {
    const footerMenu = await fetchFooterMenuItems()
    const footerImages = await fetchFooterImages()

    const imgWidth = 224
    const imgHeight = 96

    return (
        <footer className="footer">
            {footerImages.map((image) => (
                <Image key={image.sys.id}
                    url={image.url} 
                    contentType={image.contentType} 
                    width={imgWidth} 
                    height={imgHeight} 
                    description={image.description} 
                    className="footer__image"
                    x2={true}
                />
            ))}

            <nav className="footer__nav">
            <ul className="footer__list">
                {footerMenu.map((item) => (
                    <li key={item.sys.id} className="footer__item">
                        <Link className="footer__link" href={`/${item.slug}`}>{item.title}</Link>
                    </li>
                ))}
                <li className="footer__item">
                    <a href="#" data-cc="c-settings" className="footer__link">Cookie Preferences</a>
                </li>
            </ul>
            </nav>

            <div className="footer__copyright">
                &copy; Space Between Therapy { new Date().getFullYear() }
            </div>
        </footer>
   )
}