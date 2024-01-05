import { fetchGraphQL } from'../lib/cms'
import Link from "next/link";

export async function fetchFooterMenuItems() {
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

export async function fetchFooterImages() {
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
                <picture key={image.sys.id} className="footer__item">
                    {/* <source srcSet="srcSet('webp')" type="image/webp"/> */}
                    <source srcSet={image.url} type={image.contentType}/>
                    <img
                        src={`${image.url}?w=224&h=96`}
                        width={imgWidth}
                        height={imgHeight}
                        alt={image.description}
                        className="image footer__image"
                    />
                </picture>
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