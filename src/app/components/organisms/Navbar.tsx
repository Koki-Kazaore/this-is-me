'use client'
import React, { useState } from 'react'
import Heading from '../atoms/Heading'
import IconButton from '../atoms/IconButton'
import NavList from '../molecules/NavList'
import MenuOverlay from './MenuOverlay'

interface NavLinkItem {
  title: string
  path: string
}

const NAV_LINKS: NavLinkItem[] = [
  {
    title: 'About',
    path: '/#about',
  },
  {
    title: 'Projects',
    path: '/#projects',
  },
  {
    title: 'Contact',
    path: '/#contact',
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
        <Heading
          label='KAZA.OOO'
          className='text-2xl md:text-5xl text-white font-semibold'
        />

        {/* Mobile Menu */}
        <div className='mobile-menu block md:hidden'>
          <IconButton
            isOpen={navbarOpen}
            onClick={() => setNavBarOpen(!navbarOpen)}
          />
        </div>

        {/* Web Menu */}
        <div className='menu hidden md:block md:w-auto' id='navbar'>
          <NavList links={NAV_LINKS} direction='horizontal' />
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={NAV_LINKS} /> : null}
    </nav>
  );
}

export default Navbar;