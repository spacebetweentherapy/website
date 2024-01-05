import '../styles/main.scss'
import MainMenu from './components/main-menu'
import Footer from './components/footer'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <div className="container">
                <MainMenu/>

                {children}

                <Footer/>
            </div>
        </body>
      </html>
    )
  }