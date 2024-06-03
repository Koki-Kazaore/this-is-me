
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLink from './NavLink'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import MenuOverlay from './MenuOverlay'

// NavLinkの型を定義
interface NavLink {
    title: string;
    path: string;
}

// NavLinksの配列に型を適用
const NavLinks: NavLink[] = [
    {
        title: 'About',
        path: '#about',
    },
    {
        title: 'Projects',
        path: '#projects',
    },
    {
        title: 'Contact',
        path: '#contact',
    },
    {
        title: 'Blog',
        path: '/blog',
    },
];

const Navbar: React.FC = () => {
    const [navbarOpen, setNavBarOpen] = useState(false);

    return (
        <nav className='fixed mx-auto border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-50 backdrop-blur-lg'>
            <div className='flex sm:container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2'>
                <Link href={"/"} className='text-2xl md:text-5xl text-white font-semibold'>
                    KAZA.OOO
                </Link>
                <div className='mobile-menu block md:hidden'>
                    {
                        !navbarOpen ? (
                            <button 
                                onClick={() => setNavBarOpen(true)} 
                                className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
                            >
                                <Bars3Icon className='h-5 w-5' />
                            </button>
                        ) : (
                            <button 
                                onClick={() => setNavBarOpen(false)} 
                                className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
                            >
                                <XMarkIcon className='h-5 w-5' />
                            </button>
                        )
                    }
                </div>
                <div className='menu hidden mb:block md:w-auto' id='navbar'>
                    <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
                        {NavLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink href={link.path} title={link.title} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={NavLinks} /> : null}
        </nav>
    );
}

export default Navbar;