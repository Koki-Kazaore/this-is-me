import React from 'react'
import NavList from '../molecules/NavList'

interface NavLinkItem {
    title: string
    path: string
}

interface MenuOverlayProps {
    links: NavLinkItem[];
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links }) => {
  return (
    <NavList links={links} direction='vertical' />
  )
}

export default MenuOverlay