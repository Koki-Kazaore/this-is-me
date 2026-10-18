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
    <nav className='fixed top-0 left-0 right-0 z-20 border-b border-hairline bg-bg/80 backdrop-blur'>
      <div className='mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4'>
        <Heading
          label='kaza.ooo'
          className='font-mono text-sm tracking-widest text-fg transition-colors hover:text-fg-muted'
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
