import '../styles/main.scss'
import MainMenu from './components/cms-main-menu'
import Footer from './components/cms-footer'
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className={openSans.className}>
            <div className="container">
                <MainMenu/>

                {children}

                <Footer/>
            </div>
        </body>
      </html>
    )
  }