import { fetchGraphQL } from'../lib/cms'
import Link from "next/link";

export async function fetchMainMenuItems() {
    const menuItems = await fetchGraphQL(`query {
        mainMenuCollection {
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
    return menuItems?.data?.mainMenuCollection?.items[0].linksCollection.items
}

export default async function MainMenu() {
    const mainMenu = await fetchMainMenuItems()

    return (
        <nav className="menu">
            <h2 className="menu__title">Main menu</h2>
            <div className="menu__logo">
                <a href="/">
                    <img srcSet="/images/banner-logo-3x.png 3x, /images/banner-logo-2x.png 2x, /images/banner-logo.png 1x" src="/images/banner-logo.png" width="321" height="27" alt="Logo" className="menu__logo-image"/>
                </a>
            </div>

            <label htmlFor="hamburger" className="menu__hamburger">&#9776;</label>
            <input id="hamburger" type="checkbox"/>

            <ul className="menu__list">
                {mainMenu.map((item) => (
                    <li key={item.sys.id} className="menu__item">
                        <Link className="menu__link" href={`/${item.slug}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}