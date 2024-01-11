'use client'

import { useEffect } from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'

function useActivePath(): (path: string) => boolean {
    const pathname = usePathname()
    const isActivePath = (path: string) => {
        path === 'index'? path = '/': path = '/' + path
        return path === pathname
    }

    return isActivePath
}

export default function MainMenu({ menuItems }) {
    const isActivePath = useActivePath()

    return (
        <nav className="menu">
            <h2 className="menu__title">Main menu</h2>
            <div className="menu__logo">
                <a href="/">
                    <img srcSet="/images/banner-logo-3x.png 3x, /images/banner-logo-2x.png 2x, /images/banner-logo.png 1x" src="/images/banner-logo.png" width="321" height="27" alt="Logo" className="menu__logo-image" />
                </a>
            </div>

            <label htmlFor="hamburger" className="menu__hamburger">&#9776;</label>
            <input id="hamburger" type="checkbox" />

            <ul className="menu__list">
                {menuItems.map((item) => (
                    <li key={item.sys.id} className="menu__item">
                        <Link className={`menu__link${isActivePath(item.slug) ? ' current' : ''}`} href={`/${item.slug === "index" ? '' : item.slug}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}