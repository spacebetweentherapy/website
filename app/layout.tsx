import { Suspense } from 'react'
import '../styles/main.scss'
import { fetchGraphQL } from './lib/cms'
import MainMenu from './components/main-menu'
import Footer from './components/cms-footer'
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

async function fetchMainMenuItems() {
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const mainMenu = await fetchMainMenuItems()

  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="container">
          <MainMenu menuItems={mainMenu} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}